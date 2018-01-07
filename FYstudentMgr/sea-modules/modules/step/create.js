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
        initialFrameHeight: 300,
        initialContent: "在这里输入您的步骤的详细内容",
        toolbars: [[
        'fullscreen', 'insertcode', '|', 'bold', 'italic', 'underline', 'forecolor', 'backcolor', 'removeformat', '|', 'emotion', 'link', 'simpleupload', 'insertvideo', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'undo', 'redo'
        ]]
    };
    var ue = UE.init("Content", option);





});