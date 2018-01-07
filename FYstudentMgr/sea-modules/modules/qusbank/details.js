define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('admincss');
    require('font-awesome');
    //require('scoket');
    require('tool');
    //require('progress');
    //require('allRank');
    //var date = require('date');
    var bankid;
    exports.init = function (id) {
        bankid = id;
        $(".tiku:first").click();
    }
    //打开编辑章节窗口
    exports.showAddChapter = function (sort) {

        $("#chaptername3").attr("data-sort", sort);

        $('#addChapterPopup').modal("show");
    }
    window.showAddChapter = exports.showAddChapter;
    //修改章节
    $("#btnAddChapter").click(function () {
        var doc = {};
        doc.bankid = bankid;
        doc.sort = $("#chaptername3").attr("data-sort");
        doc.name = $("#chaptername3").val();
        if (doc.name == "") {
            alert("请输入章节名称");
            return false;
        }
        $.post("/Chapter/Add", doc, function (msg) {
            if (msg != "ok") {
                alert("添加失败，请重试");
            } else {
                location.reload();
            }


        });
    });

    //打开编辑章节窗口
    exports.showEditChapter = function (id, sort, name) {
        //console.trace(name);
        $("#chaptername2").attr("data-id", id);
        $("#chaptersort").val(sort);
        $("#chaptername2").val(name);
        $('#editChapterPopup').modal("show");
    }
    window.showEditChapter = exports.showEditChapter;
    //修改章节
    $("#btnEditChapter").click(function () {
        var doc = {};
        doc.id = $("#chaptername2").attr("data-id");
        doc.sort = $("#chaptersort").val();
        doc.name = $("#chaptername2").val();
        if (doc.name == "") {
            alert("请输入章节名称");
            return false;
        }
        $.post("/Chapter/Update", doc, function (msg) {
            if (msg == "ok") {
                $("#chapter" + doc.id).text("第" + doc.sort + "章：" + doc.name);
                $('#editChapterPopup').modal("hide");
            } else {
                location.reload();
            }
        });
    });


    //删除章节对话框
    exports.showDelChapter = function (id, sort, name) {

        //alert(id);
        $("#chaptername").attr("data-id", id);
        $("#chaptername").text("第" + sort + "章：" + name);
        $('#delChapterPopup').modal("show");
    }
    window.showDelChapter = exports.showDelChapter;
    //删除章节
    $("#btnDelChapter").click(function () {
        var id = $("#chaptername").attr("data-id");
        $.post("/Chapter/Del/" + id, null, function (msg) {
            if (msg == "notallow") {
                alert("该章节已包含有题目，不能删除");
                $('#delChapterPopup').modal("hide");
            } else {
                location.reload();
            }
        });
    });

    //获取题目并显示
    exports.getQuestionList=function (id,page){
        $.post("/Chapter/GetQuestionList", { "id": id, "page": page }, function (doc) {

            var strHtml = "";
            var strAnswer = "ABCDEFGH";
            for (var i = 0; i < doc.length; i++) {
                var answer = "";
                strHtml = strHtml + "<div class='exam-content well mgt20'> <div>";
                strHtml = strHtml + "<div  class='exam-title'>" + doc[i].Sort + "." + doc[i].QuestionBody + "</div> <div  class='exam-choice mgt20'>";
                switch (doc[i].Category) {
                    case 0: {
                        strHtml = strHtml + "<label class='answer_item' style='display:block;font-weight: normal!important;' >";
                        if (doc[i].Answer == "true") {
                            strHtml = strHtml + "<label><input  name='answerCheck_" + doc[i].QuestionID + "' type='radio' checked disabled='true'><i>" + strAnswer.substr(j, 1) + ".</i></label>";
                        } else {
                            strHtml = strHtml + "<label><input  name='answerCheck_" + doc[i].QuestionID + "' type='radio'  disabled='true'><i>" + strAnswer.substr(j, 1) + ".</i></label>";
                        }
                        strHtml = strHtml + "<div class='analyze_div'>对</div></label>";
                        strHtml = strHtml + "<label class='answer_item' style='display:block;font-weight: normal!important;' >";
                        if (doc[i].Answer == "false") {
                            strHtml = strHtml + "<label><input  name='answerCheck_" + doc[i].QuestionID + "' type='radio' checked disabled='true'><i>" + strAnswer.substr(j, 1) + ".</i></label>";
                        } else {
                            strHtml = strHtml + "<label><input  name='answerCheck_" + doc[i].QuestionID + "' type='radio'  disabled='true'><i>" + strAnswer.substr(j, 1) + ".</i></label>";
                        }
                        strHtml = strHtml + "<div class='analyze_div'>错</div></label>";
                    } break;
                    case 1: for (var j = 0; j < doc[i].QusOptions.length; j++) {
                        strHtml = strHtml + "<label class='answer_item' style='display:block;font-weight: normal!important;' >";
                        strHtml = strHtml + "<label><input  name='answerCheck_" + doc[i].QuestionID + "' type='radio'" + (doc[i].QusOptions[j].IsCorrect ? "checked" : "") + " disabled='true'><i>" + strAnswer.substr(j, 1) + ".</i></label>";
                        strHtml = strHtml + "<div class='analyze_div'>" + doc[i].QusOptions[j].Content + "</div></label>";

                        if (doc[i].QusOptions[j].IsCorrect) {
                            answer = answer + strAnswer.substr(j, 1);
                        }
                    } break;
                    case 2: for (var j = 0; j < doc[i].QusOptions.length; j++) {
                        strHtml = strHtml + "<label class='answer_item' style='display:block;font-weight: normal!important;' >";
                        strHtml = strHtml + "<label><input  name='answerCheck_" + doc[i].QuestionID + "' type='check'" + (doc[i].QusOptions[j].IsCorrect ? "checked" : "") + " disabled='true'><i>" + strAnswer.substr(j, 1) + ".</i></label>";
                        strHtml = strHtml + "<div class='analyze_div'>" + doc[i].QusOptions[j].Content + "</div></label>";
                        if (doc[i].QusOptions[j].IsCorrect) {
                            answer = answer + strAnswer.substr(j, 1);
                        }
                    } break;

                }
                strHtml = strHtml + "</div>";
                strHtml = strHtml + "<div  class='mgt20 tiku_tip'>";
                strHtml = strHtml + "<div class='sortlist'>";
                strHtml = strHtml + "<h1>解析</h1>";
                strHtml = strHtml + "<a class='btn btn-danger pull-right btn-xs mgl5' onclick='showDelQuestion(" + doc[i].QuestionID + ")' >删除</a> ";
                strHtml = strHtml + "<a class='btn btn-success pull-right  btn-xs mgl5' href='/Question/Edit/" + doc[i].QuestionID + "' >编辑</a> ";
                strHtml = strHtml + "<a class='btn btn-info pull-right  btn-xs mgl5' href='/Question/Create/" + doc[i].ChapterID + "?sort=" + (doc[i].Sort+1) + "' >之后增加一题</a> ";
                strHtml = strHtml + "<a class='btn btn-info pull-right  btn-xs mgl5' href='/Question/Create/" + doc[i].ChapterID + "?sort=" + doc[i].Sort  + "' >之前增加一题</a> ";

                if (doc[i].State) {
                    strHtml = strHtml + "<a class='btn btn-danger pull-right btn-xs mgl5' onclick='changeState(" + doc[i].QuestionID + ",this)' >关闭</a> ";
                }else{
                    strHtml = strHtml + "<a class='btn btn-success pull-right btn-xs mgl5' onclick='changeState(" + doc[i].QuestionID + ",this)' >正常</a> ";
                }
                
                strHtml = strHtml + "</div>";
                if (doc[i].Category != 0) {
                    strHtml = strHtml + "<p  class='text-success mgt20'>正确答案：" + answer + "</p>";
                } else {
                    if(doc[i].Answer=="true"){
                        strHtml = strHtml + "<p  class='text-success mgt20'>正确答案：对</p>";
                    }else{
                        strHtml = strHtml + "<p  class='text-success mgt20'>正确答案：错</p>";
                    }
                    
                }

                strHtml = strHtml + "<p>文字解析：" + doc[i].TextAnalysis + "</p>";
                strHtml = strHtml + "</div></div></div>";

            }
            //console.trace(strHtml);
            $("#quslist").html("");
            $("#quslist").html(strHtml);
            $("#pagelist").find("li").each(function (index, element) {
                if (index + 1 == page) {
                    $(element).addClass("active");
                }else{
                    $(element).removeClass("active");
                }               
            });          
        });
    }
    window.getQuestionList = exports.getQuestionList;
    $(".tiku").click(function () {
        var id = $(this).attr("data-id");
        $(".tikuchapter").find("li").each(function (index, element) {          
                $(element).removeClass("active");           
        });
        $(this).parent().addClass("active");
        
        var count = parseInt($(this).next("span").find("span:first").text());
        $("#addqus").attr("href", "/Question/Create/" + id+"?sort="+(count+1));
        var pagecount = count % 2 ? count / 2 + 1 : count / 2;
        var strPage = "";
        strPage = strPage + "<ul class='pagination'>";
        for (var i = 1; i <= pagecount; i++) {        
            strPage = strPage + "<li ><a href='#'  onclick='getQuestionList(" + id + "," + i + ")'>" + i + "</a></li>"      
        }
        strPage = strPage + "</ul>";
        $("#pagelist").html();
        $("#pagelist").html(strPage);
        getQuestionList(id, 1);
        
    });

    //删除问题对话框
    exports.showDelQuestion = function (id) {

        //alert(id);
        $("#btnDelQuestion").attr("data-id", id);
       
        $('#delQuestionPopup').modal("show");
    }
    window.showDelQuestion = exports.showDelQuestion;
    //删除问题
    $("#btnDelQuestion").click(function () {
        var id = $(this).attr("data-id");
        $.post("/Question/Del/" + id, null, function (msg) {
           
                location.reload();
            
        });
    });

    //删除问题对话框
    exports.changeState = function (id,self) {
        $.post("/Question/ChangeState/" + id, null, function (msg) {
            if(msg=="True"){
                $(self).removeClass("btn-success");
                $(self).addClass("btn-danger");
                $(self).text("关闭");
            }else if(msg=="False"){
                $(self).removeClass("btn-danger");
                $(self).addClass("btn-success");
                $(self).text("正常");
            }

        });
       
    }
    window.changeState = exports.changeState;
});

