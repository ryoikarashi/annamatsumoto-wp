#!/usr/local/bin/zsh

set -e

PLUGINS=(
  acf-to-rest-api
  acf-content-analysis-for-yoast-seo
  advanced-custom-fields-oembed-field
  attachment-importer
  display-widgets
  jetpack
  post-thumbnail-editor
  pubsubhubbub
  search-everything
  simple-page-ordering
  rest-api
  wordpress-seo
  jetpack-markdown
)

: "check if vagrant is up, otherwise restart vagrant" && {
  vagrant status | grep 'stopped' > /dev/null && {
    vagrant up
  }
}

: "check if a docker container is already running, otherwise run" && {
  vagrant ssh -c "wocker ps | grep annamatsumoto" > /dev/null && {
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

: "Installing plugins" && {
  vagrant ssh -c "wocker wp plugin install ${PLUGINS[*]}"
}

: "Activating all plugins" && {
  vagrant ssh -c "wocker wp plugin activate --all"
}

: "Rewriting structure" && {
  vagrant ssh -c "wocker wp rewrite structure '/%postname%/'"
}
