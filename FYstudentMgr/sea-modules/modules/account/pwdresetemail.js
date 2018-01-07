define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('bootstrap');
    require('tool');
    require('modules/manage/left-nav.css');
    require('modules/manage/pwdresetemail.css');

    var email ="";

    var hasemail = 0;
    $("#email").blur(function () {
        var error = "";
        email = $(this).val();
        var ret = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ($.trim(email).length > 0) {
            hasemail = 1;
        }
        if (hasemail == 1) {
            if (email == "") {
                error = "请输入邮箱";
            } else if (ret.test(email) == false) {
                error = "邮箱不符合规范";
            } else {
                $.ajax({
                    type: "post",
                    url: "/account/CheckEmail",
                    data: { "email": email },
                    async: false,//取消异步  
                    success: function (data) {
                        if (data == false) {
                            error = "该邮箱没有绑定任何用户！";
                        }
                    }
                });
            }
            if (error != "") {
                showError(this, error);
            }
        }

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
    $(".step1-next").click(function () {
        if (hasemail == 0) {
            hasemail = 1;
            $("#email").blur();
        }
        $("#imgcode").blur();
        var codebtn = this;
        var errorlist = $(".info-error");
        //console.trace(errorlist.length);
        if (errorlist.length > 0) {
            errorlist.each(function (index, element) {
                $(element).show();
                $(element).parent().find("input").addClass("input-error");
            });
            return false;
        }
        var code = $("#imgcode").val();
        $.post("/account/sendemail", {"code":code,"email":email}, function (msg) {
            if (msg == "ok") {
                $(".mail-url").text(email.replace(/w{3}(?=@\\w+?.com)/i, "***"));
                $(".step-2").show();
                $(".step-1").hide();
            }
            
        });
        
    });



    //添加错误信息
    function showError(obj, error) {
        $(obj).parent().find(".info").addClass("info-error");
        $(obj).parent().find(".info").find(".inner").html('<p  class="error">' + error + '</p>');
        $(obj).addClass("input-error");
        $(obj).parent().find(".info").show();
    }
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