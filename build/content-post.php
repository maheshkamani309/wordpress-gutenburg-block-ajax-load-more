<?php

$url = esc_url(get_permalink(get_the_ID()));
$thumbnail = has_post_thumbnail(get_the_ID()) ? get_the_post_thumbnail(get_the_ID(), 'medium') : '';
?>
<li>

    <?php
    if (!empty($thumbnail) && $displayThumbnail) { ?>
        <div class="malm-thumbnail"> <?php echo $thumbnail; ?></div>
    <?php } ?>
    <div class="malm-content">
        <h2><a href="<?php echo $url; ?>"><?php the_title(); ?></a></h2>
        <?php the_excerpt(); ?>
    </div>
</li>