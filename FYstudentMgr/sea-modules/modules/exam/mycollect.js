define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('scoket');
    require('tool');
    //require('progress');
    //require('allRank');
    var date = require('date');
    //require('chart');
    var count = $("#list li").length;
    console.trace(count);
    var classid;
    var id = "";
    var idData = "";
    
    Array.prototype.contains = function (obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }


    var id = "";
    var idData = "";
    //上一题
    $("#btnBefore").click(function () {
        if (parseInt(id) > 1) {
            $(this).button("loading");
            $("#li" + (parseInt(id) - 1)).click();
        }
    });
    //下一题
    $("#btnNext").click(function () {
        if (parseInt(id) < count) {
            $(this).button("loading");
            $("#li" + (parseInt(id) + 1)).click();
        }
    });
    $("#timu li").click(function () {
        $("#li" + id).removeClass("dangqian");
        $(this).addClass("dangqian");
        id = $(this).text();
        idData = $(this).attr("iddata");
        if (parseInt(id) === 1) {
            $("#btnBefore").hide();
            $("#btnNext").show();
        } else if (parseInt(id) === count) {
            $("#btnBefore").show();
            $("#btnNext").hide();
        } else {
            $("#btnBefore").show();
            $("#btnNext").show();
        }
        //if ($(this).hasClass("biaoji")) {
        //    $("#mark").prop("checked", true);
        //} else {
        //    $("#mark").prop("checked", false);
        //}
        $("#divLoading").show();
        $.post("/Exam/getCollectData", { "qusid": idData }, function (result) {
            if (result != null) {
                var strHtml = "";
                var strChild = '';//财经法规的单独处理
                var strAnswer = "ABCDEFGH";
                $("#divNormal").show();
                $("#divChild").hide();
                var answers;
                var newanswers = [];
                if (result.MyAnswer != null) {
                    answers = result.MyAnswer.split(",");
                    //answers.pop();
                    answers.forEach(function (data, index, arr) {
                        newanswers.push(+data);
                    });
                }
                var correctAnswer = "";
                switch (result.Type) {
                    case 1:
                        $("#oneTitle").text("单项选择题");
                        for (var i = 0; i < result.Options.length; i++) {
                            if (result.Options[i].IsCorrect && result.MyAnswer) {
                                correctAnswer = correctAnswer + strAnswer.substr(i, 1);
                                strHtml += '<label class="answer_item correct" style="display:block;font-weight: normal!important;"for="radio' + (i + 1) + '">';
                            } else {
                                strHtml += '<label class="answer_item" style="display:block;font-weight: normal!important;" for="radio' + (i + 1) + '">';
                            }
                            strHtml += '  <label><input id="radio' + (i + 1) + '" name="answerCheck" type="radio"  value="' + result.Options[i].QusOptionID + '" ' + ((result.MyAnswer && newanswers.contains(result.Options[i].QusOptionID)) ? 'checked="true"' : '') + ' disabled="true"><i>' + strAnswer.substr(i, 1) + '.</i></label>';
                            strHtml += '  <div class="analyze_div">' + result.Options[i].Content + '</div>';
                            strHtml += '</label>';
                        }
                        $("#tip").show();
                        $("#tip_correct").text("正确答案：" + correctAnswer);
                        $("#tip_msg").html("文字解析：" + result.TextAnalysis);
                        break;
                    case 2:
                        $("#oneTitle").text("多项选择题");
                        for (var i = 0; i < result.Options.length; i++) {
                            if (result.Options[i].IsCorrect && result.MyAnswer) {
                                correctAnswer = correctAnswer + strAnswer.substr(i, 1);
                                strHtml += '<label class="answer_item correct" style="display:block;font-weight: normal!important;"for="radio' + (i + 1) + '">';
                            } else {
                                strHtml += '<label class="answer_item" style="display:block;font-weight: normal!important;"for="radio' + (i + 1) + '">';
                            }
                            strHtml += '  <label><input id="cb' + (i + 1) + '" name="answerCheck" type="checkbox"  value="' + result.Options[i].QusOptionID + '" ' + (result.MyAnswer && newanswers.contains(result.Options[i].QusOptionID) ? 'checked="true"' : '') + ' disabled="true"><i>' + strAnswer.substr(i, 1) + '.</i></label>';
                            strHtml += '  <div class="analyze_div">' + result.Options[i].Content + '</div>';
                            strHtml += '</label>';
                        }
                        $("#tip").show();
                        $("#tip_correct").text("正确答案：" + correctAnswer);
                        $("#tip_msg").html("文字解析：" + result.TextAnalysis);
                        break;
                    case "yesno":
                        $("#oneTitle").text("判断题");
                        if (result.data.answer === "A" && result.record) {
                            strHtml += '<label class="answer_item correct" for="radio1">';
                        } else {
                            strHtml += '<label class="answer_item" for="radio1">';
                        }
                        strHtml += '  <label><input id="radio1" name="answerCheck" type="radio" value="A" ' + ((result.record && 'A' === result.record.myAnswer) ? 'checked="true"' : '') + ' disabled="true"><i></i></label>';
                        strHtml += '  <div class="analyze_div">对</div>';
                        strHtml += '</label>';
                        if (result.data.answer === "B" && result.record) {
                            strHtml += '<label class="answer_item correct" for="radio2">';
                        } else {
                            strHtml += '<label class="answer_item" for="radio2">';
                        }
                        strHtml += '  <label><input id="radio2" onchange="changeAnswer(this)" name="answerCheck" type="radio" value="B" ' + ((result.record && 'B' === result.record.myAnswer) ? 'checked="true"' : '') + ' disabled="true"><i></i></label>';
                        strHtml += '  <div class="analyze_div">错</div>';
                        strHtml += '</label>';
                        $("#tip").show();
                        $("#tip_correct").text("正确答案：" + result.data.answer);
                        $("#tip_msg").html("文字解析：" + result.data.tip);
                        break;

                }
                if (result.MyAnswer) {
                    $("#collect").attr("disabled", false);
                    //$("#collect").prop("checked", true);
                    if (result.IsCollect) {
                        $("#collect").prop("checked", true);
                    } else {
                        $("#collect").prop("checked", false);
                    }
                    if (result.IsCollect && result.Note != null) {
                        $("#tikuDataNote").show();
                        $("#tikuDataNote").text(result.Note);
                        $("#noteEditor").hide();
                        $("#editDataNote").val(result.Note);
                    } else {
                        $("#tikuDataNote").show();
                        $("#tikuDataNote").html('<div class="text-center" id="btnAddDataNote">+ 我的备注</div>');
                        $("#noteEditor").hide();
                        $("#editDataNote").val("");
                    }
                    var recordHtml = "";
                    recordHtml += '<div class="sortlist"><h1>统计</h1></div>';
                    recordHtml += '<p class="mgt20">我的做题记录：<span class="muted">共做过' + result.DoCount + '次，做错<span class="text-keju">' + result.ErrorCount + '</span>次，做对<span class="text-success">' + (result.DoCount - result.ErrorCount) + '</span>次</span></p>';
                    if (result.WrongRate < 0) {
                        recordHtml += '<div>同学的错误率：<span class="muted">目前还没有人做过这个题目，要不您来尝个鲜！</span></div>';
                    } else {
                        recordHtml += '<div>同学的错误率：<span class="muted">有' + result.WrongRate + '%的人做错过</span></div>';
                    }
                    $("#divRecord").html(recordHtml);
                    $("#divRecord").show();
                    //标签
                    //$("#divTag").show();
                    //if (result.data.fallible) {
                    //    $("#divTag a:eq(1)").show();
                    //} else {
                    //    $("#divTag a:eq(1)").hide();
                    //}
                    //if (result.data.showOften) {
                    //    $("#divTag a:eq(2)").show();
                    //} else {
                    //    $("#divTag a:eq(2)").hide();
                    //}
                    //交流区
                    $("#divCommunicate").show();
                    //相关问题
                    if ("" === "ncre_651709") {
                        $("#relatedQuestion .alert").show();
                        $("#relatedQuestion .btn").hide();
                    } else {
                        $("#relatedQuestion .btn").attr("href", "/Discuss/Create/" + classid + "?title=&idQuestion=" + idData);
                        $("#relatedQuestion .btn").show();
                        $("#relatedQuestion .alert").hide();
                    }
                    if (result.SimilarQuestions.length === 0) {
                        $("#relatedQuestion p").show();
                        $("#relatedQuestion ul").html("");
                    } else {
                        $("#relatedQuestion p").hide();
                        var questionHtml = "";
                        for (var i = 0; i < result.SimilarQuestions.length; i++) {
                            questionHtml += '<li class="clearfix">';
                            if (i == 0) {
                                questionHtml += '<span class="lv1">1</span>';
                            } else if (i < 3) {
                                questionHtml += '<span class="lv2">' + (i + 1) + '</span>';
                            } else {
                                questionHtml += '<span class="lv3">' + (i + 1) + '</span>';
                            }
                            questionHtml += '<a href="/Discuss/Details/' + result.SimilarQuestions[i].DiscussID + '" class="topic_name" target="_blank" title="' + result.SimilarQuestions[i].Title + '">' + result.SimilarQuestions[i].Title + '</a>';
                            questionHtml += '</li>';
                        }
                        $("#relatedQuestion ul").html(questionHtml);
                    }
                    //讨论
                    page = 1;
                    $("#btnMoreDiscuss").click();
                } else {
                    $("#tip").hide();
                    $("#tip_correct").text("");
                    $("#tip_msg").text("");
                    $("#tikuDataNote").hide();
                    $("#noteEditor").hide();
                    $("#editDataNote").val("");
                    $("#collect").prop("checked", false);
                    $("#collect").attr("disabled", true);
                    $("#divRecord").hide();
                    //标签
                    $("#divTag").hide();
                    $("#divTag a:eq(1)").hide();
                    $("#divTag a:eq(2)").hide();
                    //交流区
                    $("#divCommunicate").hide();
                }
                //普通题目的题干问题
                $("#oneContent").html(id + ". " + result.Body);
                $("#oneOption").html(strHtml);
                //财经法规的操作题
                $("#divChild").html(strChild);

                $("#divLoading").hide();
                $("#btnBefore").button("reset");
                $("#btnNext").button("reset");
            }
        })
        //checkIsCollected();
    });



    $("#tikuDataNote").click(function () {
        $(this).hide();
        $("#noteEditor").show();
        $("#editDataNote").focus();
    });

    $("#editDataNote").blur(function () {
        var note = $(this).val();
        var myAnswer = "";
        if ($('div[name="dataChilds"]').length === 0) {
            myAnswer = $('input[name="answerCheck"]:checked').val();
        } else {
            $('input[name="answerCheck"]:checked').each(function () {
                myAnswer += $(this).val() + ",";
            });
            //填空题
            $('input[name="answerField"]').each(function () {
                myAnswer += $(this).val() + ",";
            });
            myAnswer = myAnswer.substr(0, myAnswer.length - 1);
        }
        if ('' !== note) {
            $.post("/Exam/Collect", { "qusid": idData, "note": note, "myAnswer": myAnswer }, function (msg) {
                if (msg !== "ok") {
                    alert("保存备注失败，请重试！");
                }
            });
        }
        $("#tikuDataNote").show();
        if ("" === note) {
            $("#tikuDataNote").html('<div class="text-center" id="btnAddDataNote">+ 我的备注</div>');
        } else {
            $("#tikuDataNote").text(note);
        }
        $("#noteEditor").hide();
        $("#editDataNote").val(note);
    });

    $("#collect").click(function () {
        var note = $("#editDataNote").val();
        if ($(this).prop("checked")) {
            var myAnswer = "";
            if ($('div[name="dataChilds"]').length === 0) {
                myAnswer = $('input[name="answerCheck"]:checked').val();
            } else {
                $('input[name="answerCheck"]:checked').each(function () {
                    myAnswer += $(this).val() + ",";
                });
                //填空题
                $('input[name="answerField"]').each(function () {
                    myAnswer += $(this).val() + ",";
                });
                myAnswer = myAnswer.substr(0, myAnswer.length - 1);
            }
            $.post("/Exam/Collect", { "qusid": idData, "note": note, "myAnswer": myAnswer }, function () { });
        } else {
            $.post("/Exam/Remove", { "qusid": idData }, function () { });
        }
    });
    $("#btnMoreDiscuss").click(function () {
        $.post("/Exam/getReply", { "qusid": idData, "page": page }, function (listDiscuss) {
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
                strHtml += '  <div class="media-body mgl5">';
                strHtml += '    <p class="media-heading">';
                strHtml += '      <a href="http://www.kejuwang.com/profile/' + listDiscuss[i].idUser + '" target="_blank">' + listDiscuss[i].nameUser + '</a>';
                strHtml += '      <a class="label label-success mgr10" target="_blank" href="http://bbs.kejuwang.com/article/25">' + listDiscuss[i].levelName + '</a>';
                if (listDiscuss[i].isTop) {
                    strHtml += '      <span class="i-top" >置顶</span>';
                }
                strHtml += '      <span class="pull-right muted f12">' + listDiscuss[i].createdAt + '</span>';
                strHtml += '    </p>';
                strHtml += '    <div class="mgt10">';
                if (listDiscuss[i].type == 3) {
                    strHtml += '      <p>回复' + listDiscuss[i].toName + ':' + listDiscuss[i].content + '</p>';
                } else {
                    strHtml += '      <p>' + listDiscuss[i].content + '</p>';
                }

                //if (listDiscuss[i].reply) {
                //    strHtml += '      <div class="well well-small">' + listDiscuss[i].reply + '</div>';
                //}
                strHtml += '    </div>';
                strHtml += '    <div class="f12 muted  mgt10 pull-right">';
                strHtml += '      <a class="btn-sec-reply muted mgl10" onclick="showReplyDiscuss(' + listDiscuss[i].idAuto + ', \'' + listDiscuss[i].nameUser + '\',' + listDiscuss[i].idUser + ', this)">回复</a>';
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
    });

    exports.replyDiscuss = function (content, type, objecttype, toid, idReply) {
        if (content.trim() === "" || content.trim() === "回复 " + name + "：") {
            alert("请输入评论一下再确定哦！")
        } else {
            var doc = {};
            doc.pid = parseInt(idData);
            if (idReply == null) {
                doc.replyid = parseInt(idData);
            } else {
                doc.replyid = idReply;
            }
            if (objecttype == null) {
                doc.objecttype = 0;
            } else {
                doc.objecttype = objecttype;
            }
            if (toid == null) {
                doc.toid = 1;
            } else {
                doc.toid = toid;
            }
            doc.type = type;
            doc.content = content;
            console.trace(doc);
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
            });
        }
    }
    window.replyDiscuss = exports.replyDiscuss;
    const htmlReply = '<textarea id="txtReply" class="mgt20" cols="30" rows="2" style="width:98%;"></textarea>\n<a id="btnReply" class="btn btn-success pull-right" onclick="replyDiscuss()">回复</a>';
    window.showReplyDiscuss = function (idDiscuss, name, toid, self) {
        var isReplyShown = $(self).parent().parent().find("textarea").length;
        $("#txtReply").remove();
        $("#btnReply").remove();
        if (!isReplyShown) {
            $(self).attr("data-showReply", "true");
            $(self).parent().parent().append(htmlReply);
            $("#txtReply").val("回复 " + name + "：");
            $("#btnReply").attr("onclick", "replyDiscuss($('#txtReply').val().substr($('#txtReply').val().indexOf('：') + 1), " + "3,3," + toid + "," + idDiscuss + ")");
            $("#txtReply").focus();
        }
    }


    exports.init = function (id) {
        classid = id;
        $("#timu li:first").click();
    }


});