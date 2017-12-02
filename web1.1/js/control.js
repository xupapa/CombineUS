$(function () {
    var clickedLink = $('.container').find('.middle').find('.center').find('.link');
    clickedLink.click(function () {
        clickedLink.find('.link-active').removeClass("link-active");
        clickedLink.find('.yellow').removeClass("yellow");
        clickedLink.find('.tab').css('opacity', '0.7');
        $(this).find('.tab').css('opacity', '0.8');
        $(this).find('.tab').addClass("yellow");
        $(this).find('span').addClass("link-active");
    })
    var triangle_right = $('.triangle_border_right');
    triangle_right.click(function (e) {
        e.stopPropagation()
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
    //	侧边点击隐藏
    $(".left_hidden").bind("click", function () {
        $(".con_right").animate({
            right: "-220px"
        });
        $(".left_show").animate({
            left: "-15%"
        });
    });
    //	侧边点击显示
    $(".left_show").bind("click", function () {
        $(".left_show").animate({
            left: "120%"
        });
        $(".con_right").animate({
            right: "10px"
        });
    });

    //	底部点击隐藏
    $(".bottom_hidden").bind("click", function () {
        $(".bottom").animate({
            bottom: "-135px"
        });
        $(".bottom_show").animate({
            top: "-45%"
        });
    });
    //	底部点击显示
    $(".bottom_show").bind("click", function () {
        $(".bottom_show").animate({
            top: "110%"
        });
        $(".bottom").animate({
            bottom: "2px"
        });
    });
    //一级菜单点击效果
    $(".yijibaioti-ul li").bind("click", function () {
        $(this).css({
            background: "rgba(0, 0, 0, .8)",
            borderColor: "yellow"
        }).siblings().css({
            background: "rgba(0, 0, 0, .7)",
            borderColor: "#fff"
        });
        $(this).find('p').css({
            color: "yellow"
        });
        $(this).siblings().find('p').css({
            color: "#fff"
        });
        data_now = $(this).find('p').html();
    });
});