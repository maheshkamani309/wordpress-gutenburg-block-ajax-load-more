<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$args = array(
	'post_type'		=> $attributes['postType'],
	'posts_per_page'	=> $attributes['postPerPage'],
	'post__not_in' => get_option("sticky_posts"),
);
// Execute query
$posts = new WP_Query($args);
$displayThumbnail = $attributes['displayThumbnail'];
$displayDates = $attributes['displayDates'];
$displayExcerpt = $attributes['displayExcerpt'];
$infinateScroll = $attributes['infinateScroll'];
$listType = $attributes['listType'];
$columns = $attributes['columns'];
$attributes['ajaxUrl'] = admin_url('admin-ajax.php');
$attributes['maxNumPages'] = $posts->max_num_pages;
$attributes['currentPage'] = 1;
$attributes['firstCall'] = true;
$attributes['action'] = 'mak_more_posts';
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="mak-ajax-load-more" data-json='<?php echo json_encode($attributes); ?>'>
		<ul class="mak-ajax-load-more-posts-list <?php echo ($listType == 'grid') ? 'grid columns-' . $columns : 'list'; ?>">
			<?php while ($posts->have_posts()) : $posts->the_post();
				require 'content-post.php';
			endwhile; ?>
		</ul>

		<?php if (!$infinateScroll) : ?>
			<div>
				<button class="wp-block-button mak-load-more-btn">Load More</button>
			</div>
		<?php else : ?>
			<div>
				<button class="wp-block-button mak-infimate-load-btn">Load More</button>
			</div>
		<?php endif; ?>
	</div>
</div>