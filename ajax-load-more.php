<?php

/**
 * Plugin Name:       Ajax Load More
 * Description:       Load posts with load more and infinate scroll
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Mahesh Kamani, Kishan Chauhan, Paresh Shingala
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ajax-load-more
 * Domain Path:       mak-ajax-load-more
 *
 * @package           ajax-load-more
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function ajax_load_more_ajax_load_more_block_init()
{
	register_block_type(__DIR__ . '/build');

	// var_dump( get_intermediate_image_sizes() );
}
add_action('init', 'ajax_load_more_ajax_load_more_block_init');



// Ajax load more functionality

add_action("wp_ajax_mak_more_posts", "mak_more_posts");
add_action("wp_ajax_nopriv_mak_more_posts", "mak_more_posts");
function mak_more_posts()
{

	$attributes = $_POST;
	$displayThumbnail = (bool) $attributes['displayThumbnail'];
	$displayDates = (bool) $attributes['displayDates'];
	$displayExcerpt = (bool) $attributes['displayExcerpt'];
	$currentPage = (int) $attributes['currentPage'];

	$args = array(
		'post_type'		=> sanitize_text_field($attributes['postType']),
		'posts_per_page'	=> (int)$attributes['postPerPage'],
		'post__not_in' => get_option("sticky_posts"),
		'paged' => $currentPage + 1
	);
	$posts = new WP_Query($args);

	ob_start();
	while ($posts->have_posts()) : $posts->the_post();
		require 'src/content-post.php';
	endwhile;
	$html = ob_get_clean();

	wp_send_json_success(['html' => $html]);
}
