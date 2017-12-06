#!/bin/sh

WORDPRESS_CONTAINER="web.anna"

: "set up docker containers" && {

  : "start shared proxy" && {
    docker-compose -f docker-compose.proxy.yml up -d
  }

  : "download latest docker images" && {
    docker-compose -f docker-compose.development.yml pull
  }

  : "build docker image if docker container is NOT created yet" && {
    docker ps -a | grep $WORDPRESS_CONTAINER > /dev/null || {
      docker-compose -f docker-compose.development.yml build
    }
  }

  : "start docker container" && {
    docker-compose -f docker-compose.development.yml up -d
  }

}

PROJECT_NAME="annamatsumoto.com"
ROOT_DIR="."

: "start tmuxinator" && {
  mkdir -p $HOME/.tmuxinator
  cp $ROOT_DIR/tmuxinator.yml $HOME/.tmuxinator/$PROJECT_NAME.yml
  bash -c "sleep 3 && rm -f $HOME/.tmuxinator/$PROJECT_NAME.yml" &
  tmuxinator start $PROJECT_NAME
}
