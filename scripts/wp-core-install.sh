#!/bin/sh
CONTAINER_NAME="web.anna"
docker exec $CONTAINER_NAME wp core install \
                --url=annamatsumoto.dev \
                --title="AnnaMatsumoto.com" \
                --admin_user=admin \
                --admin_password=admin \
                --admin_email=admin@example.com \
                --path=/var/www/html
