define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('bootstrap');
    require('tool');
    require('modules/manage/left-nav.css');
    require('modules/manage/pwdresetmobile.css');
   
    var resetcode;
    var phonenumber="";

    var has_r_uname = 0;
    $("#mobile").blur(function () {
        var error = "";
        phonenumber = $(this).val();
        var ret = /^1[34578]{1}\d{9}$/;
        if ($.trim(phonenumber).length > 0) {
            has_r_uname = 1;
        }
        if (has_r_uname == 1) {
            if (phonenumber == "") {
                error = "请输入手机号";
            } else if (ret.test(phonenumber) == false) {
                error = "手机号不符合规范";
            } else {
                $.ajax({
                    type: "post",
                    url: "/account/CheckPhoneNumber",
                    data: { "number": phonenumber },
                    async: false,//取消异步  
                    success: function (data) {
                        if (data == false) {
                            error = "手机号没有绑定任何用户！";
                        }
                    }
                });
            }
            if (error != "") {
                showError(this, error);
            }
        }

    });
    //填写短信验证码后点击下一步按钮
    $(".step-1 .step1-next").click(function () {
        if (has_r_uname == 0) {
            has_r_uname = 1;
            $("#mobile").blur();
        }
        $("#imgcode").blur();
        $("#msgcode").blur();
        var errorlist = $(".info-error");
        console.trace(errorlist.length);
        if (errorlist.length > 0) {
            errorlist.each(function (index, element) {
                $(element).show();
                $(element).parent().find("input").addClass("input-error");
            });
            return false;
        }
        var code = $("#msgcode").val();
        var url = "/account/resetmobilestep1";
        $.post(url, {"msgcode":code, "number": phonenumber}, function (data) {
            if (data.substr(0,4)=="code") {
                resetcode = data.substr(4);
                $(".step1-nav").removeClass("step-active");
                $(".step1-nav").addClass("item-active");
                $(".step1-nav .step").text("");
                $(".step2-nav").addClass("step-active");
                $(".step2-nav .step").addClass("step-nav-active");
                $(".step-1").hide();
                $(".step-2").show();
            } else {
                $("#msgCodePopup").modal("show");
                $(".imark").click();
            }
        });
       
    });
    //点击刷新验证码
    $(".imark").click(function () {
        $("#captcha").attr("src", "/Account/GetAuthCode?time=" + Math.random());
    });

    var InterValObj; //timer变量，控制时间
    var count =60; //间隔函数，1秒执行
    var curCount;//当前剩余秒数


    //点击获取短信验证码按钮
    $("#getcode").click(function () {
        if (has_r_uname == 0) {
            has_r_uname = 1;
            $("#mobile").blur();
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
        var code=$("#imgcode").val();
        $.post("/account/verifycode", { "code": code, "number": phonenumber }, function (msg) {
            if (msg == "codeerror") {
                $(".imark").click();
                $("#imgcode").parent().find(".info").addClass("info-error");
                $("#imgcode").parent().find(".info").find(".inner").html('<p id="imgcode-error" class="error">验证码错误</p>');
                $("#imgcode").addClass("input-error");
                $("#imgcode").parent().find(".info").show();
            } else if (msg=="ok") {
               // alert(1111);
                curCount = count;
                //设置button效果，开始计时
                $(codebtn).addClass("btn-mark-disable");
                $(codebtn).attr("disabled", true);
                $(codebtn).text("已发送(" + curCount + "S)");
                InterValObj = window.setInterval(function () { SetRemainTime(codebtn) }, 1000); //启动计时器，1秒执行一次
            }
        });
    });


    function SetRemainTime(obj) {
        if (curCount == 0) {
            window.clearInterval(InterValObj);//停止计时器
            $(obj).removeAttr("disabled");
            $(obj).removeClass("btn-mark-disable");//启用按钮
            $(obj).text("重发验证码");
        }
        else {
            curCount--;
            $(obj).text("已发送(" + curCount + "S)");
        }
    }

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
    $("#msgcode").keyup(function () {
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


    $("#msgcode").blur(function () {
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
    var isfirst3 = 0;
    $("#newpwd").blur(function () {
        var error = "";
        var pwd = $(this).val();
        var ret = /^(?![0-9]+$)(?![a-z]+$)[0-9a-z]{6,20}$/;
        if ($.trim(pwd).length > 0) {
            isfirst3 = 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "新密码不能为空";
        } else if (ret.test(pwd) == false) {
            error = "新密码必须是6-20位小写字母和数字";
        }
        if (error != "") {

            $(this).next("div").next("div").addClass("info-error");
            $(this).next("div").next("div").find(".inner").html('<p id="newpwd-error" class="error">' + error + '</p>');
            if (isfirst3 == 1) {
                $(this).addClass("input-error");
                $(this).next("div").next("div").show();
            }
        }
    });


    var isfirst4 = 0;
    $("#renewpwd").blur(function () {
        var error = "";
        var pwd2 = $(this).val();
        var pwd1 = $("#newpwd").val();
        if ($.trim(pwd2).length > 0) {
            isfirst4 = 1;
        }
        if ($.trim(pwd2).length <= 0) {
            error = "确认密码不能为空";
        } else if ($.trim(pwd2) != $.trim(pwd1)) {
            error = "两次密码不一致";
        }
        if (error != "") {

            $(this).next("div").addClass("info-error");
            $(this).next("div").find(".inner").html('<p id="confirmpwd-error" class="error">' + error + '</p>');
            if (isfirst4 == 1) {
                $(this).addClass("input-error");
                $(this).next(".info").show();
            }

        }
    });

    $("#newpwd").keyup(function () {
        var strongRegex = new RegExp("^(?=.{12,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        var enoughRegex = new RegExp("(?=.{6,}).*", "g");
        var text = $.trim($(this).val());
        var relex;
        if (false == enoughRegex.test(text)) {
            relex = 0;
            //$('#div2').addClass('ruox');
            //$('#passstrength').html('小于六位的时候'); //密码小于六位的时候，密码强度图片都为灰色
        }
        else if (strongRegex.test(text)) {
            relex = 3;
            // $('#div2').removeClass('zhong');
            // $('#div2').addClass('qiang');
            //$('#passstrength').html('强!'); //密码为八位及以上并且字母数字特殊字符三项都包括
        }
        else if (mediumRegex.test(text)) {
            relex = 2;
            //$('#div2').removeClass('ruo');
            // $('#div2').addClass('zhong');
            //$('#passstrength').html('中!'); //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
        }
        else {
            relex = 1;
            //$('#div2').removeClass('ruox');
            //$('#div2').addClass('ruo');
            //$('#passstrength').html('弱!'); //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的
        }
        showRelex(relex);
        return true;
    });

    //显示密码强度
    function showRelex(relex) {
        $(".strong").find("li").each(function (index, element) {
            if (index < relex) {
                $(element).css("background", "rgb(255, 102, 51)");
            } else {
                $(element).css("background", "rgb(238, 238, 238)");
            }
        });
    }
    var InterValObj2;
    var count2 = 5; //间隔函数，1秒执行
    var curCount2;//当前剩余秒数

    $(".step2-next").click(function () {
        $("#newpwd").blur();
       
        $("#renewpwd").blur();
        var errorlist = $(".info-error");
        //console.trace(errorlist);
        if (errorlist.length > 0) {
            errorlist.each(function (index, element) {
                $(element).show();
                $(element).parent().find("input").addClass("input-error");
            });
            return false;
        }
        var newpwd = $("#newpwd").val();
        var renewpwd = $("#renewpwd").val();
        var code = $("#msgcode").val();
        $.post("/account/resetmobilestep2", { "NewPassword": newpwd, "ConfirmPassword":renewpwd,"Code": resetcode, "number": phonenumber }, function (msg) {
            if (msg == "ok") {
                curCount2 = count2;
                $("#goindex").text("去首页(" + curCount2 + "S)");
                InterValObj2 = window.setInterval(function () {
                    if (curCount2 == 0) {
                        window.clearInterval(InterValObj2);//停止计时器
                        location.href = "/course/index";
                      
                    }
                    else {
                        curCount2--;
                        $("#goindex").text("去登录(" + curCount2 + "S)");
                    }
                }, 1000); //启动计时器，1秒执行一次
                $("#SuccessPopup").modal("show");
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
    //添加错误信息
    function showError(obj, error) {
        $(obj).parent().find(".info").addClass("info-error");
        $(obj).parent().find(".info").find(".inner").html('<p  class="error">' + error + '</p>');
        $(obj).addClass("input-error");
        $(obj).parent().find(".info").show();
    }

});