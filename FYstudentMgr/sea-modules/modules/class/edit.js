﻿
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
        initialFrameWidth: 500,
        initialFrameHeight: 150,
        //initialContent: "在这里输入课程安排",
        toolbars: [[
        'fullscreen', 'insertcode', '|', 'bold', 'italic', 'underline', 'forecolor', 'backcolor', 'removeformat', '|', 'emotion', 'link', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'undo', 'redo'
        ]]
    };
    var arrange = UE.init("arrange", option);





});