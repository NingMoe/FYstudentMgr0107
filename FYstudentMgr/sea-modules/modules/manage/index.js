
define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('bootstrap');
    require('tool');
    require('modules/manage/left-nav.css');
    require('modules/manage/index.css');
    //$(".level-icon").hover(function () {
    //    $(this).find("arrow-wrapper").show();
    //    $(this).find("tips-wrapper").show();
    //},function(){
    //    $(this).find("arrow-wrapper").hide();
    //    $(this).find("tips-wrapper").hide();
    //});
    var hello = "";
    now = new Date(), hour = now.getHours()
    if (hour < 6) { hello="凌晨好," }
    else if (hour < 9) { hello="早上好," }
    else if (hour < 12) { hello="上午好," }
    else if (hour < 14) { hello="中午好," }
    else if (hour < 17) { hello="下午好," }
    else if (hour < 19) { hello="傍晚好," }
    else if (hour < 22) { hello="晚上好,"}
    else { hello="夜里好," }

    $(".say-hello").text(hello);
});