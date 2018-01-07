define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('tool');
    require('stickup');
    var UE = require('ueditor');
    var  classid,discussid,userid,toid, nameReply, answerReply, idAnswerReply,level;
    userid = $('#kj_usermenu').attr('data-userid');
    discussid = $("#toid").attr("data-id");
    classid=$("#toid").attr("data-classid");
    
    var date = require('date');
    $(document).ready(function () {
        $("#stickAction").stickUp();
    });
    //页面打开时增加阅读数
    $.post("/Discuss/AddRead", { id: discussid });
    $("span.time").each(function () {
        var time = $(this).text();
        $(this).text(date.countNow(time));
    });
    var option = {
        //initialContent: noteContent,
        encodeuri: true,
        initialFrameHeight : 200,
        initialContent : autoContent(),
        toolbars: [[
        'fontsize', 'forecolor', 'backcolor',
        'bold', 'italic', 'underline', 'superscript', 'subscript', 'simpleupload'
        ]]
    };
    var ue = UE.init("ueditor", option);
    window.ue = exports.ue=ue;
    //根据链接末尾的#id生成编辑框的初始内容
    function autoContent() {
        var url = location.href;
        var id = url.substr(url.indexOf("#") + 1);
        if (!isNaN(id)) {
            toid = $("#" + id).find("a:eq(1)").attr("data-idUser");
            nameReply = $("#" + id).find("a:eq(1)").text();
            idAnswerReply = $("#" + id).attr("id");
            return "回复 " + $("#" + id).find("a:eq(1)").text() + "：";
        } else {
            return "";
        }
    }

    //评论后面的回复被点击时定位到编辑框
    $(".btnReply").click(function(){
        ue.setContent("回复 " + $(this).parent().parent().find("a:eq(0)").text() + "：");
        ue.focus(ue);
        level =parseInt( $(this).attr("data-level"));
        toid   = $(this).parent().parent().find("a:eq(0)").attr("data-idUser");
        nameReply = $(this).parent().parent().find("a:eq(0)").text();
        idAnswerReply = $(this).parent().parent().parent().attr("id");
    });
    //审核按钮
    $("#Check").click(function () {
        $.post("/Discuss/Check/" + discussid, null, function (msg) {
            if (msg == "ok") {
                alert("审核成功！");
                $("#Check").hide();
            }
        })
    });
    //回答按钮点击时负责ajax保存回复内容
    $("#btnAnswer").click(function(){
        var content = "";
        if(ue.hasContents()){
            content = ue.getContent();
        }
        if(content!==""&&content!=="<p>回复 " + nameReply + "：</p>"){
            $(this).button("loading");
            if (content.indexOf("<p>回复 " + nameReply + "：") === 0) {
                //alert(1);
                $.post("/Reply/New", { "pid": discussid,  "replyid": idAnswerReply,"level":level+1, "toid": toid, "content": encodeURI("<p>" + content.substr(content.indexOf("：") + 1)), "type": 1}, function (msg) {
                    location.reload();
                });
            } else {
                idAnswerReply = $("#toid").attr("data-id");
                toid = $("#toid").attr("data-toid");
                $.post("/Reply/New", {  "pid": discussid,  "replyid": idAnswerReply,"level":1, "toid": toid, "content": encodeURI(content), "type": 1}, function (msg) {
                    location.reload();
                });
               
            }
        }
    });
   
    var isBest = false;
    $(".btnBest").click(function(){
        if(!isBest){
            isBest = true;
            $.post("/question/best", {"idQuestion":"20807", "idAnswer":$(this).parent().parent().parent().attr("id"), "answer":$(this).parent().prev().html(), "idUser":$(this).parent().parent().parent().attr("data-idUser")}, function (msg){
                location.reload();
            });
        }
    });
    //赞回复
    exports.likeAnswer=function(idAnswer, self) {
        if(userid!=""){
            var htmlLiked = $(self).html(), countLiked = 0;
            if(htmlLiked.indexOf("已")<0){
                if(htmlLiked.indexOf("(")>0){
                    countLiked = Number($(self).find("span:first").text());
                }
                $.post("/Reply/AddLike", {"id":idAnswer,"userid":userid}, function (msg){
                    if("notfound"===msg){
                        location.reload();
                    } else if("ok"===msg){
                        $(self).html('赞 (<span class="post-num">' + (countLiked+1).toString() + "</span>)");
                    } else if ("again" === msg) {
                        $(self).html('已赞 (<span class="post-num">' + countLiked + "</span>)");
                    }
                });
            }
        } else {
            $(".btnLogin").click();
        }
    }

    window.likeAnswer = exports.likeAnswer;

    ////赞问题
    var isLiked = false;
    $("#btnLike").click(function () {
        if (!isLiked) {
            $.post("/Discuss/AddLike", { "id": discussid, "userid": userid }, function (msg) {
                if ("notLogin" === msg) {
                    $(".btnLogin").click();
                } else if ("ok" === msg) {
                    var num = Number($("#numLiked").text()) + 1;
                    $("#numLiked").text(num);
                    $("#like").html("<i></i>" + num);
                } else {
                    isLiked = true;
                    $("#numLiked").text("已赞");
                }
            });
        } else {
            isLiked = true;
            $("#numLiked").text("已赞");
        }
    });



    //删除回复
    exports.delAnswer=function(idAnswer) {
        $.post("/Reply/Del", { "id": idAnswer, "discussid": discussid }, function (msg) {
            if (msg == 'ok') {
                location.reload();
            } else {
                alert(msg);
                location.reload();
            }
        });
    }
    window.delAnswer = exports.delAnswer;

    exports.showDel = function (idComment) {
        $('#deletePopup').modal("show");
    }
    window.showDel = exports.showDel;


    $("#btnDelQuestion").click(function(){
        $.post("/Discuss/Del", { "id": discussid }, function (msg) {
            if (msg == 'error') {
                alert("删除失败，请重试！");
                location.reload();
            } else {
                location.href = "/Discuss/Default/" + classid;
            }
            
        });
    });
   
});