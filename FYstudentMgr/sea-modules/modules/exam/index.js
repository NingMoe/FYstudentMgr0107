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
    var id = "",classid;
    var idData = "";
    var examtype = $("#timu").attr("data-examtype");
    Array.prototype.contains = function (obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }
    exports.init=function(id){
        classid=id;
    }

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
        idData = $(this).attr("idData");
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
        if ($(this).hasClass("biaoji")) {
            $("#mark").prop("checked", true);
        } else {
            $("#mark").prop("checked", false);
        }
        $("#divLoading").show();
        $.post("/exam/getData", { "qusid": idData, "examType": examtype }, function (result) {
            if (result !=null) {
                var strHtml = "";
                var strChild = '';//有子题目的单独处理
                var strAnswer = "ABCDEFGH";
                $("#btnPract").hide();
                $("#divNormal").show();
                $("#divChild").hide();
                var answers;
                var newanswers=[];
                if (result.MyAnswer != null) {
                    answers = result.MyAnswer.split(",");
                    //answers.pop();
                    answers.forEach(function (data, index, arr) {
                        newanswers.push(+data);
                    });
                }
                //answers = "1,2,3,4,".split(",");
              
                console.trace(newanswers);
                console.trace(newanswers.contains(2));
                switch (result.Type) {
                    case 1:
                        $("#oneTitle").text("单项选择题");
                        for (var i = 0; i < result.Options.length; i++) {
                            strHtml += '<label class="answer_item " style="display:block;font-weight: normal!important;" for="radio' + (i + 1) + '">';
                            strHtml += '  <label><input id="radio' + (i + 1) + '" onchange="changeAnswer(this)" name="answerCheck" type="radio" data-iscorrect="' + result.Options[i].IsCorrect + '" style="font-weight: normal;" value="' + result.Options[i].QusOptionID + '" ' + ((result.MyAnswer && newanswers.contains(result.Options[i].QusOptionID)) ? 'checked="true"' : '') + '><i>' + strAnswer.substr(i, 1) + '.</i></label>';
                            strHtml += '  <div class="analyze_div" style="font-weight: normal;">' + result.Options[i].Content + '</div>';
                            strHtml += '</label>';
                        }
                        break;
                    case 2:
                        $("#oneTitle").text("多项选择题");
                        for (var i = 0; i < result.Options.length; i++) {
                            strHtml += '<label class="answer_item" style="display:block;" for="cb' + (i + 1) + '">';
                            strHtml += '  <label><input id="cb' + (i + 1) + '" onchange="changeAnswer(this)" name="answerCheck" type="checkbox"style="font-weight: normal;" data-iscorrect="' + result.Options[i].IsCorrect + '"  value="' + result.Options[i].QusOptionID + '" ' + ((result.record && newanswers.contains(result.Options[i].QusOptionID)) ? 'checked="true"' : '') + '><i>' + strAnswer.substr(i, 1) + '.</i></label>';
                            strHtml += '  <div class="analyze_div" style="font-weight: normal;">' + result.Options[i].Content + '</div>';
                            strHtml += '</label>';
                        }
                        break;
                    case 0:
                        $("#oneTitle").text("判断题");
                        strHtml += '<label class="answer_item" style="display:block;" for="radio1">';
                        strHtml += '  <label><input id="radio1" onchange="changeAnswer(this)" name="answerCheck" type="radio" value="A" ' + ((result.record && 'A' === result.record.myAnswer) ? 'checked="true"' : '') + '><i></i></label>';
                        strHtml += '  <div class="analyze_div" style="font-weight: normal;">对</div>';
                        strHtml += '</label>';
                        strHtml += '<label class="answer_item" for="radio2">';
                        strHtml += '  <label><input id="radio2" onchange="changeAnswer(this)" name="answerCheck" type="radio" value="B" ' + ((result.record && 'B' === result.record.myAnswer) ? 'checked="true"' : '') + '><i></i></label>';
                        strHtml += '  <div class="analyze_div" style="font-weight: normal;">错</div>';
                        strHtml += '</label>';
                        break;
                   
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
    });
    $("#timu li:first").click();


    //标记按钮事件
    $("#mark").click(function () {
       // alert($(this).prop("checked"));
        $.post("/exam/Mark", { "qusid": idData, "isMark": $(this).prop("checked"), "examType": examtype }, function (msg) {
            if (msg === "ok") {
                if ($("#mark").prop("checked")) {
                    $("#li" + id).addClass("biaoji");
                } else {
                    $("#li" + id).removeClass("biaoji");
                }
            }
        });

    });

    //点击选项触发 检查是否正确并插入答题记录
    exports.changeAnswer= function (self) {
        $("#li" + id).addClass("yida");
        var answer = "";
        var iscorrect = true;
        $('input[name="answerCheck"]:checked').each(function () {
            if ($(this).attr("data-iscorrect") == "false") {
                iscorrect = false;
            }
            answer += $(this).val()+",";
        });
        answer = answer.substr(0, answer.length - 1);
        //console.trace(answer);
       // console.trace(iscorrect);
        $.post("/exam/Answer", { "qusid": idData, "myAnswer": answer, "iscorrect": iscorrect,"cid":classid, "examType": examtype }, function (msg) { });
    }
    window.changeAnswer = exports.changeAnswer;

});