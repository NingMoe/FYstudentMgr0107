define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('tool');
    //require('ueditor-config');
    var UE=require('ueditor');
    
    require('perfectScrollbar');
    
    var noteContent;
    
   
    //var ue = UE.getEditor('ueditorWrapper', {
    //    initialFrameWidth: 303,
    //    initialFrameHeight: $(window).height() - 214,
    //    autoHeightEnabled: false
    //});
    //var idCourse = "ncre_241703";
    //var typeLesson = "kjv";
    //var idLesson = "ESwdXzWV";
    var titleLesson = "";
    
    var idUser ;
    //var idView = "201703010856146878";
    //alert(idUser);
    var idExercise = 0;
    var jsonExercise = {};
    var jsonRecord = {};
    var finished = false;
    var finishedVideo = false;
    var isDragging = false;
    var widthJBox;
    var widthKBox;
    var idClass ;
    var idLesson ;
    var enrollState;
    var hasExercise;
    //alert(idLesson);
    //if ("undefined" === "object" && "undefined" === "boolean") {
    //    $(".btnLogin").click();
    //}
    exports.init = function (lessonid, classid, userid,state) {
        idLesson = lessonid;
        idClass = classid;
        idUser = userid;
        enrollState = state;
       // console.trace(idUser==null);
        $.post("/Note/GetLesson", { lessonid: idLesson, userid: idUser }, function (doc) {
            ue.ready(function () {
                ue.setContent(decodeURI(doc));
            });
        });
        loadExercise();
        var hs = 2;//水平移动速度
        var vs = 2;//垂直移动速度

        var timer = setInterval(function () {
            var logo = $(".sewise-player-ui .logo");
            logo.find("a").text(idUser);
            var playerui = $(".sewiseplayer-container");
            logo.css("right", Number(logo.css("right").replace("px", "")) + hs + "px");
            //console.trace(logo.css("right"));
            logo.css("top", Number(logo.css("top").replace("px", "")) + vs + "px");
            //console.trace(Number(playerui.css("width").replace("px", "")));
            if (Number(logo.css("right").replace("px", "")) <= 0) {
                hs = 2;
            }
            if (Number(logo.css("top").replace("px", "")) <= 0) {
                vs = 2;
            }
            if (Number(logo.css("right").replace("px", "")) >= Number(playerui.css("width").replace("px", ""))) {
                hs = -2;
            }
            if (Number(logo.css("top").replace("px", "")) >= Number(playerui.css("height").replace("px", ""))) {
                vs = -2;
            }
        }, 50);
    }

    var option = {
        //initialContent: noteContent,
        encodeuri: true,
        initialFrameWidth: 303,
        initialFrameHeight: $(window).height() - 244,
        autoHeightEnabled: false,
        toolbars: [[
        'fontsize', 'forecolor', 'backcolor',
        'bold', 'italic', 'underline', 'superscript', 'subscript'
        ]]
    };
   var ue= UE.init("ueditor", option);
   //alert(ue);
    //---------------------------------
     //页面初始化、尺寸控制
    //---------------------------------
  
   //alert(playtime);
  
   
   

    
    $("#K_Box").width(345);
    $("#questionContent").width(291);
    $("#boxWrapper").height($(window).height());
    
    $("#J_Box").height($(window).height() - 40);
  
    $("#lessonRight").height($(window).height() - 100);
    //$("#auditionList").height($(window).height() - 500);
    if ($(window).width() < 1045) {
        $("#J_Box").width(700);
    } else {
        $("#J_Box").width($(window).width() - 345);
    }
    $(".test_left").height($(window).height() - 78);
    $(".test_left").perfectScrollbar();

    //窗口缩放事件
    $(window).resize(function (e) {
        var widthWindow = $(window).width();
        var heightWindow = $(window).height();
        if (widthWindow < 1045) {
            widthJBox = 700;
            widthKBox = 345;
        } else {
            //缩小时，先缩J，后缩K
            if ($("#J_Box").width() <= 700) {
                widthJBox = 700;
                if ($("#K_Box").width() > 345) {
                    widthKBox = widthWindow - 700;
                } else {
                    widthKBox = 345;
                }
            } else {
                widthJBox = widthWindow - $("#K_Box").width();
                widthKBox = $("#K_Box").width();
            }
            //放大时，只放J
            if (widthJBox + widthKBox < widthWindow) {
                widthJBox = widthWindow - $("#K_Box").width();
            }
        }
        //$("#auditionList").height($(window).height() - 500);
        $("#boxWrapper").height(heightWindow);
        $("#lessonRight").height($(window).height() - 100);
        $("#J_Box").width(widthJBox).height(heightWindow - 40);
        $("#test_list").height(heightWindow - 78);
        $("#test_list").perfectScrollbar("update");
        $("#K_Box").width(widthKBox);
        $("#questionContent").width(widthKBox - 54);
        //$(".edui-editor-iframeholder").height(heightWindow - 213);
        $("#ueditorWrapper>div").width($("#ueditorWrapper").width() - 4);
        $("#ueditorWrapper>div:eq(0)>div").width($("#ueditorWrapper").width() - 4);
    });


    //供播放器调用
    function isKBoxHidden() {
        return $("#K_Box").is(":hidden");
    }
    function hideKBox() {
        $("#K_Box").addClass("hidden");
        $("#J_Box").width($(window).width());
    }
    function showKBox() {
        $("#J_Box").width($(window).width() - $("#K_Box").width());
        $(".edui-editor-iframeholder").height($(window).height() - 213);
        $("#K_Box").removeClass("hidden");
    }


    function showFinish() {
       
        $("#exerciseWrapper").addClass("hidden");
        $("#videoWrapper").addClass("hidden");
        $('#finishWrapper').removeClass("hidden");
        $("#btnVideo").attr("disabled", true);
        $("#btnExercise").attr("disabled", true);
    }
    ////左上角的本章目录，和右上角的消息
    //$(".dropdown").hover(function () {
    //    //消息
    //    $(this).find("ul").removeClass("hidden");
    //    $(this).find(".closed").attr("class", "active");
    //}, function () {
    //    //消息
    //    $(this).find("ul").addClass("hidden");
    //    $(this).find(".active").attr("class", "closed");
    //});


    //加载本课题目
    function loadExercise() {
        $.post("/Lesson/GetExercise", { "lessonid": idLesson }, function (docsData) {
            var i, j, arrId = []; //alert(docsData[0].Category);
            jsonExercise = docsData;
           // alert(jsonExercise[0].Category);
            if (jsonExercise.length > 0) {
                hasExercise = true;
                //生成第1题html
                generalHtmlExercise();
                for (i = 0; i < jsonExercise.length; i++) {
                    arrId.push(jsonExercise[i].ExerciseID);
                }
                //拉取每一题完成数据
                var docRecord = {};
                //docRecord.idCourse = idCourse;
                docRecord.ids = arrId;
                //alert(JSON.stringify(docRecord));
                $.post("/ExerciseRecord/GetRecord", { userid: idUser, doc: JSON.stringify(docRecord) }, function (docs) {
                    //alert(docs.Data.length);
                    var er = docs.Data;
                    //alert(er[0].Note);
                    for (i = 0; i < jsonExercise.length; i++) {
                        for (j = 0; j < er.length; j++) {
                            if (jsonExercise[i].ExerciseID === er[j].ExerciseID) {
                                jsonExercise[i].myAnswer = er[j].MyAnswer;
                                jsonExercise[i].isCorrect = er[j].IsCorrect;
                                jsonExercise[i].collected = er[j].Collected;
                                if (er[j].Note) {
                                    jsonExercise[i].note = er[j].Note;
                                }
                                break;
                            }
                        }
                    }
                    $("#optionChoice a").off();
                    if (jsonExercise[0].Category === 1 ) {                       
                        checkChoiceAnswer();
                    } else if (jsonExercise[0].Category === 0) {
                        checkTFAnswer();
                    }
                    else {
                        checkMulTextAnalysisleAnswer();
                    }
                    //生成题目笔记
                    generalDataNote(); 
                });
            } else {
                hasExercise = false;
            }
            //切换至上一题
            $("#btnPreExercise").click(function () {
                if (idExercise > 0) {
                    idExercise--;
                    generalHtmlExercise();
                    generalSimilarQuestion(jsonExercise[idExercise].ExerciseID);
                }
            });
            //切换至下一题
            $("#btnNextExercise").click(function () {
                if (idExercise < jsonExercise.length - 1) {
                    idExercise++;
                    
                    generalHtmlExercise();
                    generalSimilarQuestion(jsonExercise[idExercise].ExerciseID);
                } else {
                    finishLesson();
                }
            });
        });
    }

    ////---------------------------------
    // 视频与练习
    ////---------------------------------

    //在视频和练习之间切换
    $("#btnVideo").click(function () {
        $("#exerciseWrapper").addClass("hidden");
        $("#videoWrapper").removeClass("hidden");
        $("#btnAsk").removeAttr("disabled");
        $("#contentQuestion").attr("placeholder", "一句话描述你的疑问");
        //generalSimilarQuestion("");

    });
    $("#btnExercise").click(function () {
        $("#videoWrapper").addClass("hidden");
        $("#exerciseWrapper").removeClass("hidden");
        showKBox();
        if (jsonExercise[idExercise].myAnswer) { 
            $("#contentQuestion").attr("placeholder", "直接描述你的疑问，不需要粘贴题目哦");
            $("#btnAsk").removeAttr("disabled");
        } else {
            $("#contentQuestion").attr("placeholder", "做完题目后才可以提问哦");
            $("#btnAsk").attr("disabled", true);
        }
        generalSimilarQuestion(jsonExercise[idExercise].id);
    });

    //跳转到练习，供播放器调用
    exports.goToExercise=function() {
        if (hasExercise==true) {
            finishedVideo = true;
            $("#btnExercise").removeAttr("disabled");
            $("#btnExercise").click();
        } else {
            finishLesson();
        }
    }
    window.goToExercise = exports.goToExercise;
  
   

    //生成题目的html
    function generalHtmlExercise() {
        var i,  strHtml;
        $("#contentExercise").html(jsonExercise[idExercise].Content);
        $("#action_bar_container span").text((idExercise + 1).toString() + "/" + jsonExercise.length);
        
        //生成题干、选项
        strHtml = "";
        if (jsonExercise[idExercise].Category === 1) {
            
            $("#contentExercise").prepend("【单项选择题】");
            $.post("/Lesson/GetOption", { "qusid": jsonExercise[idExercise].ExerciseID }, function (options) {
                
                //alert(options);
                $("#optionChoice").html(options);
                checkChoiceAnswer();
            });
            
           
        } else if (jsonExercise[idExercise].Category ===0) {
            $("#contentExercise").prepend("【判断题】");
            strHtml += "<li><a class=\"pos_rel\"><strong data-answer='true'>A</strong><div>正确</div></a></li>";
            strHtml += "<li><a class=\"pos_rel\"><strong data-answer='false'>B</strong><div>错误</div></a></li>";
            $("#optionChoice").html(strHtml);
            checkTFAnswer();
        } else if (jsonExercise[idExercise].type === "multi") {
            $("#contentExercise").prepend("【多项选择题】");
            for (i = 0; i < jsonExercise[idExercise].optionCount; i++) {
                strHtml += "<li>";
                strHtml += "  <a class=\"pos_rel\">";
                strHtml += "    <strong>" + strAnswer.substr(i, 1) + "</strong>";
                strHtml += "    <div>" + generateData(eval("jsonExercise[idExercise].option" + (i + 1))) + "</div>";
                strHtml += "  </a>";
                strHtml += "</li>";
            }
            $("#optionChoice").html(strHtml);
            checkMulTextAnalysisleAnswer();
        }

        //决定是否显示上一题、下一题
        if (idExercise === 0) {
            $("#btnPreExercise").addClass("hidden");
        } else {
            $("#btnPreExercise").removeClass("hidden");
        }
        if (idExercise === jsonExercise.length - 1) {
            $("#btnNextExercise").text("完成");
        } else {
            $("#btnNextExercise").text("下一题");
        }
        generalDataNote();
    }

    //获取类似问题
    function generalSimilarQuestion(idData) {
        $.post("/question/getSimilarQuestion", { "idLesson": idLesson, "idData": idData }, function (similarQuestion) {
            if (similarQuestion.length === 0) {
                $("#ulSimilarQuestion").prev().removeClass("hidden");
                $("#ulSimilarQuestion").addClass("hidden");
            } else {
                $("#ulSimilarQuestion").prev().addClass("hidden");
                $("#ulSimilarQuestion").removeClass("hidden");
                var strHtml = "";
                for (var i = 0; i < similarQuestion.length; i++) {
                    strHtml += '<li class="clearfix">';
                    if (i == 0) {
                        strHtml += '  <span class="lv1">' + (i + 1) + '</span>';
                    } else if (i < 3) {
                        strHtml += '  <span class="lv2">' + (i + 1) + '</span>';
                    } else {
                        strHtml += '  <span class="lv3">' + (i + 1) + '</span>';
                    }
                    strHtml += '  <a href="/question/ncre_271703/' + similarQuestion[i].idAuto + '" class="topic_name" target="_blank" title="' + similarQuestion[i].title + '">' + similarQuestion[i].title + '</a>';
                    strHtml += '</li>';
                }
                $("#ulSimilarQuestion").html(strHtml);
            }
        });
    }

    

    //检查单项选择题答案
    function checkChoiceAnswer() {
        
        if (jsonExercise[idExercise].myAnswer) {
           
            var myAnswer = jsonExercise[idExercise].myAnswer;
            //显示解析
            //注意：这里其实还应该有正确率
            $("#tipExercise").html(jsonExercise[idExercise].TextAnalysis);
            $("#tipExercise").removeClass("hidden");
            //决定各选项是否可点
            $("#optionChoice a").attr("class", "optionCnt_disable pos_rel");
            //检测是否正确
            if (!jsonExercise[idExercise].isCorrect) {
                
                $("#optionChoice a div[data-optionid='"+myAnswer+"']").parents("a").attr("class", "optionCnt_error pos_rel");
            }
            $("#optionChoice a div[data-iscorrect='True']").parents("a").attr("class", "optionCnt_correct pos_rel");
            //检测题目是否已加入笔记本
            if (jsonExercise[idExercise].collected) {
                $("#btnCollected").removeClass("hidden");
                $("#btnCollect").addClass("hidden");
            } else {
                $("#btnCollected").addClass("hidden");
                $("#btnCollect").removeClass("hidden");
            }
            //隐藏提交
            $("#btnMultiCheck").addClass("hidden");
            //显示下一题
            $("#btnNextExercise").removeClass("hidden");
            //可以提问
            if ($("#btnExercise").hasClass("active")) {
                $("#contentQuestion").attr("placeholder", "直接描述你的疑问，不需要粘贴题目哦");
                $("#btnAsk").removeAttr("disabled");
            }
        } else {
            $("#tipExercise").html("");
            $("#tipExercise").addClass("hidden");
            $("#btnCollect").addClass("hidden");
            $("#btnCollected").addClass("hidden");
            $("#btnNextExercise").addClass("hidden");
            //决定各选项是否可点
            $("#optionChoice a").attr("class", "optionCnt pos_rel");
            //隐藏提交
            $("#btnMultiCheck").addClass("hidden");
            //禁止提问
            if ($("#btnExercise").hasClass("active")) {
                $("#contentQuestion").attr("placeholder", "做完题目后才可以提问哦");
                $("#btnAsk").attr("disabled", true);
            }
        }
      
        //为各选项添加事件
        $(".optionCnt")
        .hover(function () {
            $(this).toggleClass("optionCnt_hover");
        })
        .click(function () {
            if (!jsonExercise[idExercise].myAnswer) {
                jsonExercise[idExercise].myAnswer = $(this).find("div").attr("data-optionid");
               
                jsonExercise[idExercise].isCorrect = $(this).find("div").attr("data-iscorrect")=="True";
                $("#optionChoice a").attr("class", "optionCnt_disable pos_rel");
                $("#optionChoice a").off();
                if (!jsonExercise[idExercise].isCorrect) {
                    $(this).attr("class", "optionCnt_error pos_rel");
                    $("#tipExercise").html(jsonExercise[idExercise].TextAnalysis);
                    $("#tipExercise").removeClass("hidden");
                    document.getElementById("wrong_sound").play();
                    $("#wrong_tip").modal("show");
                } else {
                    document.getElementById("correct_sound").play();
                    $("#correct_tip").fadeIn(500, function () {
                        $("#tipExercise").html(jsonExercise[idExercise].TextAnalysis);
                        $("#tipExercise").fadeIn(500);
                    });
                    $("#correct_tip").fadeOut(500);
                }
                $("#optionChoice a div[data-iscorrect='True']").parents("a").attr("class", "optionCnt_correct pos_rel");
                //可以提问
                $("#contentQuestion").attr("placeholder", "直接描述你的疑问，不需要粘贴题目哦");
                $("#btnAsk").removeAttr("disabled");
                submitAnswer();
            }
        });
    }


    //检查判断题答案
    function checkTFAnswer() {
        var strAnswer = "ABCDEFGH";
        if (jsonExercise[idExercise].myAnswer) {
            var answer = jsonExercise[idExercise].Answer;
            var myAnswer = jsonExercise[idExercise].myAnswer;
            //显示解析
            //注意：这里其实还应该有正确率
            $("#tipExercise").html(jsonExercise[idExercise].TextAnalysis);
            $("#tipExercise").removeClass("hidden");
            //决定各选项是否可点
            $("#optionChoice a").attr("class", "optionCnt_disable pos_rel");
            //检测是否正确
            if (myAnswer === 'true') {
                $("#optionChoice a:eq(0)").attr("class", "optionCnt_error pos_rel");
            } else {
                $("#optionChoice a:eq(1)").attr("class", "optionCnt_error pos_rel");
            }

            if (answer === 'true') {
               $("#optionChoice a:eq(0)").removeClass("optionCnt_error pos_rel");
               $("#optionChoice a:eq(0)").attr("class", "optionCnt_correct pos_rel");
           } else {
                $("#optionChoice a:eq(1)").removeClass("optionCnt_error pos_rel");
                $("#optionChoice a:eq(1)").attr("class", "optionCnt_correct pos_rel");
           }
           
            //检测题目是否已加入笔记本
            if (jsonExercise[idExercise].collected) {
                $("#btnCollected").removeClass("hidden");
                $("#btnCollect").addClass("hidden");
            } else {
                $("#btnCollected").addClass("hidden");
                $("#btnCollect").removeClass("hidden");
            }
            //隐藏提交
            $("#btnMultiCheck").addClass("hidden");
            //显示下一题
            $("#btnNextExercise").removeClass("hidden");
            //可以提问
            if ($("#btnExercise").hasClass("active")) {
                $("#contentQuestion").attr("placeholder", "直接描述你的疑问，不需要粘贴题目哦");
                $("#btnAsk").removeAttr("disabled");
            }
        } else {
            $("#tipExercise").html("");
            $("#tipExercise").addClass("hidden");
            $("#btnCollect").addClass("hidden");
            $("#btnCollected").addClass("hidden");
            $("#btnNextExercise").addClass("hidden");
            //决定各选项是否可点
            $("#optionChoice a").attr("class", "optionCnt pos_rel");
            //隐藏提交
            $("#btnMultiCheck").addClass("hidden");
            //禁止提问
            if ($("#btnExercise").hasClass("active")) {
                $("#contentQuestion").attr("placeholder", "做完题目后才可以提问哦");
                $("#btnAsk").attr("disabled", true);
            }
        }
        //为各选项添加事件
        $(".optionCnt")
        .hover(function () {
            $(this).toggleClass("optionCnt_hover");
        })
        .click(function () {
            if (!jsonExercise[idExercise].myAnswer) {
                jsonExercise[idExercise].myAnswer = $(this).find("strong").attr("data-answer");
                var answer = jsonExercise[idExercise].Answer;
                
                jsonExercise[idExercise].isCorrect = (jsonExercise[idExercise].myAnswer === answer);
                $("#optionChoice a").attr("class", "optionCnt_disable pos_rel");
                $("#optionChoice a").off();
                $("#optionChoice a strong[data-answer='" + answer + "']").parents("a").attr("class", "optionCnt_correct pos_rel");
               
                if (!jsonExercise[idExercise].isCorrect) {
                    $("#optionChoice a strong[data-answer!='" + answer + "']").parents("a").attr("class", "optionCnt_error pos_rel");                                        
                    $("#tipExercise").html(jsonExercise[idExercise].TextAnalysis);
                    $("#tipExercise").removeClass("hidden");
                    document.getElementById("wrong_sound").play();
                    $("#wrong_tip").modal("show");
                } else {
                    document.getElementById("correct_sound").play();
                    $("#correct_tip").fadeIn(500, function () {
                        $("#tipExercise").html(jsonExercise[idExercise].TextAnalysis);
                        $("#tipExercise").fadeIn(500);
                    });
                    $("#correct_tip").fadeOut(500);
                }
                
                //可以提问
                $("#contentQuestion").attr("placeholder", "直接描述你的疑问，不需要粘贴题目哦");
                $("#btnAsk").removeAttr("disabled");
                submitAnswer();
            }
        });
    }


    //检查多项选择题答案
    function checkMulTextAnalysisleAnswer() {
        var i, strAnswer = "ABCDEFGH";
        if (jsonExercise[idExercise].myAnswer) {
            //显示解析
            //注意：这里其实还应该有正确率
            $("#tipExercise").html(jsonExercise[idExercise].TextAnalysis);
            $("#tipExercise").removeClass("hidden");
            //显示所选答案及正确答案
            $("#optionChoice a").attr("class", "optionCnt_disable pos_rel");
            for (var i = 0; i < jsonExercise[idExercise].answer.length; i++) {
                $("#optionChoice a:eq(" + strAnswer.indexOf(jsonExercise[idExercise].answer[i]) + ")").removeClass("optionCnt_disable");
                $("#optionChoice a:eq(" + strAnswer.indexOf(jsonExercise[idExercise].answer[i]) + ")").addClass("optionCnt_correct");
            }
            for (var i = 0; i < jsonExercise[idExercise].myAnswer.length; i++) {
                $("#optionChoice a:eq(" + strAnswer.indexOf(jsonExercise[idExercise].myAnswer[i]) + ")").removeClass("optionCnt_disable");
                $("#optionChoice a:eq(" + strAnswer.indexOf(jsonExercise[idExercise].myAnswer[i]) + ")").addClass("optionCnt checked");
            }
            //检测题目是否已加入笔记本
            if (jsonExercise[idExercise].collected) {
                $("#btnCollected").removeClass("hidden");
                $("#btnCollect").addClass("hidden");
            } else {
                $("#btnCollected").addClass("hidden");
                $("#btnCollect").removeClass("hidden");
            }
            //隐藏提交
            $("#btnMultiCheck").addClass("hidden");
            //显示下一题
            $("#btnNextExercise").removeClass("hidden");
            //可以提问
            if ($("#btnExercise").hasClass("active")) {
                $("#contentQuestion").attr("placeholder", "直接描述你的疑问，不需要粘贴题目哦");
                $("#btnAsk").removeAttr("disabled");
            }
        } else {
            $("#tipExercise").html("");
            $("#tipExercise").addClass("hidden");
            $("#btnCollect").addClass("hidden");
            $("#btnCollected").addClass("hidden");
            $("#btnNextExercise").addClass("hidden");
            //决定各选项是否可点
            $("#optionChoice a").attr("class", "optionCnt pos_rel");
            //显示提交
            $("#btnMultiCheck").removeClass("hidden");
            $("#btnMultiCheck").attr("disabled", "disabled");
            //禁止提问
            if ($("#btnExercise").hasClass("active")) {
                $("#contentQuestion").attr("placeholder", "做完题目后才可以提问哦");
                $("#btnAsk").attr("disabled", true);
            }
            //为各选项添加事件
            $(".optionCnt")
            .hover(function () {
                $(this).toggleClass("optionCnt_hover");
            })
            .click(function () {
                $(this).toggleClass("optionCnt_checked checked");
                var strMyAnswer = "";
                for (var i = 0; i < $("#optionChoice a").length; i++) {
                    if ($("#optionChoice a:eq(" + i + ")").hasClass("checked")) {
                        strMyAnswer += strAnswer.substr(i, 1);
                    }
                }
                if (strMyAnswer.length >= 2) {
                    $("#btnMultiCheck").removeAttr("disabled");
                } else {
                    $("#btnMultiCheck").attr("disabled", "disabled");
                }
                jsonExercise[idExercise].myAnswer = strMyAnswer;
                jsonExercise[idExercise].isCorrect = (strMyAnswer === jsonExercise[idExercise].answer);

            });
        }
    }

    //提交多选题答案
    $("#btnMultiCheck").click(function () {
        var i, strAnswer = "ABCDEFGH";
        $("#optionChoice a").unbind();
        $("#optionChoice a").attr("class", "optionCnt_disable pos_rel");
        for (var i = 0; i < jsonExercise[idExercise].answer.length; i++) {
            $("#optionChoice a:eq(" + strAnswer.indexOf(jsonExercise[idExercise].answer[i]) + ")").removeClass("optionCnt_disable");
            $("#optionChoice a:eq(" + strAnswer.indexOf(jsonExercise[idExercise].answer[i]) + ")").addClass("optionCnt_correct");
        }
        for (var i = 0; i < jsonExercise[idExercise].myAnswer.length; i++) {
            $("#optionChoice a:eq(" + strAnswer.indexOf(jsonExercise[idExercise].myAnswer[i]) + ")").removeClass("optionCnt_disable");
            $("#optionChoice a:eq(" + strAnswer.indexOf(jsonExercise[idExercise].myAnswer[i]) + ")").addClass("optionCnt checked");
        }
        if (!jsonExercise[idExercise].isCorrect) {
            $("#tipExercise").html(jsonExercise[idExercise].TextAnalysis);
            $("#tipExercise").removeClass("hidden");
            $("#btnNextExercise").removeClass("hidden");
            document.getElementById("wrong_sound").play();
            $("#wrong_tip").modal("show");
        } else {
            document.getElementById("correct_sound").play();
            $("#correct_tip").fadeIn(500, function () {
                $("#tipExercise").html(jsonExercise[idExercise].TextAnalysis);
                $("#tipExercise").fadeIn(500);
                $("#btnNextExercise").removeClass("hidden");
            });
            $("#correct_tip").fadeOut(500);
        }
        //可以提问
        $("#btnAsk").removeAttr("disabled");
        //隐藏提交
        $("#btnMultiCheck").addClass("hidden");
        submitAnswer();
    });

    //无论哪一种题型，最后都通过这个函数提交答案
    function submitAnswer() {
        var doc = {};
        doc.ExerciseID = jsonExercise[idExercise].ExerciseID;
        doc.UserID = idUser;
        doc.MyAnswer = jsonExercise[idExercise].myAnswer;
        doc.IsCorrect = jsonExercise[idExercise].isCorrect;
       
        $.post("/ExerciseRecord/New", { ExerciseID: doc.ExerciseID, UserID: doc.UserID, MyAnswer: doc.MyAnswer, IsCorrect: doc.IsCorrect}, function (msg) {
            if (msg === "ok") {
                $("#btnNextExercise").removeClass("hidden");
                $("#txtDataNote").removeClass("hidden");
            }
        });
    }
    //生成题目笔记
    function generalDataNote() {
        if ("undefined" !== typeof jsonExercise[idExercise].myAnswer) {
            if ("undefined" !== typeof jsonExercise[idExercise].note) {
                $("#txtDataNote").html(jsonExercise[idExercise].note);
            } else {
                $("#txtDataNote").html('<div class="text-center" id="btnAddDataNote">+ 我的备注</div>');
            }
            $("#txtDataNote").removeClass("hidden");
        } else {
            $("#txtDataNote").html('<div class="text-center" id="btnAddDataNote">+ 我的备注</div>');
            $("#txtDataNote").addClass("hidden");
        }
        $("#editDataNote").addClass("hidden");
    }
    //为本题添加备注
    $("#txtDataNote").click(function () {
        $("#txtDataNote").addClass("hidden");
        $("#editDataNote").removeClass("hidden");
        $("#editDataNote").focus();
        if ("undefined" !== typeof jsonExercise[idExercise].note) {
            $("#editDataNote").val(jsonExercise[idExercise].note);
        } else {
            $("#editDataNote").val("");
        }
    });

    //保存本题的备注
    $("#editDataNote").blur(function () {
        var doc = {};
        doc.UserID = idUser;
        doc.ExerciseID = jsonExercise[idExercise].ExerciseID;
        doc.Note = $("#editDataNote").val();
        $.post("/ExerciseRecord/UpdateNote", { ExerciseID: doc.ExerciseID, UserID: doc.UserID, Note: doc.Note }, function (msg) {
            if (msg === "ok") {
                //alert(msg);
                if ("" !== doc.Note) {
                    jsonExercise[idExercise].note = $("#editDataNote").val();
                } else {
                    delete jsonExercise[idExercise].note;
                }
                generalDataNote();
            } else {
                $("#txtDataNote").html('<div class="text-center" id="btnAddDataNote">+ 我的备注</div>');
                $("#txtDataNote").removeClass("hidden");
                $("#editDataNote").addClass("hidden");
            }
        });
    });

    ////---------------------------------
    // 提问
    ////---------------------------------
    $("#btnAsk").click(function () {
        if (enrollState == "notlog") {
            $(".fastlogin").click();
        } else {
            var urlAsk = "/Discuss/Create/" + idClass + "?title=" + $("#contentQuestion").val();
            if ($("#btnExercise").hasClass("focus") || $("#btnExercise").hasClass("active")) {
                urlAsk += "&idExercise=" + jsonExercise[idExercise].ExerciseID;
            }
            urlAsk += "&idLesson=" + idLesson;
            window.open(urlAsk);
        }
       
    });

    ////---------------------------------
    // 完成学习
    ////---------------------------------

    //保存本课笔记
    $("#btnSaveLessonNote").click(function () {
        if (enrollState == "notlog") {           
            $(".fastlogin").click();
        } else {
            $(this).button('loading');
            var doc = {};
            doc.userid = idUser;
            doc.lessonid = idLesson;
            doc.note = ue.getURIContent();//"内容";//ue.getContent();{ lessonid: idLesson, userid: idUser, note: "这是笔记的内容" }
            
            $.post("/Note/Update", doc, function (msg) {
                //alert(decodeURI(msg));
                $("#btnSaveLessonNote").button('reset');
                $("#okSaveLessonNote").fadeIn(300);
                $("#okSaveLessonNote").fadeOut(300);
                ue.setContent(decodeURI(msg));
            });
        }
        
          
       
    });

    //完成本课，提交数据
    function finishLesson() {
        finished = true;
        showFinish();
        var doc = {}, scoreXueba =5;
        doc.userid = idUser;
        doc.lessonid = idLesson;
        
        if (hasExercise) {
            for (var i = 0; i < jsonExercise.length; i++) {
                if (jsonExercise[i].isCorrect) {
                    scoreXueba++;
                }
            }
        }
      
        doc.scoreXueba = scoreXueba;
        if (enrollState != "notlog") {
            $.post("/StudyRecord/Finish", doc, function (docResult) {
                $("#receivePoint").text(scoreXueba);
            });
        }
       
    }

    //将所有题目加入错题集
    $("#btnCollectedAll").click(function () {
        $(this).button("loading");
        var arrId = [], docCollected = {};
        for (i = 0; i < jsonExercise.length; i++) {
            if (!jsonExercise[i].isCorrect) {
                arrId.push(jsonExercise[i].id);
            }
        }
        docCollected.idCourse = idCourse;
        docCollected.idLesson = idLesson;
        docCollected.arrId = arrId;
        if (arrId.length > 0) {
            $.post("/data/updateCollected", { doc: JSON.stringify(docCollected) }, function (msg) {
                if (msg === "ok") {
                    $("#btnCollectedAll").attr("disabled", "disabled");
                    $("#btnCollectedAll").text("已全部加入笔记本");
                }
            });
        } else {
            $("#btnCollectedAll").attr("disabled", "disabled");
            $("#btnCollectedAll").text("恭喜你，本课并无错题");
        }
        //隐藏收藏按钮
        $("#btnCollectedAll").addClass("hidden");
    });

    $("#btnShareQzone").click(function () {
        $.post("/lesson/share", { "path": location.pathname, "platform": "qzone", "idCourse": idCourse, "idLesson": idLesson }, function () {

        });
    })

});