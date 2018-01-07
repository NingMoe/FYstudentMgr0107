
define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('tool');
    require('stickup');
    var UE = require('ueditor');
    var subjectid, username, articleid, userid, toid, nameReply, answerReply, idAnswerReply,level;
    username=$('#username').text();
    userid = $('#kj_usermenu').attr('data-userid');
    articleid = $("#toid").attr("data-id");
    subjectid = $("#subjectbar").attr("data-id");
    $(document).ready(function () {
        $("#stickAction").stickUp();
    });
    //classid = $("#toid").attr("data-classid");
    var date = require('date');
    //打开页面是增加阅读数
    $.post("/Article/AddRead", { id: articleid });
    


    //将时间修改成几天前格式
    $("span.time").each(function () {
        var time = $(this).text();
        $(this).text(date.countNow(time));
    });
    var option = {
        //initialContent: noteContent,
        initialFrameHeight: 200,
        initialContent: autoContent(),
        toolbars: [[
        'fontsize', 'forecolor', 'backcolor',
        'bold', 'italic', 'underline', 'superscript', 'subscript', 'simpleupload'
        ]]
    };
    var ue = UE.init("ueditor", option);
    window.ue = exports.ue = ue;
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

    

    //对文章进行评论
    $("#btnReplyArticle").click(function () {
        var content = "";
        if (ue.hasContents()) {
            content = ue.getContent();
        }
        if (content !== "") {
            $(this).button("loading");
           
            idAnswerReply = $("#toid").attr("data-id");
            toid = $("#toid").attr("data-toid");
            $.post("/Reply/New", { "pid": articleid, "replyid": idAnswerReply,"level":1, "toid": toid, "content": encodeURI(content), "type": 0, "userid": userid }, function (msg) {
                   location.reload();
                });

            
        }
    });
    //审核按钮
    $("#Check").click(function () {
        $.post("/Article/Check/" + articleid, null, function (msg) {
            if (msg == "ok") {
                alert("审核成功！");
                $("#Check").hide();
            }
        })
    });
    //置顶按钮
    $("#Top").click(function () {
        $.post("/Article/Top/" + articleid, null, function (msg) {
            if (msg == "top") {
                alert("置顶成功！");
                $("#Top").text("取消置顶");
            }
            if (msg == "down") {
                alert("取消置顶成功！");
                $("#Top").text("置顶");
            }
        })
    });

    const htmlReply = '<textarea id="txtReply" class="mgt20" cols="30" rows="2" style="width:98%;"></textarea>\n<a id="btnReply" class="btn btn-success pull-right" onclick="replyComment()">回复</a>';
    //评论的回复按钮处理
    exports.showReplyComment = function (idComment,idReply, idSendTo,level, name, self) {

        var isReplyShown = $(self).parent().parent().find("textarea").length;
        $("#txtReply").remove();
        $("#btnReply").remove();
        if (!isReplyShown) {
            $(self).attr("data-showReply", "true");
            $(self).parent().parent().append(htmlReply);
            $("#txtReply").val(name ? ("回复 " + name + "：") : "");
            $("#txtReply").attr("data-idReply", idReply);
            $("#txtReply").attr("data-idComment", idComment);
            $("#txtReply").attr("data-idSendTo", idSendTo);
            $("#txtReply").attr("data-level", level+1);
            $("#txtReply").focus();
        }

    }

    window.showReplyComment = exports.showReplyComment;

    //负责评论的回复
    exports.replyComment = function () {
        var idReply = $("#txtReply").attr("data-idReply"), content = $.trim($("#txtReply").val().replace(/\n/ig, "<br>"));
        var toid = $("#txtReply").attr("data-idSendTo");
        var idComment = $("#txtReply").attr("data-idComment");
        var level= $("#txtReply").attr("data-level");
        if (content !== "") {
            $.post("/Reply/New", { "pid": articleid, "replyid": idReply, "level": level, "toid": toid, "content": encodeURI(content), "type": 0, "userid": userid }, function (msg) {
                if ("ok" == msg) {
                    var strHtml = '<div class="reply media">';
                    strHtml += '  <a href="/Profile/Index/'+userid+'" target="_blank" class="small-avatar mgr10 pull-left">';
                    strHtml += '    <img src="http://img.xueqitian.com/avatar50/'+userid+'.jpg">';
                    strHtml += '  </a>';
                    strHtml += '  <div class="media-body">';
                    strHtml += '    <p class="media-heading">';
                    strHtml += '      <a href="/Profile/Index/' + userid + '" target="_blank">'+username+'</a>';
                    strHtml += '      <span class="muted f12 mgl10">刚刚</span>';
                    strHtml += '    </p>';
                    strHtml += '    <div class="mgt10">' + content + '</div>';
                    strHtml += '    <div class="f12 muted mgt20 pull-right">';
                    strHtml += '      <a class="btn-sec-reply muted mgl10" onclick="showReplyComment(' + idComment + ', ' + idReply + ', ' + userid + ', ' + level + ', "' + username + '", this)">回复</a>'
                    strHtml += '    </div>';
                    strHtml += '  </div>';
                    strHtml += '</div>';
                    $("#" + idComment).append(strHtml);
                    $("#txtReply").remove();
                    $("#btnReply").remove();
                } else if ("error" == msg) {
                    alert("奇怪，居然回复失败了！");
                } else {
                    location.reload();
                }
            });
        }
    }
    window.replyComment = exports.replyComment;

    //赞回复
    exports.likeComment = function (idAnswer, self) {
        if (userid != "") {
            var htmlLiked = $(self).html(), countLiked = 0;
            if (htmlLiked.indexOf("已") < 0) {
                if (htmlLiked.indexOf("(") > 0) {
                    countLiked = Number($(self).find("span:first").text());
                }
                $.post("/Reply/AddLike", { "id": idAnswer, "userid": userid }, function (msg) {
                    if ("notfound" === msg) {
                        location.reload();
                    } else if ("ok" === msg) {
                        $(self).html('赞 (<span class="post-num">' + (countLiked + 1).toString() + "</span>)");
                    } else if ("again" === msg) {
                        $(self).html('已赞 (<span class="post-num">' + countLiked + "</span>)");
                    }
                });
            }
        } else {
            $(".btnLogin").click();
        }
    }
    
    window.likeComment = exports.likeComment;

    ////赞文章
    var isLiked = false;
    $("#btnLike").click(function () {
        if (!isLiked) {
            $.post("/Article/AddLike", { "id": articleid, "userid": userid }, function (msg) {
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
    exports.delComment = function (idComment) {
        $.post("/Reply/Del", { "id": idComment, "articleid": articleid }, function (msg) {
            if (msg == 'ok') {
                location.reload();
            } else {
                alert(msg);
                location.reload();
            }
            
        });
    }
    window.delComment = exports.delComment;
    exports.showDel = function (idComment) {
        $('#deletePopup').modal("show");
    }
    window.showDel = exports.showDel;
    
    //删除文章
    $("#btnDelArticle").click(function () {
        $.post("/Article/Del", { "id": articleid }, function (msg) {
            if (msg == 'error') {
                alert("删除失败，请重试！");
                location.reload;
            } else {
                location.href = "/BBS/Index/" + subjectid;
            }
            
        });
    });


    $("#btnAsk").click(function () {
        location.href = "/Article/Create/" + subjectid+"?articleid="+articleid;
    });
});