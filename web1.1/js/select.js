//一级
var menu1 = "";
//二级
var menu2 = "";
//隐藏二级
function hideSecond() {}

//一级菜单
$(".yijibaioti-ul li").bind("click", function () {
    $(this).addClass("yiji-active");
    menu1 = $(this).attr('id');

    switch (menu1) {
        case '1000':
            $('#disaster').show();
            $('#disaster').siblings().hide();
            $('#1001').trigger("click");
            break;
        case '2000':
            $('#research').show();
            $('#research').siblings().hide();
            $('#2001').trigger("click");
            break;
        case '3000':
            $('#survey').show();
            $('#survey').siblings().hide();
            $('#3001').trigger("click");
            break;
        case '4000':
            $('#comprehensive').show();
            $('#comprehensive').siblings().hide();
            $('#4001').trigger("click");
            break;
        case '5000':
            $('#emergency').show();
            $('#emergency').siblings().hide();
            $('#5001').trigger("click");
            break;
        case '6000':
            $('#ability').show();
            $('#ability').siblings().hide();
            $('#6001').trigger("click");
            break;
    };
});
// 二级菜单
$(".erji li").bind("click", function () {
    $(this).addClass("erji-active");
    menu2 = $(this).attr('id');

    switch (menu2) {
        case '1001':
            $('#zai').show();
            $('#zai').siblings().hide();
            $('#zaihai').show();
            $('#zaihai').siblings().hide();
            break;
        case '1002':
            $('#yin').show();
            $('#yin').siblings().hide();
            $('#yinhuan').show();
            $('#yinhuan').siblings().hide();
            break;
        case '1003':
            $('#zai').hide();
            $('#yin').hide();
            $('#tdyinhuan').show();
            $('#tdyinhuan').siblings().hide();
            break;
        case '1004':
            $('#zai').hide();
            $('#yin').hide();
            $('#ndxzyinhuan').show();
            $('#ndxzyinhuan').siblings().hide();
            break;
        case '1005':
            $('#zai').hide();
            $('#yin').hide();
            $('#ndhexiao').show();
            $('#ndhexiao').siblings().hide();
            break;
        case '1006':
            $('#zai').hide();
            $('#yin').hide();
            $('#ndzaixian').show();
            $('#ndzaixian').siblings().hide();
            break;
        case '1007':
            $('#zai').hide();
            $('#yin').hide();
            $('#ndbirang').show();
            $('#ndbirang').siblings().hide();
            break;
        case '2001':
            $('#yishi').show();
            $('#yishi').siblings().hide();
            break;
        case '2002':
            $('#yiwu').show();
            $('#yiwu').siblings().hide();
            break;
        case '3001':
            $("#qun").show();
            $("#qun").siblings().hide();
            $('#qunfqc').show();
            $('#qunfqc').siblings().hide();
            break;
        case '3002':
            $("#zhuan").show();
            $("#zhuan").siblings().hide();
            $('#zhuanyjc').show();
            $('#zhuanyjc').siblings().hide();
            break;
        case '3003':
            $('#zhuan').hide();
            $('#qun').hide();
            $('#qixjc').show();
            $('#qixjc').siblings().hide();
            break;
        case '4001':
            $("#ban").show();
            $("#ban").siblings().hide();
            $('#banqbr').show();
            $('#banqbr').siblings().hide();
            break;
        case '4002':
            $("#gong").show();
            $("#gong").siblings().hide();
            $('#gongczl').show();
            $('#gongczl').siblings().hide();
            break;
        case '5001':
            $('#yingjcl').show();
            $('#yingjcl').siblings().hide();
            break;
        case '5002':
            $('#yingjgl').show();
            $('#yingjgl').siblings().hide();
            break;
        case '6001':
            $('#shiyou').show();
            $('#shiyou').siblings().hide();
            break;
        case '6002':
            $('#gbshiyou').show();
            $('#gbshiyou').siblings().hide();
            break;
    }
});