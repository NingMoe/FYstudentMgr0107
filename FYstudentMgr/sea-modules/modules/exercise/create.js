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
    var UE = require('ueditor');
    var option = {
        //initialContent: noteContent,
        encodeuri:true,
        initialFrameHeight: 200,
        //initialContent: "在这里输入您的步骤的详细内容",
        toolbars: [[
        'fullscreen', 'insertcode', '|', 'bold', 'italic', 'underline', 'forecolor', 'backcolor', 'removeformat', '|', 'emotion', 'link', 'simpleupload', 'insertvideo', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'undo', 'redo'
        ]]
    };



    //var ue = UE.init("Content", option);
    var ueBody = UE.init("ExerciseBody", option);
    var ueAnalysis = UE.init("TextAnalysis", option);
    //获取usecheckbox对象数组
    var muse = document.getElementsByName("muse");
    var manswer = document.getElementsByName("manswer");
    var moption = document.getElementsByName("mOption");
    var suse = document.getElementsByName("suse");
    var sanswer = document.getElementsByName("sanswer");
    var soption = document.getElementsByName("sOption");
    //利用数组形式生成五个ueditor对象
    var sueArray = new Array();
    for (var i = 0; i < 5; i++) {
        //alert("Option_" + i);
        sueArray[i] = UE.init("sOption_" + i, option);
        sueArray[i].addListener("contentChange", function () {
            var k = sueArray.indexOf(this);  //获取激发事件的对象下标             
            if (this.getContentLength(true) > 0) {
                suse[k].checked = true;
            } else {
                suse[k].checked = false;
            }

        });
    }

    //利用数组形式生成五个ueditor对象
    var mueArray = new Array();
    for (var i = 0; i < 5; i++) {
        //alert("Option_" + i);
        mueArray[i] = UE.init("mOption_" + i, option);
        mueArray[i].addListener("contentChange", function () {
            var k = mueArray.indexOf(this);  //获取激发事件的对象下标             
            if (this.getContentLength(true) > 0) {
                muse[k].checked = true;
            } else {
                muse[k].checked = false;
            }

        });
    }

    //题型框选择事件
    $("#Category").change(function () {
        category = parseInt($("#Category option:selected").val());
        if (category == 0) {
            $("#single").addClass("hidden");
            $("#multiple").addClass("hidden");
            $("#judge").removeClass("hidden");
        }
        if (category == 1) {
            $("#single").removeClass("hidden");
            $("#multiple").addClass("hidden");
            $("#judge").addClass("hidden");
        }
        if (category == 2) {
            $("#single").addClass("hidden");
            $("#multiple").removeClass("hidden");
            $("#judge").addClass("hidden");
        }
    });


    exports.check = function () {
        if (ueBody.getContentLength() <= 0) {
            alert("请输入题干");
            return false;
        }
        if (ueAnalysis.getContentLength() <= 0) {
            alert("请输入解析");
            return false;
        }
    }
    window.check = exports.check;
});