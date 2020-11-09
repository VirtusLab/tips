$(document).ready(function() {
    $('img.emoji').each(function() {
        const originalSrc = $(this).attr('src');
        const animated = $(this).hasClass('animated')

        $(this).attr('src', 'assets/emoji/' + originalSrc + (animated ? '.gif' : '.png'));
        $(this).attr('title', originalSrc);
        $(this).attr('alt', originalSrc);
    })
})