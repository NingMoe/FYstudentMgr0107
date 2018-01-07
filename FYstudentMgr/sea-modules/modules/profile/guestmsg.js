define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('scoket');
    require('tool');
    //require('progress');
    //require('allRank');
    //var date = require('date');
    //require('chart');
    var toid, id,type,level;
    var userid = $("#btnGuestBook").attr("data-userid");
    var byuserid = $("#btnGuestBook").attr("data-byuserid");
    var idRemove,removetype;
    $("#btnGuestBook").click(function () {
        var content=$.trim($("#txtGuestBook").val());
        if ("" !== content) {
            $("#btnGuestBook").button("loading");
            if (content.indexOf("回复")!=-1) {
                //alert(content.indexOf("回复"));
                $.post("/Reply/New", { "pid": userid, "replyid": id, "level": level, "toid": toid, "content": content.substr(content.indexOf("：") + 1), "type": type }, function (msg) {
                    $("#btnGuestBook").button("reset");
                    if ("failed" === msg) {
                        alert("留言失败");
                    } else {
                        location.reload();
                    }
                });
               
            } else {
                //alert(2);
                $.post("/Profile/NewMessage", { "userid": userid, "byuserid": byuserid, "content": content }, function (msg) {
                    $("#btnGuestBook").button("reset");
                    if ("failed" === msg) {
                        alert("留言失败");
                    } else {
                        location.reload();
                    }
                });

            }
            
        }
    });
    $("#txtGuestBook").focus();
    $("#txtGuestBook").keyup(function (evt) {
        if (13 === evt.keyCode) {
            $("#txtGuestBook").val($.trim($("#txtGuestBook").val()));
            $("#btnGuestBook").click();
        }
    });
    $("#txtGuestBook").on("input", function () {
        if ("" === $.trim($("#txtGuestBook").val())) {
            $("#btnGuestBook").attr("disabled", "disabled");
        } else {
            $("#btnGuestBook").removeAttr("disabled");
        }
    });
    $(".btnRemoveMsg").click(function () {
        idRemove = $(this).attr("data-id");
        removetype = 0;
        $("#modalRemove").modal();
    });

    $(".btnRemove").click(function () {
        idRemove = $(this).attr("data-id");
        removetype = 1;
        $("#modalRemove").modal();
    });
    $(".btnReply").click(function () {
        toid = $(this).attr("data-toid");
        id = $(this).attr("data-id");
        type = 2;
        level = parseInt($(this).attr("data-level")) + 1;
        $("#txtGuestBook").val("回复 " + $(this).attr("data-name") + "：" + $.trim($("#txtGuestBook").val()));
        $("#txtGuestBook").focus();
    });

    //$(".btnReply").click(function () {
    //    toid = $(this).attr("data-toid");
    //    id = $(this).attr("data-id");
    //    type = 1;
    //    $("#txtGuestBook").val("回复 " + $(this).attr("data-name") + "：" + $.trim($("#txtGuestBook").val()));
    //    $("#txtGuestBook").focus();
    //});
    $("#btnRemoveOK").click(function () {
        $("#btnRemoveOK").button("loading");
        if(removetype==0)
        $.post("/Profile/DelMessage", { "idRemove": idRemove }, function (msg) {
            location.reload();
        });
        if (removetype == 1)
            $.post("/Profile/DelReply", { "idRemove": idRemove }, function (msg) {
                location.reload();
            });
    });

});