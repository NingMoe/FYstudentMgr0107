
define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('bootstrap');
    require('tool');
    require('modules/manage/left-nav.css');
    require('modules/manage/addphonenumber.css');
    //点击刷新验证码
    $(".imark").click(function () {
        $("#captcha").attr("src", "/Account/GetAuthCode?time=" + Math.random());
    });
    var isfirst1 = 0;
    $("#imgcode").keyup(function () {
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
            $(this).parent().find(".info").find(".inner").html('<p id="imgcode-error" class="error">' + error + '</p>');
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

    $("#imgcode").blur(function () {
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
            $(this).parent().find(".info").find(".inner").html('<p id="imgcode-error" class="error">' + error + '</p>');
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

    $("#PhoneNumber").blur(function () {
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
        } else {
            $.ajax({
                type: "post",
                url: "/account/CheckUserName",
                data: { "userName": pwd },
                async: false,//取消异步  
                success: function (data) {
                    if (data == false) {
                        error = "该手机号已经被绑定，请换一个手机号！";
                    }
                }
            });
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

    $("#getcode").click(function () {
        $("#imgcode").blur();
        $("#PhoneNumber").blur();
        var bnt = this;
        var errorlist = $(".info-error");
       // console.trace(errorlist.length);
        if (errorlist.length > 0) {
            errorlist.each(function (index, element) {
                $(element).show();
                $(element).parent().find("input").addClass("input-error");
            });
            return false;
        }
        $(bnt).attr("disabled", true);
        var code = $("#imgcode").val();
        var ponenumber=$("#PhoneNumber").val();
        $.post("/manage/verifycode", { "code": code, "number": ponenumber }, function (msg) {
            if (msg == "codeerror") {
                $(bnt).removeAttr("disabled");
                $(".imark").click();
                $("#imgcode").parent().find(".info").addClass("info-error");
                $("#imgcode").parent().find(".info").find(".inner").html('<p id="imgcode-error" class="error">验证码错误</p>');
                $("#imgcode").addClass("input-error");
                $("#imgcode").parent().find(".info").show();
            } else if (msg == "ok") {
                // alert(1111);
                curCount = count;
                //设置button效果，开始计时
                $(bnt).addClass("btn-mark-disable");
                
                $(bnt).text("已发送(" + curCount + "S)");
                InterValObj = window.setInterval(function () { SetRemainTime(btn) }, 1000); //启动计时器，1秒执行一次
            } else if (msg == "found") {
                $(bnt).removeAttr("disabled");
                $(".imark").click();
                showError(document.getElementById("PhoneNumber"), "该手机号已绑定,请换一个试试");
            }
        });
    });
    function showError(obj, info) {
        $(obj).parent().find(".info").addClass("info-error");
        $(obj).parent().find(".info").find(".inner").html('<p class="error">' + info + '</p>');

        $(obj).addClass("input-error");
        $(obj).parent().find(".info").show();

    }

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
    $("#Code").keyup(function () {
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


    $("#Code").blur(function () {
        var error = "";
        var pwd = $(this).val();
        var ret = /^\d{6}$/;
        if ($.trim(pwd).length > 0) {
            isfirst2 = 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "短信验证码不能为空";
        } else if (ret.test(pwd) == false) {
            error = "请输入正确的短信验证码";
        }
        if (error != "") {

            $(this).parent().find(".info").addClass("info-error");
            $(this).parent().find(".info").find(".inner").html('<p id="msgcode-error" class="error">' + error + '</p>');
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
    //填写短信验证码后点击下一步按钮
    $(".step-1 .step1-next").click(function () {
        $("#PhoneNumber").blur();
        $("#imgcode").blur();
        $("#Code").blur();
        var errorlist = $(".info-error");
        console.trace(errorlist.length);
        if (errorlist.length > 0) {
            errorlist.each(function (index, element) {
                $(element).show();
                $(element).parent().find("input").addClass("input-error");
            });
            return false;
        }
        //var number=$("#PhoneNumber").val();
        //var code = $("#Code").val();
        //var url = "/manage/addPhoneNumber";
        //$.post(url, { "Code": code, "PhhoneNumber": number }, function (data) {
           
        //});

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