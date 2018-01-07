define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('scoket');
    require('tool');
    //require('progress');
    //require('allRank');
    //var date = require('date');
    //require('chart');
    var chartid;
    exports.init = function (id) {
        chartid = id;
    }


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
        var doc = {};
        doc.id = chartid;
        doc.text = text;
        $.post("/Mail/DotToDot", doc, function (msg) {
            if (msg == "notlog") {
                alert("您还没有登录");
                location.href = "";
            } else if (msg == "ok") {
                location.reload();
            } else {
                alert("发送失败，请重试！");
                $("#btnSendMail").button("reset");
                console.trace(msg);
            }
        });
    });

});