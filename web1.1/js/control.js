$(function () {
    var clickedLink = $('.container').find('.middle').find('.center').find('.link');
    clickedLink.click(function () {
        clickedLink.find('.link-active').removeClass("link-active");
        clickedLink.find('.tab').css('opacity', '0.7');
        $(this).find('.tab').css('opacity', '0.8');
        $(this).find('span').addClass("link-active");
    })
    var triangle_right = $('.triangle_border_right');
    triangle_right.click(function () {
        var mainContainer = $('#mainContainer');
        if (mainContainer.hasClass("slide-show")) {
            mainContainer.removeClass("slide-show");
            return;
        }
        mainContainer.addClass("slide-show");
    })
    var triangle_down = $('.triangle_border_down');
    triangle_down.click(function () {
        var cityContainer = $("#cityContainer").parent('.bottom');
        if (cityContainer.hasClass('slide-down')) {
            cityContainer.removeClass('slide-down');
            return;
        }
        cityContainer.addClass("slide-down");
    })
});