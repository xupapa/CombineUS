(function ($) {
    var $doc = $("#map");
    // var $msg = $('#alert_msg');
    var $tips = $('#alert_tips');
    var $window = $('.alert_window');
    var $close = $('.close-icon');
    if (!$tips.length) {
        // $tips = $('<div id="alert_tips" class="tips" style="position:absolute;top:100px;left:200px;z-index:1001"></div>');
        $tips = $window;
        $('body').append($tips);
    }
    var offsetX, offsetY;
    offsetX = $window[0].clientWidth * 0.9 - 15;
    offsetY = $window[0].clientHeight + 20;
    // if(window.clientHeight * 0.5 < )
    // function whichTri() {
    // function place(e) {
    //     var x = e.clientX;
    //     var y = e.clientY;
    //     // document.getElementsByTagName('span')[0].innerHTML = "当前位置：X轴" + x + " Y轴" + y + "";
    //     if (x > $('window').clientWidth * 0.5) {
    //         console.log('进入右半区');
    //     }
    //     if (y > $('window').clientHeight * 0.5) {
    //         console.log("进入下半区");
    //     }
    // }
    // }
    $doc.on('click', function (e) {
        var pageX = e.pageX,
            pageY = e.pageY;
        pageX -= offsetX;
        pageY -= offsetY;
        $tips.css({
            top: pageY,
            left: pageX,
            display: 'inline'
        });
    });
    $close.click(function () {
        $window.css('display', 'none');
    })
})(jQuery);