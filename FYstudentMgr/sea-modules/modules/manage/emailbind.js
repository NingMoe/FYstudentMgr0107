
define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('bootstrap');
    require('tool');
    require('modules/manage/left-nav.css');
    require('modules/manage/pwdresetemail.css');
    
    //点击刷新验证码
    $("#captcha").click(function () {
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
    $("input[name='email']").blur(function () {
        var error = "";
        var pwd = $(this).val();
        var ret = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ($.trim(pwd).length > 0) {
            isfirst2= 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "邮箱不能为空";
        }
        else if (ret.test(pwd) == false) {
            error = "邮箱不符合规范";
        }
        if (error != "") {

            $(this).parent().find(".info").addClass("info-error");
            $(this).parent().find(".info").find(".inner").html('<p id="imgcode-error" class="error">' + error + '</p>');
            if (isfirst2 == 1) {
                $(this).addClass("input-error");
                $(this).parent().find(".info").show();
            }

        }
    });

    $(".step1-next").click(function () {
        $("input[name='email']").blur();
        $("#imgcode").blur();
        var errorlist = $(".info-error");
        // console.trace(errorlist.length);
        if (errorlist.length > 0) {
            errorlist.each(function (index, element) {
                $(element).show();
                $(element).parent().find("input").addClass("input-error");
            });
            return false;
        }
        var email = $("input[name='email']").val();
        var code = $("#imgcode").val();
        $.post("/manage/sendemail", {"code":code,"email":email}, function (msg) {
            if (msg == "ok") {
                $(".mail-url").text(email);
                $(".step-2").show();
                $(".step-1").hide();
            }else if(msg=="codeerror"){
                $("#captcha").click();
                $("#imgcode").parent().find(".info").addClass("info-error");
                $("#imgcode").parent().find(".info").find(".inner").html('<p id="imgcode1-error" class="error">验证码错误</p>');
                $("#imgcode").addClass("input-error");
                $("#imgcode").parent().find(".info").show();
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