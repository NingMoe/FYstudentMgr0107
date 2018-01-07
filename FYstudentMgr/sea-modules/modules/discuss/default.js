define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('scoket');
    require('tool');
    require('progress');
    require('allRank');
    var date = require('date');
    require('chart');
    var i = 0;
    $(".time").each(function () {
        var time = $(this).text();
        $(this).text(date.countNow(time));
    });
    $("#LessonID").change(function () {
        //alert(123);
        $("#form-lessonID").submit();
    });
});