define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('ueditor-config');
    var UE = require('ueditor');
    require('waypoints');
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
    var oidCourse = "1";
    var idUser ;
    //var idView = "201703010856146878";
    //alert(idUser);
    var idExercise = 0;
    var jsonExercise = {};
    var jsonRecord = {};
    var finished = false;
    var finishedVideo = false;
    var maxScore = 1;
    var widthJBox;
    var widthKBox;
    var idClass ;
    var idLesson ;
    var isDragging = false;
    var widthAnswer;
    var widthDes;
    var isAnswerWatched = false;
    var enrollState;
    var trial;
    exports.init = function (lessonid,classid,userid,state,istrial) {
        idLesson = lessonid;
        idClass = classid;
        idUser = userid;
        enrollState = state;
        trial=istrial;

        $.post("/Note/GetLesson", { lessonid: idLesson, userid: idUser }, function (doc) {
            ue.ready(function () {
                ue.setContent(decodeURI(doc));
            });
        });
        ///用户购买了课程或者课程允许试听则显示图文解析
        if (enrollState == "enroll" || trial == "True") {
            $.post("/Lesson/getRichTip", { "id": idLesson }, function (msg) {
                $("#richtipPanel").html(msg);
                // transRichTip(msg);
                // $("#divWatchAnswer").hide();
                // $("#tipAnswer").modal("hide");
                if ($("#btnRichTip").hasClass("active")) {
                    $("#richtipPanel").show();
                }
            });
        }
        

       
    }
    //alert(idLesson);
    //if ("undefined" === "object" && "undefined" === "boolean") {
    //    $(".btnLogin").click();
    //}

    ////---------------------------------
    // 提问
    ////---------------------------------
    $("#btnAsk").click(function () {
        if (enrollState == "notlog") {
            alert("必须登录才能提问");
            location.href = "/Account/Login?returnUrl=" + encodeURI(window.location.pathname + window.location.search);
        }
        var urlAsk = "/Discuss/Create/" + idClass + "?title=" + $("#contentQuestion").val();
        
        urlAsk += "&idLesson=" + idLesson;
        window.open(urlAsk);
    });


    //保存本课笔记
    $("#btnSaveLessonNote").click(function () {
        if (enrollState == "notlog") {
            alert("必须登录才能做笔记");
            location.href = "/Account/Login?returnUrl=" + encodeURI(window.location.pathname + window.location.search);
        }
            $(this).button('loading');
            var doc = {};
            doc.userid = idUser;
            doc.lessonid = idLesson;
            doc.note = ue.getURIContent();//"内容";//ue.getContent();{ lessonid: idLesson, userid: idUser, note: "这是笔记的内容" }
            //alert();
            //var mynote = ue.getContent();
            // alert(mynote);
            $.post("/Note/Update", doc, function (msg) {
                //alert(decodeURI(msg));
                $("#btnSaveLessonNote").button('reset');
                $("#okSaveLessonNote").fadeIn(300);
                $("#okSaveLessonNote").fadeOut(300);
                ue.setContent(decodeURI(msg));
            });
       
    });

    var option = {
        //initialContent: noteContent,
        encodeuri: true,
        initialFrameWidth: 303,
        initialFrameHeight: $(window).height() - 244,
        autoHeightEnabled: false,
        toolbars: [[
        'fontsize', 'forecolor', 'backcolor',
        'bold', 'italic', 'underline', 'superscript', 'subscript', 'simpleupload'
        ]]
    };
    var ue = UE.init("ueditor", option);
    
    ////---------------------------------
    //  页面初始化、尺寸控制
    ////---------------------------------
    $("#homeworkWrapper").height($(window).height() - 40);
    $("#homeworkDes").width($(window).width() / 2);
    $("#homeworkAnswer").width($(window).width() / 2);
    $("#homeworkAnswer").css("left", $("#homeworkAnswer").width());
    $("#lessonRight").height($(window).height() - 100);
    $("#auditionList").height($(window).height() - 500);
    //窗口缩放事件
    $(window).resize(function (e) {
        //屏幕变化时更新宽度和高度
        $("#homeworkDes").width($(window).width() / 2);
        $("#homeworkAnswer").width($(window).width() / 2);
        $("#homeworkAnswer").css("left", $("#homeworkDes").width());
        $("#homeworkWrapper").height($(window).height() - 40);
        $("#lessonRight").height($(window).height() - 100);
        $("#auditionList").height($(window).height() - 500);
    });
    $("#homeworkDes").perfectScrollbar();

    
    var isclick = 0;
    $("#btnRichTip").click(showRichTip);



    function showRichTip() {
        if (enrollState == "enroll" || trial == "True") {
            $("#opeWrapper").removeClass("hidden");
            $("#videoWrapper").addClass("hidden");
            $("#richtipPanel").removeClass("hidden");
            $("#contentPanel").addClass("hidden");
            if (isclick == 0) {
                // console.trace(1111111111);
                isclick = 1;
                waypoint(1);
                //waypoint();
            }
        } else {
            $("#opeWrapper").addClass("hidden");
            $("#videoWrapper").addClass("hidden");
            $("#contentPanel").addClass("hidden");
            $("#richtipPanel").addClass("hidden");
            $("#notStartedCover").removeClass("hidden");

        }
        
    }

    function showVideoTip() {
        if (enrollState == "enroll" || trial == "True") {
            $("#opeWrapper").addClass("hidden");
            $("#videoWrapper").removeClass("hidden");

        } else {           
            $("#opeWrapper").addClass("hidden");
            $("#videoWrapper").addClass("hidden");
            $("#contentPanel").addClass("hidden");
            $("#richtipPanel").addClass("hidden");
            $("#notStartedCover").removeClass("hidden");
        }
        
    }
    //点击“题目”
    $("#btnContent").click(function () {
        $("#opeWrapper").removeClass("hidden");
        $("#videoWrapper").addClass("hidden");
        $("#contentPanel").removeClass("hidden");
        $("#richtipPanel").addClass("hidden");
        $("#notStartedCover").addClass("hidden");
    });
    $("#btnVideoTip").click(showVideoTip);


    /////////////////////////////
    ///////滚动监听
    //////////////////////////////

  
    //当前页面添加stepicon类
   
    $("body").delegate('#myTab a[data-toggle="tab"]','shown.bs.tab', function (e) {
        //console.trace(111);
        var tabindex = $(this).attr("data-no");
        var preindex = $(e.relatedTarget).attr("data-no");
        $("#step_" + preindex).removeClass("stepicon");

        $("#ico-group_" + preindex).removeClass("icogroup");
        //console.trace(tabindex);
        $("#step_" + tabindex).addClass("stepicon");

        $("#ico-group_" + tabindex).addClass("icogroup");
        console.trace(preindex + ">" + tabindex);
        waypoints.splice(0, waypoints.length);
        console.trace(waypoints);
        waypoint(tabindex);
        //console.trace(waypoints);

        //waypoint();
    });


    var waypoints = new Array();

    function waypoint(item) {
        $("#item_" + item + " .stepicon .list-icon").each(function (index, element) {

            waypoints[index] = $(element).waypoint(function (direction) {
                if (direction == "up") {
                    //if (index == 0) {
                    //    $($("#ico-group div").get(index)).css("visibility", "hidden");
                    //}
                    //alert(index);
                    console.trace("up" + index);
                    for (var i = 0; i < $("#item_" + item + " .icogroup div").length; i++) {
                        if (i >= index) {
                            $($("#item_" + item + " .icogroup div").get(i)).css("visibility", "hidden");
                            $($("#item_" + item + " .icogroup div").get(i)).removeClass("list-icon-current");
                        }
                        if (i == index) {
                            $($("#item_" + item + " .icogroup div").get(i - 1)).addClass("list-icon-current");
                        }
                    }
                    $(element).css("visibility", "visible");

                } else {
                    console.trace("down_" + index);
                    $(element).css("visibility", "hidden");
                    for (var i = 0; i < $(".icogroup div").length; i++) {
                        if (i < index) {
                            $($("#item_" + item + " .icogroup div").get(i)).removeClass("list-icon-current");
                        } else if (i == index) {
                            $($("#item_" + item + " .icogroup div").get(i)).css("visibility", "visible");
                            $($("#item_" + item + " .icogroup div").get(i)).addClass("list-icon-current");

                        } else {
                            $($("#item_" + item + " .icogroup div").get(i)).css("visibility", "hidden");
                            $($("#item_" + item + " .icogroup div").get(i)).removeClass("list-icon-current");
                        }
                    }
                }

                $($("#item_" + item + " .icogroup div").get(index)).unbind("click").bind("click", function () {
                    var _targetTop = $(element).offset().top - 32 * index - 130;//获取位置
                    console.trace(_targetTop);
                    jQuery("html,body").animate({ scrollTop: _targetTop }, 600);//跳转
                });

            }, {
                offset: 130 + index * 32
            });
        });
    }

    function cancelwaypoint(item) {
        $(".stepicon_" + item + " .list-icon").each(function (index, element) {
            $($("#ico-group_" + item + " div").get(index)).css("visibility", "hidden");
            $($("#ico-group_" + item + " div").get(index)).removeClass("list-icon-current");
            $(element).waypoint(function (direction) {
                console.trace("cancel");
            });
        });
    }
});