define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('scoket');
    require('tool');
   
    require('progress');
    require('allRank');
    var date = require('date');
    require('chart');
    var pageNewsFeed = 0;
    var classID = $('#feeds_school').attr('data-classid');


    $("#btnMoreNewsFeed").click(function () {
        $("#btnMoreNewsFeed").button("loading");
        $.post("/StudyRecord/GetByClassID", { id:classID,"page": pageNewsFeed}, function (data) {
            pageNewsFeed += 1;
            $("#listNewsFeed").append(data);
            $("#btnMoreNewsFeed").button("reset");
            if (data.split("</li>").length - 1 < 3) {
                $("#btnMoreNewsFeed").hide();
            }
            $(".date").each(function () {
                var strdate = $(this).text();
                //alert(strdate);
                if (strdate.length > 10) {
                    $(this).text(date.countNow(strdate));
                }

            });
        });
    });

    $(".enrolldate").each(function () {
        var strdate = $(this).text();
        //alert(strdate);
        if (strdate.length > 10) {
            $(this).text(date.countNow(strdate));
        }

    });
    $("#btnMoreNewsFeed").click();

    exports.showModalTask = function (obj) {
        var strReward = $(obj).find("input:eq(5)").val()
        , title = $(obj).find("input:eq(0)").val()
        , description = $(obj).find("input:eq(1)").val()
        , link = $(obj).find("input:eq(2)").val()
        , idTask = $(obj).find("input:eq(3)").val();
        $("#modalTaskTitle").text(title);
        $("#modalTaskDescription").html(description);
        $("#modalTaskReward").text("任务奖励：" + strReward);
        $("#btnModalTaskLink").attr("href", link);
        $("#btnModalTaskLink").show();
        if (link) {
            $("#btnModalTaskLink").show();
            $("#btnModalTaskLink").attr("href", link);
        } else {
            $("#btnModalTaskLink").hide();
        }
        $("#modalTask").modal();
        docTask = { "idTask": idTask };
        $("#divBonus").text(strReward);
    }
    window.showModalTask = exports.showModalTask;
});