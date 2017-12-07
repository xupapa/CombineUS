//一级
var menu1 = "";
//二级
var menu2 = "";
//一级菜单
$(".yijibaioti-ul li").bind("click", function () {
    $(this).addClass("yiji-active");
    menu1 = $(this).attr('name');
    console.log(menu1)
    // $(this).css({
    //     background: "rgba(0, 0, 0, .8)",
    //     borderColor: "yellow"
    // }).siblings().css({
    //     background: "rgba(0, 0, 0, .7)",
    //     borderColor: "#fff"
    // });
    // $(this).find('p').css({
    //     color: "yellow"
    // });
    // $(this).siblings().find('p').css({
    //     color: "#fff"
    // });
    // data_now = $(this).find('p').html();
});
// 二级菜单
$(".erji li").bind("click", function () {
    $(this).addClass("erji-active");
    menu2 = $(this).attr('name');
    console.log(menu2);
    $(this).css({
        background: "rgba(0, 0, 0, .9)",
        color: "yellow"
    }).siblings().css({
        background: "rgba(0, 0, 0, .7)",
        color: "#fff"
    });
    // dataType = $(this).html();
});