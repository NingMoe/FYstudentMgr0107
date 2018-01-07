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
        encodeuri: true,
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
    var slen = suse.length;
    var sueArray = new Array();
    if (slen > 0) {
        
        for (var i = 0; i < slen; i++) {
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
    }
    

    //利用数组形式生成五个ueditor对象
    var mlen = muse.length;
    var mueArray = new Array();
    if (mlen > 0) {
        for (var i = 0; i < mlen; i++) {
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

    }
    
  


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