<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$args = array(
	'post_type'		=> $attributes['postType'],
	'posts_per_page'	=> $attributes['postPerPage']
);
// Execute query
$posts = new WP_Query($args);

$displayThumbnail = $attributes['displayThumbnail'];
$displayDates = $attributes['displayThumbnail'];
$listType = $attributes['listType'];
$columns = $attributes['columns'];

?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="mak-ajax-load-more">
		<ul class="mak-ajax-load-more-posts-list <?php echo ($listType == 'grid') ? 'grid columns-' . $columns : 'list'; ?>">
			<?php while ($posts->have_posts()) : $posts->the_post();
				require 'content-post.php';
			endwhile; ?>
		</ul>
	</div>
</div>