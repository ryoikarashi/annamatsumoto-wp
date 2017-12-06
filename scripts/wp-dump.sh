#!/bin/sh

ROOT_DIR="$(pwd)"

DB_CONTAINER_NAME="db-anna"
DB_NAME="root"
docker exec -it ${DB_CONTAINER_NAME} sh -c "mysqldump $DB_NAME -u root -pfoobar 2> /dev/null" > $ROOT_DIR/db-data/db_anna.dump.sql
