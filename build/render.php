<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$args = array(
	'post_type'		=> $attributes['postType'],
	'numberposts'	=> $attributes['postPerPage']
);
$posts = get_posts($args);

$displayThumbnail = $attributes['displayThumbnail'];
$listType = $attributes['listType'];
$columns = $attributes['columns'];

?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="mak-ajax-load-more">
		<ul class="mak-ajax-load-more-posts-list <?php echo ($listType == 'grid')?'grid columns-'.$columns:'list'; ?>">
			<?php
			foreach ($posts as $post) : ?>
				<?php
				$title = $post->post_title ? $post->post_title : 'No Title';
				$url = esc_url(get_permalink($post->ID));
				$thumbnail = has_post_thumbnail($post->ID) ? get_the_post_thumbnail($post->ID, 'medium') : '';
				?>
				<li>
					<?php
					if (!empty($thumbnail) && $displayThumbnail) {
						echo $thumbnail;
					}
					?>
					<h2><a href="<?php echo $url; ?>"><?php echo $title; ?></a></h2>

				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</div>

