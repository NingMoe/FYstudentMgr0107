define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('scoket');
    require('tool');
    //require('progress');
    //require('allRank');
    //var date = require('date');
    var UE = require('ueditor');
    var option = {
        //initialContent: noteContent,
        initialFrameHeight: 500,
        initialContent: "请填写文章类容",
        toolbars: [[
        'fullscreen', 'insertcode', '|', 'bold', 'italic', 'underline', 'forecolor', 'backcolor', 'removeformat', '|', 'emotion', 'link', 'simpleupload', 'insertvideo', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'undo', 'redo'
        ]]
    };
    var ue = UE.init("Content", option);
    window.ue = exports.ue = ue;



    $("#btnSubmit").click(function () {
        $("#btnSubmit").button("loading");
        var title = $.trim($("#Title").val()), contentHtml = ue.getContent(), contentText = ue.getPlainTxt();
        if ("" === title) {
            alert("这位课官，先给问题起个标题吧！");
            $("#btnSubmit").button("reset");
            return false;
        } else if (!ue.hasContents()) {
            alert("这位课官，先写点什么再发布吧！");
            $("#btnSubmit").button("reset");
            return false;
        }


    });
    $("body").delegate("#showNoteLessonByKeju", "click", function () {
        $("#noteLessonByKeju").toggleClass("hidden");
    });
});