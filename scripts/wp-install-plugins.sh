#!/bin/bash

set -e

PLUGINS=(
  ######### ACF ############
  advanced-custom-fields-oembed-field
  acf-content-analysis-for-yoast-seo
  acf-theme-code
  acf-page-builder-field

  ######### Security ############
  wps-hide-login
  wp-force-login
  wp-force-ssl

  ######### Migration / Backup ############
  wordpress-importer
  download-attachments
  attachment-importer
  export-all-urls

  ######### Custom Post Type ############
  all-in-one-wp-migration
  backwpup
  custom-post-type-ui
  convert-post-types
  custom-post-type-permalinks

  ######### Jetpack ############
  jetpack

  ######### Utilities ############
  simple-page-ordering
  post-duplicator
  multi-device-switcher
  search-everything
  wp-super-cache
  wp-multibyte-patch

  ######### Image ############
  post-thumbnail-editor
  wp-smushit
  all-in-one-favicon

  ######### SEO ############
  wordpress-seo
  pubsubhubbub
  wp-structuring-markup
  google-analytics-for-wordpress

  ######### CODE ############
  theme-check

  ######### Layout ############
  elementor
  siteorigin-panels
  so-widgets-bundle
  wp-pagenavi

  ######### i18n ############
  wp-seo-qtranslate-x
  acf-qtranslate
  qtranslate-x
)

PLGUINS_TO_DEACTIVATE=(
  wps-hide-login
  wp-force-login
)

CONTAINER_NAME="web.anna"

ACF_PRO_KEY=`cat ./wp-acf-pro-key.txt`

: "Installing plugins and removing unnecessary plugins" && {
  docker exec ${CONTAINER_NAME} wp plugin install  ${PLUGINS[*]}; docker exec ${CONTAINER_NAME} wp plugin activate ${PLUGINS[*]}
}

: "Deactive plugins" && {
  docker exec ${CONTAINER_NAME} wp plugin deactivate ${PLGUINS_TO_DEACTIVATE[*]};
}

: "Download, install and activate ACF PRO if not installed yet" && {
  acf_plugin_name="advanced-custom-fields-pro"
  docker exec ${CONTAINER_NAME} wp plugin list | grep ${acf_plugin_name} > /dev/null || {
    plugin_directory="/var/www/html/wp-content/plugins"
    acf_zip_file="${plugin_directory}/${acf_plugin_name}.zip"
    docker exec ${CONTAINER_NAME} wget -O ${acf_zip_file} "http://connect.advancedcustomfields.com/index.php?p=pro&a=download&k=${ACF_PRO_KEY}"
    docker exec ${CONTAINER_NAME} unzip -d ${plugin_directory} ${acf_zip_file}
    docker exec ${CONTAINER_NAME} wp plugin activate ${acf_plugin_name}
    docker exec ${CONTAINER_NAME} rm ${acf_zip_file}
    docker exec ${CONTAINER_NAME} chown -R www-data:www-data "${plugin_directory}/${acf_plugin_name}"
  }
}
