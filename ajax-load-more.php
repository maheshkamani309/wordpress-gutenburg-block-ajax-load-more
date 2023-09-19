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
function ajax_load_more_ajax_load_more_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'ajax_load_more_ajax_load_more_block_init' );
