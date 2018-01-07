define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('scoket');
    require('tool');
    //require('progress');
    //require('allRank');
    var date = require('date');
    //require('chart');
    var subjectid, category1id, category2id;
    subjectid = $("#subjectbar").attr("data-id");
    category1id = $("#category1bar").attr("data-category1id");
    category2id = $("#category2bar").attr("data-category2id");
    var i = 0;
    $(".time").each(function () {
        var time = $(this).text();
        $(this).text(date.countNow(time));
    });

    $("#menuOrder").mouseover(function () {
        $("#menuOrder>dd:first").attr("style", "display:block; margin:0");
    });
    $("#menuOrder").mouseout(function () {
        $("#menuOrder>dd:first").removeAttr("style");
    });
    //我要发言按钮事件
    $("#btnAsk").click(function () {
        location.href = "/Article/Create/" + subjectid + "?category1id=" + category1id + "&category2id=" + category2id;
    });
});