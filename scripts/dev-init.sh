#!/bin/bash

set -eux

ROOT_DIR=$(pwd)
PROJECT_NAME=$(basename $ROOT_DIR)
WORDPRESS_CONTAINER="web.anna"
MAIN_THEME="main"
WP_NAV_NAME="Main"
WP_NAV_SLUG=$(echo $WP_NAV_NAME | tr '[:upper:]' '[:lower:]')
PAGES=(
  "home"
  "about"
  "flow"
  "pricing"
  "contact"
)
CPTS=(
  "works"
)

# : "build frontend stuff" && {
#   (
#     cd ./main-theme && yarn run build:production
#   )
# }

: "download latest docker images" && {
  docker-compose -f docker-compose.development.yml pull
}

: "build docker image if docker container is NOT created yet" && {
  docker ps -a | grep $WORDPRESS_CONTAINER > /dev/null || {
    # Build docker image
    docker-compose -f docker-compose.development.yml build
  }
}

: "start docker container" && {
  docker-compose -f docker-compose.development.yml up -d
}

: "setup wordpress" && {

  : "settings" && {
    docker exec -it $WORDPRESS_CONTAINER bash -c "ls -ld /var/www/html/wp-content/plugins/* | wc -l | grep 5 > /dev/null" || {

      : "wait for wordpress install" && {
        until docker exec -it $WORDPRESS_CONTAINER bash -c "ls /var/www/html | grep wp-settings.php > /dev/null"
        do
          sleep 1
        done
      }

      : "wait a little bit more" && {
        sleep 8
      }

      : "insall wordpress core" && {
        (
          cd $ROOT_DIR/scripts
          sh ./wp-core-install.sh
        )
      }

      : "install plugins" && {
        (
          cd $ROOT_DIR/scripts
          sh ./wp-install-plugins.sh
        )
      }

      : "add patches for some plugins" && {
        : "qtranslate-x" && {
          docker cp $ROOT_DIR/plugins/qtranslate-x/qtranslate_frontend.php $WORDPRESS_CONTAINER:/var/www/html/wp-content/plugins/qtranslate-x/qtranslate_frontend.php
          docker exec -it $WORDPRESS_CONTAINER bash -c "chown -R www-data:www-data /var/www/html/wp-content/plugins/qtranslate-x/qtranslate_frontend.php"
        }
      }

      : "create temporary stylesheet and template" && {
        docker exec -it $WORDPRESS_CONTAINER bash -c "cp /var/www/html/wp-content/themes/main/resources/{style.css,index.php} /var/www/html/wp-content/themes/main"
      }

      : "disable admin bar in front" && {
        docker exec -it $WORDPRESS_CONTAINER bash -c "wp option update show_admin_bar_front false"
      }

      : "activate main theme" && {
        docker exec -it $WORDPRESS_CONTAINER bash -c "wp theme activate $MAIN_THEME"
      }

      : "Rewriting structure" && {
        docker exec -it $WORDPRESS_CONTAINER bash -c "wp rewrite structure '/%postname%/'"
      }

      : "delete temporary stylesheet and template" && {
        docker exec -it $WORDPRESS_CONTAINER bash -c "rm /var/www/html/wp-content/themes/main/{style.css,index.php}"
      }

      # : "Updating WordPress" && {
      #   docker exec -it $WORDPRESS_CONTAINER bash -c "wp core update"
      # }
    }
  }

  : "create pages" && {

    [[ $(docker exec -it $WORDPRESS_CONTAINER bash -c "wp post list --post_type='page' --format=ids" -eq true) ]] && {
      docker exec -it $WORDPRESS_CONTAINER bash -c "wp post delete \$(wp post list --post_type='page' --format=ids)"
    }

    [[ $(docker exec -it $WORDPRESS_CONTAINER bash -c "wp post list --post_status=trash --post_type='page' --format=ids" -eq true) ]] && {
      docker exec -it $WORDPRESS_CONTAINER bash -c "wp post delete \$(wp post list --post_status=trash --post_type='page' --format=ids)"
    }

    : "create pages" && {
      for page in "${PAGES[@]}"
      do
         :
         docker exec -it $WORDPRESS_CONTAINER bash -c "wp post create --post_type=page --post_title=$page --post_status='publish'"
      done
    }
  }

  : "create WP Custom Post Types" && {
    for cpt in "${CPTS[@]}" ; do
      : "create CPT" && {
        docker exec -it $WORDPRESS_CONTAINER bash -c "wp scaffold post-type ${cpt} --theme --force"
      }

      : "clean up CPT posts" && {
        [[ $(docker exec -it $WORDPRESS_CONTAINER bash -c "wp post list --post_type='$cpt' --format=ids") ]] && {
          docker exec -it $WORDPRESS_CONTAINER bash -c "wp post delete \$(wp post list --post_type='$cpt' --format=ids)"
        }
      }

      : "create CPT posts" && {
        for ((i=0; i < 3; i++)); do
          docker exec -it $WORDPRESS_CONTAINER bash -c "php /bin/wp-cli.phar --allow-root post create --post_title=\"[:ja]$cpt 投稿 $i [:en]$cpt post $i\" --post_type=works --post_status=publish --post_content=\"[:ja]複素数体であれば、任意のCM-タイプの A は、実際、数体である定義体（英語版）(field of definition)を持っている。自己準同型環の可能なタイプは、対合（ロサチの対合（英語版）(Rosati involution）をもつ環として既に分類されていて、CM-タイプのアーベル多様体の分類を導き出す。楕円曲線と同じような方法でCM-タイプの多様体を構成するには、Cd の中の格子 Λ から始め、アーベル多様体のリーマンの関係式（英語版）(Riemann relations)を考えに入れる必要がある。 CM-タイプ(CM-type)は、単位元での A の正則接空間上にある EndQ(A) の（最大）可換部分環 L の作用を記述したものである。単純な種類のスペクトル理論が適応され、L が固有ベクトルの基底を通して作用することを示すことができる。言い換えると、L は A の正則ベクトル場の上の対角行列を通した作用を持っている。L 自体がある複数の体の積というよりも数体であるという単純な場合には、CM-タイプは L の複素埋め込み（英語版）(complex embedding)のリストである。複素共役をなすペアとして、2d 個の複素埋め込みがあり、CM-タイプは各々のペアのから一つを選択する。そのようなCM-タイプの全てが実現されることが知られている。 [:en]Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\""
        done
      }
    done
  }

  : "create WP Menu" && {
    : "delete registered nav first" && {
      [[ $(docker exec -it $WORDPRESS_CONTAINER bash -c "wp menu list --format=ids" -eq true) ]] && {
        docker exec -it $WORDPRESS_CONTAINER bash -c "wp menu location remove ${WP_NAV_NAME} primary_navigation"
        docker exec -it $WORDPRESS_CONTAINER bash -c "wp menu delete ${WP_NAV_NAME}"
      }
    }

    : "create main nav as primary_navigation" && {
      docker exec -it $WORDPRESS_CONTAINER bash -c "wp menu create ${WP_NAV_NAME}"
      docker exec -it $WORDPRESS_CONTAINER bash -c "wp menu location assign ${WP_NAV_SLUG} primary_navigation"
    }

    : "assign pages to the main nav" && {
      PAGE_IDS=$(docker exec -it ${WORDPRESS_CONTAINER} bash -c "wp post list --field=ID --post_type='page' --post_status=publish")
      PAGE_IDS_ARRAY=($(echo ${PAGE_IDS}))
      for (( idx=${#PAGE_IDS_ARRAY[@]}-1 ; idx>=0 ; idx-- )) ; do
        PAGE_TITLE=$(docker exec -it $WORDPRESS_CONTAINER bash -c "wp post get ${PAGE_IDS_ARRAY[idx]} --field=post_title")
        if [ "${PAGE_TITLE%%[[:cntrl:]]}" = 'home' ]; then
          continue
        else
          docker exec -it $WORDPRESS_CONTAINER bash -c "wp menu item add-post ${WP_NAV_SLUG}  ${PAGE_IDS_ARRAY[idx]}"
        fi
      done
    }
  }
}

: "start tmuxinator" && {
  mkdir -p $HOME/.tmuxinator
  cp $ROOT_DIR/tmuxinator.yml $HOME/.tmuxinator/$PROJECT_NAME.yml
  bash -c "sleep 3 && rm -f $HOME/.tmuxinator/$PROJECT_NAME.yml" &
  tmuxinator start $PROJECT_NAME
}
