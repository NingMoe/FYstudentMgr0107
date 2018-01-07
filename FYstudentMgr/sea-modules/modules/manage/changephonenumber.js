
define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('bootstrap');
    require('tool');
    require('modules/manage/left-nav.css');
    require('modules/manage/addphonenumber.css');
    //点击刷新验证码
    $("#captcha1").click(function () {
        $("#captcha1").attr("src", "/Account/GetAuthCode?time=" + Math.random());
    });
    var isfirst1 = 0;
    $("#imgcode1").keyup(function () {
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

            $(this).parent().find(".info").addClass("info-error");
            $(this).parent().find(".info").find(".inner").html('<p id="imgcode1-error" class="error">' + error + '</p>');
            if (isfirst1 == 1) {
                $(this).addClass("input-error");
                $(this).parent().find(".info").show();
            }

        } else {
            $(this).removeClass("input-error");

            $(this).parent().find(".info").removeClass("info-error");
            $(this).parent().find(".info").hide();
        }
    });

    $("#imgcode1").blur(function () {
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

            $(this).parent().find(".info").addClass("info-error");
            $(this).parent().find(".info").find(".inner").html('<p id="imgcode1-error" class="error">' + error + '</p>');
            if (isfirst1 == 1) {
                $(this).addClass("input-error");
                $(this).parent().find(".info").show();
            }

        }
    });
    var isfirst2 = 0;
    //$("#PhoneNumber").keyup(function () {
    //    var error = "";
    //    var pwd = $(this).val();
    //    var ret = /^1[34578]{1}\d{9}$/;
    //    if ($.trim(pwd).length > 0) {
    //        isfirst2 = 1;
    //    }
    //    if ($.trim(pwd).length <= 0) {
    //        error = "手机号不能为空";
    //    } else if (ret.test(pwd) == false) {
    //        error = "手机号不符合规范";
    //    }
    //    if (error != "") {

    //        $(this).parent().find(".info").addClass("info-error");
    //        $(this).parent().find(".info").find(".inner").html('<p id="phonenumber-error" class="error">' + error + '</p>');
    //        if (isfirst2 == 1) {
    //            $(this).addClass("input-error");
    //            $(this).parent().find(".info").show();
    //        }

    //    } else {
    //        $(this).removeClass("input-error");

    //        $(this).parent().find(".info").removeClass("info-error");
    //        $(this).parent().find(".info").hide();
    //    }
    //});

    $("#phonenumber").blur(function () {
        var error = "";
        var pwd = $(this).val();
        var ret = /^1[34578]{1}\d{9}$/;
        if ($.trim(pwd).length > 0) {
            isfirst2 = 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "手机号不能为空";
        } else if (ret.test(pwd) == false) {
            error = "手机号不符合规范";
        }
        if (error != "") {

            $(this).parent().find(".info").addClass("info-error");
            $(this).parent().find(".info").find(".inner").html('<p id="phonenumber-error" class="error">' + error + '</p>');
            if (isfirst2 == 1) {
                $(this).addClass("input-error");
                $(this).parent().find(".info").show();
            }

        } else {
            $(this).removeClass("input-error");

            $(this).parent().find(".info").removeClass("info-error");
            $(this).parent().find(".info").hide();
        }
    });

    var InterValObj; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount;//当前剩余秒数

    $("#getcode1").click(function () {
        $("#imgcode1").blur();
        var codebtn = this;
        var errorlist = $(".info-error");
        // console.trace(errorlist.length);
        if (errorlist.length > 0) {
            errorlist.each(function (index, element) {
                $(element).show();
                $(element).parent().find("input").addClass("input-error");
            });
            return false;
        }
        var code = $("#imgcode1").val();
        $(codebtn).attr("disabled", true);
        $.post("/manage/verifycode", { "code": code}, function (msg) {
            if (msg == "codeerror") {
                $(codebtn).removeAttr("disabled");
                $("#captcha1").click();
                $("#imgcode1").parent().find(".info").addClass("info-error");
                $("#imgcode1").parent().find(".info").find(".inner").html('<p id="imgcode1-error" class="error">验证码错误</p>');
                $("#imgcode1").addClass("input-error");
                $("#imgcode1").parent().find(".info").show();
            } else if (msg == "ok") {
                // alert(1111);
                curCount = count;
                //设置button效果，开始计时
                $(codebtn).addClass("btn-mark-disable");
                
                $(codebtn).text("已发送(" + curCount + "S)");
                InterValObj = window.setInterval(function(){SetRemainTime(codebtn)}, 1000); //启动计时器，1秒执行一次
            } else if (msg == "found") {
                $(codebtn).removeAttr("disabled");
                $("#captcha1").click();
                showError(document.getElementsByName("mobile"), "该手机号已绑定,请换一个试试");
            }
        });
    });

    $("#getcode2").click(function () {
        $("#phonenumber").blur();
        $("#imgcode2").blur();
        var codebtn = this;
        var errorlist = $(".info-error");
        // console.trace(errorlist.length);
        if (errorlist.length > 0) {
            errorlist.each(function (index, element) {
                $(element).show();
                $(element).parent().find("input").addClass("input-error");
            });
            return false;
        }
        var code = $("#imgcode2").val();
        var phonenumber = $("#phonenumber").val();
        $.post("/manage/verifycode", { "code": code, "number": phonenumber }, function (msg) {
            if (msg == "codeerror") {
                $("#captcha2").click();
                $("#imgcode2").parent().find(".info").addClass("info-error");
                $("#imgcode2").parent().find(".info").find(".inner").html('<p id="imgcode2-error" class="error">验证码错误</p>');
                $("#imgcode2").addClass("input-error");
                $("#imgcode2").parent().find(".info").show();
            } else if (msg=="ok") {
                // alert(1111);
                curCount = count;
                //设置button效果，开始计时
                $(codebtn).addClass("btn-mark-disable");
                $(codebtn).attr("disabled", true);
                $(codebtn).text("已发送(" + curCount + "S)");
                InterValObj = window.setInterval(function () { SetRemainTime(codebtn) }, 1000); //启动计时器，1秒执行一次
            } else if (msg == "found") {
                $("#captcha2").click();
                showError(document.getElementById("phonenumber"), "该手机号已绑定,请换一个试试");
            }
        });
    });
    function SetRemainTime(obj) {
        if (curCount == 0) {
            window.clearInterval(InterValObj);//停止计时器
            $(obj).removeClass("btn-mark-disable");//启用按钮
            $(obj).removeAttr("disabled");
            $(obj).text("重发验证码");
        }
        else {
            curCount--;
            $(obj).text("已发送(" + curCount + "S)");
        }
    }
    var isfirst3 = 0;
    $("#code1").keyup(function () {
        var error = "";
        var pwd = $(this).val();
        var ret = /^\d{6}$/;
        if ($.trim(pwd).length > 0) {
            isfirst3 = 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "短信验证码不能为空";
        } else if (ret.test(pwd) == false) {
            error = "请输入正确的短信验证码";
        }

        if (error != "") {

            $(this).parent().find(".info").addClass("info-error");
            $(this).parent().find(".info").find(".inner").html('<p id="msgcode-error" class="error">' + error + '</p>');
            if (isfirst3 == 1) {
                $(this).addClass("input-error");
                $(this).parent().find(".info").show();
            }

        } else {
            $(this).removeClass("input-error");

            $(this).parent().find(".info").removeClass("info-error");
            $(this).parent().find(".info").hide();
        }
    });


    function showError(obj,info) {
        $(obj).parent().find(".info").addClass("info-error");
        $(obj).parent().find(".info").find(".inner").html('<p class="error">' + info + '</p>');
       
            $(obj).addClass("input-error");
            $(obj).parent().find(".info").show();
        
    }

    $("#code1").blur(function () {
        var error = "";
        var pwd = $(this).val();
        var ret = /^\d{6}$/;
        if ($.trim(pwd).length > 0) {
            isfirst3 = 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "短信验证码不能为空";
        } else if (ret.test(pwd) == false) {
            error = "请输入正确的短信验证码";
        }
        if (error != "") {

            $(this).parent().find(".info").addClass("info-error");
            $(this).parent().find(".info").find(".inner").html('<p id="msgcode-error" class="error">' + error + '</p>');
            if (isfirst3 == 1) {
                $(this).addClass("input-error");
                $(this).parent().find(".info").show();
            }

        } else {
            $(this).removeClass("input-error");

            $(this).parent().find(".info").removeClass("info-error");
            $(this).parent().find(".info").hide();
        }
    });
    //填写短信验证码后点击下一步按钮
    $(".step-1 .step1-next").click(function () {
        //$("#PhoneNumber").blur();
        //$("#imgcode1").blur();
        $("#code1").blur();
        var errorlist = $(".info-error");
        //console.trace(errorlist.length);
        if (errorlist.length > 0) {
            errorlist.each(function (index, element) {
                $(element).show();
                $(element).parent().find("input").addClass("input-error");
            });
            return false;
        }
        
        var code = $("#code1").val();
        var url = "/manage/VerifyPhoneNumber";
        $.post(url, { "code": code }, function (data) {
            if (data == "ok") {
                $(".step1-nav").removeClass("step-active");
                $(".step1-nav").addClass("item-active");
                $(".step1-nav .step").text("");
                $(".step2-nav").addClass("step-active");
                $(".step2-nav .step").addClass("step-nav-active");
                $(".step-1").hide();
                $(".step-2").show();
            } else if (data == "error") {
                $("#msg-info").text("手机号错误");
                $("#msgPopup").modal("show");
                $(".imark").click();
            } else {
                $("#code1").parent().find(".info").addClass("info-error");
                $("#code1").parent().find(".info").find(".inner").html('<p id="msgcode1-error" class="error">短信验证码错误</p>');

                $("#code1").addClass("input-error");
                $("#code1").parent().find(".info").show();
            }
        });

    });


    var isfirst4 = 0;
    $("#imgcode2").keyup(function () {
        var error = "";
        var pwd = $(this).val();
        if ($.trim(pwd).length > 0) {
            isfirst4 = 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "验证码不能为空";
        }
        //} else if ("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$".test(pwd) == false) {
        //    error = "登陆密码不符合规范";
        //}
        if (error != "") {

            $(this).parent().find(".info").addClass("info-error");
            $(this).parent().find(".info").find(".inner").html('<p id="imgcode2-error" class="error">' + error + '</p>');
            if (isfirst4 == 1) {
                $(this).addClass("input-error");
                $(this).parent().find(".info").show();
            }

        } else {
            $(this).removeClass("input-error");

            $(this).parent().find(".info").removeClass("info-error");
            $(this).parent().find(".info").hide();
        }
    });

    $("#imgcode2").blur(function () {
        var error = "";
        var pwd = $(this).val();
        if ($.trim(pwd).length > 0) {
            isfirst4 = 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "验证码不能为空";
        }
        //} else if ("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$".test(pwd) == false) {
        //    error = "登陆密码不符合规范";
        //}
        if (error != "") {

            $(this).parent().find(".info").addClass("info-error");
            $(this).parent().find(".info").find(".inner").html('<p id="imgcode2-error" class="error">' + error + '</p>');
            if (isfirst4 == 1) {
                $(this).addClass("input-error");
                $(this).parent().find(".info").show();
            }

        }
    });


    var isfirst5 = 0;
    $("#code2").keyup(function () {
        var error = "";
        var pwd = $(this).val();
        var ret = /^\d{6}$/;
        if ($.trim(pwd).length > 0) {
            isfirst5 = 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "短信验证码不能为空";
        } else if (ret.test(pwd) == false) {
            error = "请输入正确的短信验证码";
        }

        if (error != "") {

            $(this).parent().find(".info").addClass("info-error");
            $(this).parent().find(".info").find(".inner").html('<p id="msgcode-error" class="error">' + error + '</p>');
            if (isfirst5 == 1) {
                $(this).addClass("input-error");
                $(this).parent().find(".info").show();
            }

        } else {
            $(this).removeClass("input-error");

            $(this).parent().find(".info").removeClass("info-error");
            $(this).parent().find(".info").hide();
        }
    });


    $("#code2").blur(function () {
        var error = "";
        var pwd = $(this).val();
        var ret = /^\d{6}$/;
        if ($.trim(pwd).length > 0) {
            isfirst5= 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "短信验证码不能为空";
        } else if (ret.test(pwd) == false) {
            error = "请输入正确的短信验证码";
        }
        if (error != "") {

            $(this).parent().find(".info").addClass("info-error");
            $(this).parent().find(".info").find(".inner").html('<p id="msgcode2-error" class="error">' + error + '</p>');
            if (isfirst5 == 1) {
                $(this).addClass("input-error");
                $(this).parent().find(".info").show();
            }

        } else {
            $(this).removeClass("input-error");

            $(this).parent().find(".info").removeClass("info-error");
            $(this).parent().find(".info").hide();
        }
    });


    //填写短信验证码后点击完成按钮
    $(".step-2 .step1-next").click(function () {
        $("#phonenumber").blur();
        //$("#imgcode2").blur();
        $("#code2").blur();
        var errorlist = $(".info-error");
        //console.trace(errorlist.length);
        if (errorlist.length > 0) {
            errorlist.each(function (index, element) {
                $(element).show();
                $(element).parent().find("input").addClass("input-error");
            });
            return false;
        }

        var code = $("#code2").val();
        var phonenumber = $("#phonenumber").val();
        var url = "/manage/VerifyPhoneNumber";
        $.post(url, { "code": code, "number": phonenumber }, function (data) {
            if (data == "ok") {
                location.href = "/manage/secure?message=6";
            } else if (data == "error") {
                $("#msg-info").text("手机号错误");
                $("#msgPopup").modal("show");
                $(".imark").click();
            } else {
                $("#code2").parent().find(".info").addClass("info-error");
                $("#code2").parent().find(".info").find(".inner").html('<p id="msgcode2-error" class="error">短信验证码错误</p>');
                
                $("#code2").addClass("input-error");
                $("#code2").parent().find(".info").show();
                
            }
        });

    });
    $("input").focus(function () {
        $(this).addClass("input-focus");
        $(this).next(".tip").show();
        $(this).removeClass("input-error");

        $(this).parent().find(".info").removeClass("info-error");
        $(this).parent().find(".info").hide();
    });
    $("input").blur(function () {
        $(this).removeClass("input-focus");
        $(this).next(".tip").hide();
    });
});