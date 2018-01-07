define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var page = 1;
    $("#btnMoreDiscuss").click(function () {
        $.post("/Exam/getReply", { "idData": idData, "page": page }, function (listDiscuss) {
            if (listDiscuss.length < 10) {
                $("#btnMoreDiscuss").hide();
            } else {
                $("#btnMoreDiscuss").show();
            }
            var strHtml = "";
            for (var i = 0; i < listDiscuss.length; i++) {
                strHtml += '<li class="media">';
                strHtml += '  <a href="http://www.kejuwang.com/profile/' + listDiscuss[i].idUser + '" target="_blank" class="avatar pull-left">';
                strHtml += '    <img src="http://stat.kejuwang.com/avatar50/' + ((listDiscuss[i].avatarUser == 0) ? "default" : listDiscuss[i].idUser) + '.jpg">';
                strHtml += '  </a>';
                strHtml += '  <div class="media-body">';
                strHtml += '    <p class="media-heading">';
                strHtml += '      <a href="http://www.kejuwang.com/profile/' + listDiscuss[i].idUser + '" target="_blank">' + listDiscuss[i].nameUser + '</a>';
                strHtml += '      <a class="label label-success mgr10" target="_blank" href="http://bbs.kejuwang.com/article/25">' + listDiscuss[i].levelName + '</a>';
                if (listDiscuss[i].isTop) {
                    strHtml += '      <span class="i-top" >置顶</span>';
                }
                strHtml += '      <span class="pull-right muted f12">' + CountNow(listDiscuss[i].createdAt) + '</span>';
                strHtml += '    </p>';
                strHtml += '    <div class="mgt10">';
                strHtml += '      <p>' + listDiscuss[i].content + '</p>';
                //if (listDiscuss[i].reply) {
                //    strHtml += '      <div class="well well-small">' + listDiscuss[i].reply + '</div>';
                //}
                strHtml += '    </div>';
                strHtml += '    <div class="f12 muted  mgt10 pull-right">';
                strHtml += '      <a class="btn-sec-reply muted mgl10" onclick="showReplyDiscuss(' + listDiscuss[i].idAuto + ', \'' + listDiscuss[i].nameUser + '\', this)">回复</a>';
                //if ("68197" === "10102" || "68197" === "55916") {
                //    strHtml += '      <a class="btn-sec-delete muted mgl10" onclick="delDiscuss(' + listDiscuss[i].idAuto + ')">删除</a>';
                //    strHtml += '      <a class="btn-sec-delete muted mgl10" onclick="topDiscuss(' + listDiscuss[i].idAuto + ', ' + listDiscuss[i].isTop + ')">' + (listDiscuss[i].isTop ? "取消置顶" : "设置置顶") + '</a>';
                //}
                strHtml += '    </div>';
                strHtml += '  </div>';
                strHtml += '</li>';
            }
            if (page === 1) {
                $("#discuss ul").html(strHtml);
            } else {
                $("#discuss ul").append(strHtml);
            }
            page += 1;
        })
    })

    $("#btnMoreDiscuss").click();
    //回复讨论
    function replyDiscuss(content, idReply, name) {
        if (content.trim() === "" || content.trim() === "回复 " + name + "：") {
            alert("请输入评论一下再确定哦！")
        } else {
            var doc=[];
            doc.pid=;
            doc.replyid=;
            doc.objecttype=;
            doc.toid=;
            doc.type=;
            doc.userid=;
            doc.content=;
            $.post("/Reply/New", doc, function (msg) {
                if (msg === "ok") {
                    //刷新评论
                    page = 1;
                    $("#btnMoreDiscuss").click();
                    if (!idReply) {
                        //清空讨论输入
                        $("#replyData").val("");
                    }
                } else {
                    alert("评论失败，请重试！");
                }
            })
        }
    }
    const htmlReply = '<textarea id="txtReply" class="mgt20" cols="30" rows="2" style="width:98%;"></textarea>\n<a id="btnReply" class="btn btn-success pull-right" onclick="replyDiscuss()">回复</a>';
    //暂时回复讨论
    function showReplyDiscuss(idDiscuss, name, self) {
        var isReplyShown = $(self).parent().parent().find("textarea").length;
        $("#txtReply").remove();
        $("#btnReply").remove();
        if (!isReplyShown) {
            $(self).attr("data-showReply", "true");
            $(self).parent().parent().append(htmlReply);
            $("#txtReply").val("回复 " + name + "：");
            $("#btnReply").attr("onclick", "replyDiscuss($('#txtReply').val(), " + idDiscuss + ", '" + name + "')");
            $("#txtReply").focus();
        }
    }

    if ("68197" === "55916" || "68197" === "10102" || "68197" === "33655" || "68197" === "56254") {
        //删除评论，只有内部人才可以有这个权限
        function delDiscuss(idReply) {
            $.post("/result/delOneDiscuss", { "idReply": idReply }, function (msg) {
                if (msg === "ok") {
                    //刷新评论
                    page = 1;
                    $("#btnMoreDiscuss").click();
                } else {
                    alert("删除失败，请重试！");
                }
            })
        }
        //置顶评论，只有内部人才可以有这个权限
        function topDiscuss(idReply, isTop) {
            isTop = isTop ? 0 : 1;
            $.post("/result/topOneDiscuss", { "idReply": idReply, "isTop": isTop }, function (msg) {
                if (msg === "ok") {
                    //刷新评论
                    page = 1;
                    $("#btnMoreDiscuss").click();
                } else {
                    alert("删除失败，请重试！");
                }
            })
        }
    }
});