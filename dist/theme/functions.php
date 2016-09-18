<?php

// add post thumbnail support
add_theme_support( 'post-thumbnails' );


// avoid garbled characters
remove_filter('the_title', 'wptexturize');
remove_filter('the_content', 'wptexturize');
remove_filter('comment_text', 'wptexturize');
remove_filter('the_excerpt', 'wptexturize');


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
add_action( 'init', 'sb_add_cpts_to_api', 11 );


// add Yoast SEO meta info to custom post api response
add_action( 'rest_api_init', function() {
 register_rest_field(['notes','works'],
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


// ACF Options Pages
// if( function_exists('acf_add_options_page') ) {
//
// 	acf_add_options_page(array(
// 		'page_title' 	=> 'Theme General Settings',
// 		'menu_title'	=> 'Theme Settings',
// 		'menu_slug' 	=> 'theme-general-settings',
// 		'capability'	=> 'edit_posts',
// 		'redirect'		=> false
// 	));

	// acf_add_options_sub_page(array(
	// 	'page_title' 	=> 'Top Page',
	// 	'menu_title'	=> 'Top',
	// 	'parent_slug'	=> 'theme-general-settings',
	// ));

// }


// Add prev and next post link in response header
// function get_pagination_in_json( $post_response, $post, $context ) {
//
//     // Ensure global post is correctly set
//     echo $old_post;
//     $old_post = $GLOBALS['work'];
//     $GLOBALS['work'] = (object)$post;
//
//     $previous_post = get_adjacent_post( true, '', true, 'works' );
//     $next_post = get_adjacent_post( true, '', false, 'works' );
//
//     if ( is_a( $previous_post, 'WP_Post' ) ) {
//         $previous = get_permalink($previous_post->ID);
//         $post_response['pagination']['previous'] = $previous;
//     }
//
//     if ( is_a( $next_post, 'WP_Post' ) ) {
//         $next = get_permalink($next_post->ID);
//         $post_response['pagination']['next'] = $next;
//     }
//
//     // Reset global post to its old value
//     $GLOBALS['work'] = $old_post;
//
//     return $post_response;
// }
// add_filter( 'json_prepare_post', 'get_pagination_in_json', 10, 3 );
