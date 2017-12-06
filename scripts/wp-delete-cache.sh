#!/bin/sh

WEB_CONTAINER="web.anna"

docker exec -it $WEB_CONTAINER bash -c "rm -rf /var/www/html/wp-content/uploads/cache/*"
