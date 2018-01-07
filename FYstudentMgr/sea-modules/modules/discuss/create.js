define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('scoket');
    require('tool');
    //require('progress');
    //require('allRank');
    //var date = require('date');
    var idCourse, idLesson, idUser, category2, idExercise, idQuestion, idClass;
    var UE = require('ueditor');
    var option = {
        //initialContent: noteContent,
        encodeURI:true,
        initialFrameHeight: 300,
        initialContent: "在这里输入您的问题的详细内容",
        toolbars: [[
        'fullscreen', 'insertcode', '|', 'bold', 'italic', 'underline', 'forecolor', 'backcolor', 'removeformat', '|', 'emotion', 'link', 'simpleupload',  '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'undo', 'redo'
        ]]
    };
    var ue = UE.init("ueditorWrapper", option);
    window.ue = exports.ue = ue;
    exports.init = function (a,b,c,d,e,f,g) {
        idCourse = a;
        idLesson = b;
        idUser = c;
        category2 = d;
        idExercise = e;
        idQuestion = f;
        idClass = g;
    }
    //alert(idCourse);
    ue.addListener('focus', function () {
        var objImg = $(ue.getContent()).find("img");
        if (ue.getContentTxt() === "问题补充（选填）") {
            ue.setContent("");
            if (objImg.length === 1) {
                ue.setContent('<img src=​"' + objImg[0]["src"] + '">​');
            }
        }
    })
    ue.addListener('blur', function () {
        if (!ue.hasContents()) {
            ue.setContent("<p style='color:gray'>问题补充（选填）</p>");
        }
    })
    $("#txtTitleQuestion").blur(function () {
        var length = $("#txtTitleQuestion").val().length;
        if (length < 5) {
            $("#txtTitleTip").removeClass("hidden");
            $("#txtTitleTip").text("标题不能少于5个字！");
            $("#txtTitleQuestion").focus();
            $("#btnSubmit").addClass("hidden");
        } else if (length > 50) {
            $("#txtTitleTip").removeClass("hidden");
            $("#txtTitleTip").text("标题不能大于50个字！");
            $("#txtTitleQuestion").focus();
            $("#btnSubmit").addClass("hidden");
        } else {
            $("#txtTitleTip").addClass("hidden");
            $("#btnSubmit").removeClass("hidden");
        }
    });
    $("#txtTitleQuestion").blur();
    var isSubmit = false;

    ue.ready(function () {
        ue.setContent("<p style='color:gray'>问题补充（选填）</p>")
    });

    $("#btnSubmit").click(function () {
        if ($("#txtTitleQuestion").val().length >= 5 && $("#txtTitleQuestion").val().length <= 50) {
            $("#btnSubmit").button("loading");
            var content = "";
            if (ue.hasContents() && ue.getContentTxt() !== "问题补充（选填）") {
                content = ue.getURIContent();
            }
            var question = {"UserID":idUser,"Category2ID":category2, "CourseID": idCourse, "ClassID": idClass, "title": $("#txtTitleQuestion").val(), "content": content };
            if (idLesson != null) {
                question.LessonID = idLesson;
            }
            if (idExercise != null) {
                question.ExerciseID = idExercise;
            }
            if (idQuestion != null) {
                question.QuestionID = idQuestion;
            }
            console.trace(question);
            if (!isSubmit) {
                isSubmit = true;
                $.post("/Discuss/New", question, function (msg) {
                    if (msg.length > 20) {
                        console.trace(msg);

                    } else {
                        location.href = "/Discuss/Details/" + msg;
                    }
                   
                });
            }
        }
    });

    //$("#btnSubmit").click(function () {
    //    $("#btnSubmit").button("loading");
    //    var title = $.trim($("#Title").val()), contentHtml = ue.getContent(), contentText = ue.getPlainTxt();
    //    if ("" === title) {
    //        alert("这位课官，先给问题起个标题吧！");
    //        $("#btnSubmit").button("reset");
    //        return false;
    //    } else if (!ue.hasContents()) {
    //        alert("这位课官，先写点什么再发布吧！");
    //        $("#btnSubmit").button("reset");
    //        return false;
    //    } 

    //});
    //$("body").delegate("#showNoteLessonByKeju", "click", function () {
    //    $("#noteLessonByKeju").toggleClass("hidden");
    //});
});