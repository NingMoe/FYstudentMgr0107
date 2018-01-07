define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('scoket');
    require('tool');
    //require('progress');
    //require('allRank');
    var date = require('date');
    //require('chart');
    var i = 0;
    $(".feedtime").each(function () {
        var time = $(this).text();
        $(this).text(date.countNow(time));
    });

    var pageNewsFeed = 1;
    var userid ;
    exports.init=function(id){
        userid=id;
    };

    $("#btnMoreNewsFeed").click(function () {
        $("#btnMoreNewsFeed").button("loading");
        $.post("/Profile/NewsFeed", { "id":userid,"page": pageNewsFeed }, function (data) {
            pageNewsFeed += 1;
            $("#ulNewsFeed").append(data);
            $("#btnMoreNewsFeed").button("reset");
            if (data.split("</li>").length - 1 < 3) {
                $("#btnMoreNewsFeed").hide();
            }
            $(".feedtime").each(function () {
                var strdate = $(this).text();
                //alert(strdate);
                if (strdate.length > 10) {
                    $(this).text(date.countNow(strdate));
                }

            });
        });
    });
  
    $("#SendMail").click(function () {
        $("#tip").text("");
        $("#MailContent").val("");
        $('#sendMailPopup').modal("show");
    });


    $("#btnSendMail").click(function () {
        var text = $("#MailContent").val();
        //console.trace(text);
        if (text.length <= 0) {
            $("#tip").text("总要跟他/她说点什么啊！");
            $("#MailContent").focus();
            $("#btnSendMail").button("reset");
            return false;
        } else {
            $("#tip").text("");
        }
        var doc={};
        doc.id=userid;
        doc.text=text;
        $.post("/Mail/DotToDot",doc,function(msg){
            if(msg=="notlog"){
                alert("您还没有登录");
                location.href="";
            }else if(msg=="ok"){
                $('#sendMailPopup').modal("hide");
            }else{
                alert("发送失败，请重试！");
                $("#btnSendMail").button("reset");
                console.trace(msg);
            }
        });
    });
});