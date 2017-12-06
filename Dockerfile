#
# Installs WordPress with wp-cli (wp.cli.org) installed
# Docker Hub: https://registry.hub.docker.com/u/conetix/wordpress-with-wp-cli/
# Github Repo: https://github.com/conetix/docker-wordpress-wp-cli

FROM wordpress:php7.1

# Add sudo in order to run wp-cli as the www-data user
RUN apt-get update; apt-get install -y sudo less wget unzip mariadb-client

# Add WP-CLI
RUN curl -o /bin/wp-cli.phar https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
COPY ./scripts/wp-su.sh /bin/wp
RUN chmod +x /bin/wp-cli.phar /bin/wp

# Modify wp-config.php
COPY ./wordpress/wp-config.php /usr/src/wordpress/wp-config.php
COPY ./wordpress/wp-config.php /var/www/html/wp-config.php

# Cleanup
# RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
