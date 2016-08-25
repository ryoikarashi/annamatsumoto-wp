<?php
add_theme_support( 'post-thumbnails' );

// Add Featured Image to WP-API JSON response
function my_rest_prepare_post( $data, $post, $request ) {
	$_data = $data->data;
	$thumbnail_id = get_post_thumbnail_id( $post->ID );
	$thumbnail = wp_get_attachment_image_src( $thumbnail_id, 'full' );
	$_data['featured_image'] = $thumbnail[0];

	$data->data = $_data;
	return $data;
}
add_filter( 'rest_prepare_post', 'my_rest_prepare_post', 10, 3 );

add_filter('json_query_vars', function ($vars) {
    $vars[] = 'date_query';
    return $vars;
});

add_action( 'rest_api_init', function() {
 register_api_field( 'post',
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
