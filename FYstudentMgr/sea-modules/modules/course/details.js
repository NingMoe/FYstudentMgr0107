define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('admincss');
    require('font-awesome');
    require("canvasjs");
    //require('scoket');
    require('tool');
   // require('upload');
    //require('qiniu');
    //require('progress');
    //require('allRank');
    //var date = require('date');
   

    
    var courseid = $("#courseinfo").attr("data-id");
    $.post("/Course/ChartClass/" + courseid, null, function (data) {
        var i, x, y;
        var dataPoints = [];
        for (i = 0; i < data.length; i++) {
            x = data[i].Label;
            // alert(x);
            y = data[i].Y;
            dataPoints.push({ label: x, y: y });
        }
        //alert(dataPoints);
        var chart = new CanvasJS.Chart("chartClass",
           {
               animationEnabled: true,
               zoomEnabled: true,

               title: {
                   text: "该课程各班级学生数量对比图"
               },
               data: [
               {
                   type: "spline",
                   dataPoints: dataPoints
               }
               ]
           });
        chart.render();
    });

    var i = 0;
    $(".chapter h3 strong").click(function () {
        if (i == 0) {
            //alert(i);
            $(this).parent().next("ul").slideDown();
            $(this).parent().find("span").html("-");
            $(this).find("i").attr("class", "hasOpenOn");
            i = 1;
        } else {
            //alert(i);
            $(this).parent().next("ul").slideUp();
            $(this).parent().find("span").html("+");
            $(this).find("i").attr("class", "hasOpen");
            i = 0;
        }
    });

    //删除课时对话框
    exports.showDelLesson = function (self) {
        var id = $(self).attr("data-id");
        var name = $(self).attr("data-name");
        //alert(id);
        $("#lname").attr("data-id", id);
        $("#lname").text(name);
        $('#delLessonPopup').modal("show");
    }
    window.showDelLesson = exports.showDelLesson;


    //删除课时
    $("#btnDelLesson").click(function () {
        var id = $("#lname").attr("data-id");
        $.post("/Lesson/Del/" + id, null, function (msg) {
            if (msg == "notallow") {
                alert("该课时已包含有笔记和问题，不能删除，建议你锁定该课时");
                $('#delLessonPopup').modal("hide");
            } else {
                location.reload();
            }
        });
    });

    //删除单元对话框
    exports.showDelUnit = function (self) {
        var id = $(self).attr("data-id");
        var name = $(self).attr("data-name");
        //alert(id);
        $("#uname").attr("data-id", id);
        $("#uname").text(name);
        $('#delUnitPopup').modal("show");
    }
    window.showDelUnit = exports.showDelUnit;
    //删除单元
    $("#btnDelUnit").click(function () {
        var id = $("#uname").attr("data-id");
        $.post("/Unit/Del/" + id, null, function (msg) {
            if (msg == "notallow") {
                alert("该单元已包含有课时，不能删除，建议你锁定或编辑该单元");
                $('#delUnitPopup').modal("hide");
            } else {
                location.reload();
            }
        });
    });


    //删除模块对话框
    exports.lockLesson = function (id, self) {
        var icon = $(self).find('i');

        if (icon.hasClass("icon-unlock")) {
            $.get("/Lesson/Lock/" + id, { islock: true }, function (msg) {
                if (msg == "ok") {
                    icon.removeClass("icon-unlock");
                    icon.addClass("icon-lock");
                    $(self).attr("title", "解锁课时");
                }
            });
        } else {
            $.get("/Lesson/Lock/" + id, { islock: false }, function (msg) {
                if (msg == "ok") {
                    icon.removeClass("icon-lock");
                    icon.addClass("icon-unlock");
                    $(self).attr("title", "锁定课时");
                }
            });
        }

    }
    window.lockLesson = exports.lockLesson


    //锁定模块
    exports.lockUnit = function (id, self) {
        var icon = $(self).find('i');

        if (icon.hasClass("icon-unlock")) {
            $.get("/Unit/Lock/" + id, { islock: true }, function (msg) {
                if (msg == "ok") {
                    icon.removeClass("icon-unlock");
                    icon.addClass("icon-lock");
                    $(self).attr("title", "解锁单元");
                }
            });
        } else {
            $.get("/Unit/Lock/" + id, { islock: false }, function (msg) {
                if (msg == "ok") {
                    icon.removeClass("icon-lock");
                    icon.addClass("icon-unlock");
                    $(self).attr("title", "锁定单元");
                }
            });
        }

    }
    window.lockUnit = exports.lockUnit;

    exports.showDelBank = function (id) {
        //var id = $(self).attr("data-id");
        var name = $("#bank" + id).text();
        //alert(id);
        $("#bname").attr("data-id", id);
        $("#bname").text(name);
        $('#delBankPopup').modal("show");
    }
    window.showDelBank = exports.showDelBank;
    //删除tiku
    $("#btnDelBank").click(function () {
        var id = $("#bname").attr("data-id");
        $.post("/QusBank/Del/" + id, null, function (msg) {
            if (msg == "notallow") {
                alert("该题库已包含有题目时，不能删除");
                $('#delBnakPopup').modal("hide");
            } else {
                location.reload();
            }
        });
    });

    //打开编辑题库窗口
    exports.showEditBank = function (id) {
        //var id = $(self).attr("data-id");
        var name = $("#bank"+id).text();
        //alert(id);
        $("#bcontent").attr("data-id", id);
        $("#bcontent").val(name);
        $('#editBankPopup').modal("show");
    }
    window.showEditBank = exports.showEditBank;
    //修改题库
    $("#btnEditBank").click(function () {
        var doc = {};
        doc.id = $("#bcontent").attr("data-id");
        doc.name = $("#bcontent").val();
        if (doc.name == "") {
            alert(请输入题库名称);
            return false;
        }
        $.post("/QusBank/Update", doc, function (msg) {
            if (msg == "ok") {
                $("#bank" + doc.id).text(doc.name);
                $('#editBankPopup').modal("hide");
            } else {
                location.reload();
            }
        });
    });
   
   
});