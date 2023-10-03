<?php

$url = esc_url(get_permalink(get_the_ID()));
$thumbnail = has_post_thumbnail(get_the_ID()) ? get_the_post_thumbnail(get_the_ID(), 'thumbnail', array('class' => ' malm-thumbnail')) : '';
?>
<li>

    <?php
    if (!empty($thumbnail) && $displayThumbnail) { ?>
       <?php echo $thumbnail; ?>
    <?php } ?>
    <div class="malm-content">
        <h2><a href="<?php echo $url; ?>"><?php the_title(); ?></a></h2>
        <?php if ($displayDates) { ?>
            <p><?php the_time('F d, Y'); ?></p>
        <?php } ?>
        <?php if ($displayExcerpt) { ?>
            <?php the_excerpt(); ?>
        <?php } ?>

    </div>
</li>