#!/usr/local/bin/zsh

set -e

PLUGINS=(
  acf-to-rest-api
  acf-content-analysis-for-yoast-seo
  advanced-custom-fields-oembed-field
  attachment-importer
  wordpress-importer
  display-widgets
  post-thumbnail-editor
  pubsubhubbub
  search-everything
  simple-page-ordering
  rest-api
  wordpress-seo
  better-rest-api-featured-images
)

PLUGINS_TO_REMOVE=(
  hello
)

ACF_PRO_KEY="b3JkZXJfaWQ9NjIxNjV8dHlwZT1kZXZlbG9wZXJ8ZGF0ZT0yMDE1LTA4LTE5IDA1OjEyOjQx"

: "check if vagrant is up, otherwise restart vagrant" && {
  vagrant status | grep 'running' > /dev/null || {
    vagrant up
  }
}

: "create specified name container" && {
  vagrant ssh -c "docker ps --all | grep ${2}" > /dev/null || {
    vagrant ssh -c "wocker run --name ${2}"
  }
}

: "check if a docker container is already running, otherwise run" && {
  vagrant ssh -c "wocker ps | grep ${2}" > /dev/null || {
    : "Start a specified container" && {
      if [[ ($1 = "--name") && ($2) ]]
        then vagrant ssh -c "wocker start ${2}";
      else
        echo "Specify a container with --name option";
        exit 1;
      fi
    }
  }
}

: "Installing plugins and removing unnecessary plugins" && {
  vagrant ssh -c "wocker wp plugin install ${PLUGINS[*]} --activate"
}

: "Download, install and activate ACF PRO if not installed yet" && {
  plugin_name="advanced-custom-fields-pro"
  vagrant ssh -c "wocker wp plugin list | grep ${plugin_name}" >/dev/null || {
    plugin_directory="~/data/${2}/wp-content/plugins"
    acf_zip_file="${plugin_directory}/${plugin_name}.zip"
    vagrant ssh -c "
      wget -O ${acf_zip_file} 'http://connect.advancedcustomfields.com/index.php?p=pro&a=download&k=${ACF_PRO_KEY}'
      unzip -d ${plugin_directory} ${acf_zip_file}
      wocker wp plugin activate ${plugin_name}
      rm ${acf_zip_file}
    "
  }
}

: "Rewriting structure" && {
  vagrant ssh -c "wocker wp rewrite structure '/%postname%/'"
}

: "Updating WordPress" && {
  vagrant ssh -c "wocker wp core update"
}
