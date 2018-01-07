define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('bootstrap');
    //require('scoket');
    require('tool');
    var date = require('date');
    require('chart');
    //alert(boot);
    $('#alert').click(function () {
        alert('弹出了一个框！');
    });
    var pageNewsFeed = 0;

    

    $("#btnMoreNewsFeed").click(function () {
        $("#btnMoreNewsFeed").button("loading");
        $.post("/StudyRecord/GetAll", { "page": pageNewsFeed }, function (data) {
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
    $("#btnMoreNewsFeed").click();

    function generateNewsFeed(docs) {
        var strHtml = '';
        for (var i = 0; i < docs.length; i++) {
            strHtml += '<li class="media">';
            strHtml += '  <a href="/profile/' + docs[i].idUser + '" target="_blank" class="avatar pull-left">';
            strHtml += '    <img src="' + docs[i].avatarUser + '">';
            strHtml += '  </a>';
            strHtml += '  <div class="media-body">';
            strHtml += '    <p class="media-heading">';
            strHtml += '      <a href="/profile/' + docs[i].idUser + '" target="_blank">' + docs[i].nameUser + ' </a>' + docs[i].content;
            strHtml += '    </p>';
            if ('' !== docs[i].answer) {
                strHtml += '        <div class="well" style="padding-bottom:9px;">' + docs[i].answer + '</div>';
            }
            if ('' !== docs[i].tailName) {
                strHtml += '    <span class="f12 muted">' + countNow(new Date(docs[i].createdAt)) + ' 来自 <a class="muted" href="' + docs[i].tailLink + '" target="_blank">' + docs[i].tailName + '</a></span>';
            } else {
                strHtml += '    <span class="f12 muted">' + countNow(new Date(docs[i].createdAt)) + '   </span>';
            }
            strHtml += '  </div>';
            strHtml += '</li>';
        }
        pageNewsFeed += 1;
        $("#listNewsFeed").append(strHtml);
        $("#btnMoreNewsFeed").button("reset");
        if (docs.length < 20) {
            $("#btnMoreNewsFeed").hide();
        }
    }



    exports.showModalTask= function (obj) {
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
    }    window.showModalTask = exports.showModalTask;
});