define(function (require, exports, module) {
  
    

    $(".dropdown").hover(function () {
        $(this).find("ul").show();
        $(this).find(".closed").attr("class", "active");
    }, function () {
        $(this).find("ul").hide();
        $(this).find(".active").attr("class", "closed");
    });

    $(".btnLogout").click(function () {
        $.post("/user/logout", function () {
            location.reload();
        });
    });

    var socket = io.connect(null);

    socket.on("listNotice", function (docs) {
        if (docs.length === 0) {
            var strHtml = "<li>没有任何消息</li>\n";
            strHtml += '<a href="/notice" target="_blank" class="btn btn_more" style="position:absolute;bottom:0;width:100%;margin:0">查看全部</a>';
            $("#ulNoticeTop").html(strHtml);
            $("#numNoticeTop").text("");
            $("#numNoticeTop").hide();
        } else {
            var strHtml = ""
            for (var i = 0; i < docs.length; i++) {
                if (docs[i].idQuestionOld) {
                    strHtml += '<li id="' + docs[i].id + '" class="itemNotice" idQuestion="' + docs[i].idQuestionOld + '">\n';
                } else {
                    strHtml += '<li id="' + docs[i].id + '" class="itemNotice">\n';
                }
                strHtml += '  <div class="notice-content">' + generalNotice(docs[i]) + '</div>\n';
                strHtml += '</li>\n';
            }
            strHtml += '<a href="/notice" target="_blank" class="btn btn_more" style="position:absolute;bottom:0;width:100%;margin:0">查看全部</a>';
            $("#ulNoticeTop").html(strHtml);
            $("#numNoticeTop").text(docs.length);
            $("#numNoticeTop").show();
            $(".itemNotice").click(function () {
                var doc = { "id": $(this).attr("id") };
                if ("undefined" !== typeof $(this).attr("idQuestion")) {
                    doc.idQuestionOld = $(this).attr("idQuestion");
                }
                socket.emit("readNotice", doc);
            });
        }
    });

    function generalNotice(notice) {
        var strHtml = "";
        switch (notice.type) {
            case '1':
                strHtml += '<a href="/profile/' + notice.senderID + '" target="_blank">' + notice.senderName + '</a> ';
                strHtml += "有一个问题向你求助：" + notice.content;
                return strHtml;
            case '2':
                strHtml += '<a href="/profile/' + notice.senderID + '" target="_blank">' + notice.senderName + '</a> ';
                strHtml += "回答了你的问题：" + notice.content;
                return strHtml;
            case '3':
                strHtml += '<a href="/profile/' + notice.senderID + '" target="_blank">' + notice.senderName + '</a> ';
                strHtml += "回复了你的回答：" + notice.content;
                return strHtml;
            case '4':
                strHtml += '<a href="/profile/' + notice.senderID + '" target="_blank">' + notice.senderName + '</a> ';
                strHtml += "采纳了你的回答：" + notice.content;
                return strHtml;
            case '5':
                strHtml += '<a href="/profile/' + notice.senderID + '" target="_blank">' + notice.senderName + '</a> ';
                strHtml += '给你留了言：' + notice.content;
                return strHtml;
            case '6':
                strHtml += '<a href="/profile/' + notice.senderID + '" target="_blank">' + notice.senderName + '</a> ';
                strHtml += '回复了你的留言：' + notice.content;
                return strHtml;
            case '7':
                strHtml += '【通知】<a href="http://www.kejuwang.com/profile/' + notice.senderID + '" target="_blank">' + notice.senderName + '</a>';
                strHtml += '回答了：' + notice.content;
                return strHtml;
            case '11':
                strHtml += '<a href="/profile/' + notice.senderID + '" target="_blank">' + notice.senderName + '</a> ';
                strHtml += '评论了你的帖子：' + notice.content;
                return strHtml;
            case '12':
                strHtml += '<a href="/profile/' + notice.senderID + '" target="_blank">' + notice.senderName + '</a> ';
                strHtml += '回复了你的评论：' + notice.content;
                return strHtml;
            case '13':
                strHtml += '<a href="/profile/' + notice.senderID + '" target="_blank">' + notice.senderName + '</a>';
                strHtml += '点赞了你的帖子：' + notice.content;
                return strHtml;
            case '14':
                strHtml += '<a href="/profile/' + notice.senderID + '" target="_blank">' + notice.senderName + '</a>';
                strHtml += '点赞了你的回复：' + notice.content;
                return strHtml;
            default:
                return notice;
        }
    }
});