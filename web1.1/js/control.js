$(function () {
    var clickedLink = $('.container').find('.middle').find('.center').find('.link');
    clickedLink.click(function () {
        clickedLink.find('.link-active').removeClass("link-active");
        clickedLink.find('.tab').css('opacity', '0.7');
        $(this).find('.tab').css('opacity', '0.8');
        $(this).find('span').addClass("link-active");
    })
});