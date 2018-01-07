define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('modules/course/intro.css');
    require('admincss');
    require('font-awesome');
    require('stickup');
    var classid, userid;
    userid = $("#kj_usermenu").attr("data-userid");
    //require('scoket');
    require('tool');

    exports.init = function (id,courseid) {
        classid = id;
        var angular = require('angular');
        var sanitize = require('angular-sanitize');
        var app = angular.module('myApp', ['ngSanitize']);
        app.controller('courseCtrl', function ($scope, $http, $filter) {
            $scope.classId = id;
            $http.post("/course/queryLesson/" + courseid)
                       .success(function (data) {
                           if (data.status == "ok") {
                              
                               $scope.sections = data.data;
                              
                           }
                       });
            $scope.trialLesson = function (no) {
                if (userid === undefined) {
                    $(".fastLogin").click();
                    return false;
                }
                var doc={};
                doc.id=id;
                $http.post("/course/TrialClass", doc)
                          .success(function (data) {
                              if (data == "ok") {
                                  window.open("/lesson/play/"+no+"?classid=" + id);
                              }
                          });
            }

            $scope.payLesson = function () {
                if (userid === undefined) {
                    $(".fastLogin").click();
                    return false;
                }              
                location.href = "/order/buynew/" + id;
            }
        });
        angular.bootstrap(document.body, ["myApp"]);
       
    }

    $(document).ready(function () {
        $("#stickAction").stickUp({
            //top:10
        });
        $("#stickScorll").stickUp();
        //$('.tab-pane').scrollspy({ target: '#subnav' });
    });
    $('#subnav').on('activate.bs.scrollspy', function () {
        //alert(1);
        // do something…
    })
    $(".bottom-left").on("mouseover","#share",function () {
        $("#share-bar").show();
    });
    $(".bottom-left").on("mouseout", "#share", function () {
        $("#share-bar").hide();
    });
    $("#share-bar").mouseenter(function () {
        $(this).show();
    });
    $("#share-bar").mouseleave(function () {
        $(this).hide();
    });
    $(".coupon-item-active").hover(function () {
        $(".coupontip").show();
    }, function () {
        $(".coupontip").hide();
    });
    $(".trial").click(function () {
        $.post("/course/trialclass/" + classid, function (msg) {
            if (msg == "notlogin") {
                $(".fastlogin").click();
            } else if (msg == "ok") {
                location.href = "/class/default/" + classid;
            }
        });
    });

    //教师列表翻页按钮
    var pageTeacher = 1;
    var teacherList = $(".teacher-list li");
    var tlCount = teacherList.length;
    var totalPage = parseInt(tlCount / 3 + 1);
    //console.trace(teacherList);
    //console.trace(totalPage);
    if (totalPage == 1) {
        $("#teacherPrev").removeClass("btn-active");
        $("#teacherPrev").addClass("btn-disabled");
        $("#teacherNext").removeClass("btn-active");
        $("#teacherNext").addClass("btn-disabled");
    } 
    $("#teacherPrev").click(function () {
        if (pageTeacher > 1) {
            pageTeacher--;
            teacherList.each(function (index,element) {
                if (parseInt(index / 3) == pageTeacher - 1) {
                    $(element).show(500);
                    console.trace(index);
                } else {
                    $(element).hide(500);
                }
            });
            checkBtn();
        }
    });
    $("#teacherNext").click(function () {
        if (pageTeacher < totalPage) {
            pageTeacher++;
            teacherList.each(function (index, element) {
                if (parseInt(index / 3) == pageTeacher - 1) {
                    $(element).show(500);
                } else {
                    $(element).hide(500);
                }
            });
            checkBtn();

        }
    });

    function checkBtn() {
       
        if (pageTeacher == 1) {
            $("#teacherNext").removeClass("btn-disabled");
            $("#teacherNext").addClass("btn-active");
            $("#teacherPrev").removeClass("btn-active");
            $("#teacherPrev").addClass("btn-disabled");
        } else if (pageTeacher > 1 && pageTeacher < totalPage) {
            $("#teacherPrev").removeClass("btn-disabled");
            $("#teacherPrev").addClass("btn-active");
            $("#teacherNext").removeClass("btn-disabled");
            $("#teacherNext").addClass("btn-active");
        } else {
            $("#teacherPrev").removeClass("btn-disabled");
            $("#teacherPrev").addClass("btn-active");
            $("#teacherNext").removeClass("btn-active");
            $("#teacherNext").addClass("btn-disabled");
        }           
    }


    //实现选项卡点击显示效果
    var tabpanes = $(".tab-pane");
    var pills=$(".mynav-pills > li");
    function hideall() {
        tabpanes.each(function(index,element) {
            $(element).hide();
        });
        pills.each(function(index,element) {
            $(element).removeClass("active");
        });
    }

    pills.each(function (index,element) {
        $(element).click(function () {           
            hideall();
            $(tabpanes[index]).show();
            $(element).addClass("active");
        });
    });
    var isopen = 0;
    $(".coupon-content").click(function () {
        CleanModal();
        //console.trace(userid);
        //if (userid ==null) {
            
        //    location.href = "/account/login?returnUrl=" + location.href;
        //}
    });
    $("#captcha").click(function () {
        $("#captcha").attr("src", "/Account/GetAuthCode?time=" + Math.random());
    });


    $(".pop-verify-text").keyup(function () {
        var error = "";
        var pwd = $(this).val();
        if ($.trim(pwd).length > 0) {
            isfirst1 = 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "验证码不能为空";
        }
        //} else if ("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$".test(pwd) == false) {
        //    error = "登陆密码不符合规范";
        //}
        if (error != "") {
            $(".error-msg").find("span").text(error);
            $(".error-msg").find("span").show();
        }
    });

    $(".pop-verify-text").blur(function () {
        var error = "";
        var pwd = $(this).val();
        if ($.trim(pwd).length > 0) {
            isfirst1 = 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "验证码不能为空";
        }
        //} else if ("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$".test(pwd) == false) {
        //    error = "登陆密码不符合规范";
        //}
        if (error != "") {

            $(".error-msg").find("span").text(error);
            $(".error-msg").find("span").show();
        }
    });
    
    $(".pop-btn").click(function () {
        var code = $(".pop-verify-text").val();
        if (isopen == 1) {
            $(".applyCoupon").modal("hide");
            return false;
        }
        $.post("/Course/ReceiveCoupon/" + classid, {"code":code}, function (msg) {
            if (msg == "codeerror") {
                $(".error-msg").find("span").text("验证码错误");
                $(".error-msg").find("span").show();
                $("#captcha").click();
            } else if (msg == "found") {
                isopen = 1;
                //$(".pop-btn").addClass("btn-close");
                //$(".pop-btn").removeClass("pop-btn");
                $(".pop-verify").hide();
                $(".error-msg").hide();
                $(".pop-inform").text("用户领取数量已超过最大限制");
            } else if (msg == "ok") {
                isopen = 1;
               // $(".pop-btn").addClass("btn-close");
               // $(".pop-btn").removeClass("pop-btn");
                $(".pop-verify").hide();
                $(".error-msg").hide();
                $(".pop-inform").text("恭喜你，领取成功！");
                $(".pop-link").show();
            }
        })
    });
   
    function CleanModal() {
        isopen = 0;
        $(".pop-verify-text").val("");
        $("#captcha").click();
        $(".error-msg").find("span").text("");
        $(".error-msg").find("span").hide();
        $(".pop-inform").text("");
        $(".pop-verify").show();
        
    }

    
});