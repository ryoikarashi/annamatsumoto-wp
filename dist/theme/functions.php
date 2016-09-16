<?php
add_theme_support( 'post-thumbnails' );

// add custom post type to api
function sb_add_cpts_to_api() {
    global $wp_post_types;
    $arr = ['notes', 'works'];
    foreach( $arr as $key ) {
    	if (!$wp_post_types[$key]) continue;
      $wp_post_types[$key]->show_in_rest = true;
      $wp_post_types[$key]->rest_base = $key;
    }
}
add_action( 'init', 'sb_add_cpts_to_api', 30 );

add_action( 'rest_api_init', function() {
 register_api_field('works',
    'yoast',
    array(
       'get_callback'    => 'get_yoast',
       'update_callback' => null,
       'schema'          => null,
    )
 );
});

function get_yoast( $object, $field_name, $request ) {
  $yoastMeta = array(
    'yoast_wpseo_title' => get_post_meta($object['id'], '_yoast_wpseo_title', true),
    'yoast_wpseo_metadesc' => get_post_meta($object['id'], '_yoast_wpseo_metadesc', true),
    'yoast_wpseo_focuskw' => get_post_meta($object['id'], '_yoast_wpseo_focuskw', true),
    'yoast_wpseo_linkdex' => get_post_meta($object['id'], '_yoast_wpseo_linkdex', true),
    'yoast_wpseo_metakeywords' => get_post_meta($object['id'], '_yoast_wpseo_metakeywords', true),
    'yoast_wpseo_meta-robots-noindex' => get_post_meta($object['id'], '_yoast_wpseo_meta-robots-noindex', true),
    'yoast_wpseo_meta-robots-nofollow' => get_post_meta($object['id'], '_yoast_wpseo_meta-robots-nofollow', true),
    'yoast_wpseo_meta-robots-adv' => get_post_meta($object['id'], '_yoast_wpseo_meta-robots-adv', true),
    'yoast_wpseo_canonical' => get_post_meta($object['id'], '_yoast_wpseo_canonical', true),
    'yoast_wpseo_redirect' => get_post_meta($object['id'], '_yoast_wpseo_redirect', true),
    'yoast_wpseo_opengraph-title' => get_post_meta($object['id'], '_yoast_wpseo_opengraph-title', true),
    'yoast_wpseo_opengraph-description' => get_post_meta($object['id'], '_yoast_wpseo_opengraph-description', true),
    'yoast_wpseo_opengraph-image' => get_post_meta($object['id'], '_yoast_wpseo_opengraph-image', true),
    'yoast_wpseo_twitter-title' => get_post_meta($object['id'], '_yoast_wpseo_twitter-title', true),
    'yoast_wpseo_twitter-description' => get_post_meta($object['id'], '_yoast_wpseo_twitter-description', true),
    'yoast_wpseo_twitter-image' => get_post_meta($object['id'], '_yoast_wpseo_twitter-image', true)
  );

  return $yoastMeta;
}
