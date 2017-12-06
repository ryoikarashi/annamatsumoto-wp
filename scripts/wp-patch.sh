#!/bin/bash

WORDPRESS_CONTAINER="web.anna"
docker cp ../plugins/qtranslate-x/qtranslate_frontend.php $WORDPRESS_CONTAINER:/var/www/html/wp-content/plugins/qtranslate-x/qtranslate_frontend.php
docker exec -it web.anna bash -c "chown -R www-data:www-data /var/www/html/wp-content/plugins/qtranslate-x/qtranslate_frontend.php";
