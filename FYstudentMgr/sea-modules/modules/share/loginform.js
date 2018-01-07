define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var iscode = false;
    var errorCount = 0;
    var InterValObj; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount;//当前剩余秒数
    $("body").on("click", ".fastLogin", function () {
        $(".loginbg").show();
        return false;
    });
   
    $(".fastRegister").click(function () {
        $(".loginbg").show();
        $('#login_form form').animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'slow');
        return false;
    });
    $(".loginclose").click(function () {
        $(".loginbg").hide();
    });
    //显示错误消息
    function logerror(msg){
        $(".message_error").html(msg);
    }
    function logcancel() {
        $(".message_error").html("");
    }

    //窗口抖动函数
    function shake() {
        $("#login_form").removeClass('shake_effect');
        setTimeout(function () {
            $("#login_form").addClass('shake_effect')
        }, 0.5);
    }

    //换一换验证码
    $(".captcha").click(function () {
        $(".captcha").attr("src", "/Account/GetAuthCode?time=" + Math.random());
    });


    
    var has_r_uname=0;
    $("#r_user_name").blur(function () {
        var error = "";
        var value = $(this).val();
        var ret = /^1[34578]{1}\d{9}$/;
        if ($.trim(value).length > 0) {
            has_r_uname = 1;
        }
        if (has_r_uname == 1) {
            if (value=="") {
                error = "请输入手机号";
            } else if (ret.test(value) == false) {
                error = "手机号不符合规范";
            } else {
                $.ajax({
                    type: "post",
                    url: "/account/CheckUserName",
                    data: { "userName": value },
                    async: false,//取消异步  
                    success: function (data) {
                        if (data == false) {
                            error = "该手机号已经被注册！";
                        }
                    }
                });             
            }
            if(error!=""){
                showError(this, error);
            }
        }
        
    });

    var has_res_imgcode = 0;
    $("#register_imgcode").blur(function () {
        var error = "";
        var value = $(this).val();
        if ($.trim(value).length > 0) {
            has_res_imgcode = 1;
        }
        if (has_res_imgcode == 1) {
            if ($.trim(value).length <= 0) {
                error = "请输入验证码";
            }
            if (error != "") {
                showError(this, error);
            }
        }          
    });


    //发送手机验证码按钮事件
    $("#r_code").click(function(){
        if (has_r_uname == 0) {
            has_r_uname = 1;
            $("#r_user_name").blur();
        }
        if (has_res_imgcode == 0) {
            has_res_imgcode = 1;
            $("#register_imgcode").blur();
        }
        
        if (checkError() == false) {
            return false;
        }
        var btn = this;
        var code = $("#register_imgcode").val();
        var phonenumber = $("#r_user_name").val();
        $(btn).attr("disabled", true);
        $.post("/account/sendphonecode", { "code": code, "number": phonenumber }, function (msg) {
            if (msg == "codeerror") {
                $(btn).attr("disabled", false);
                $(".captcha").click();
                showError(document.getElementById("register_imgcode"), "验证码错误");
            } else if (msg=="ok") {
                // alert(1111);
                curCount = count;
                //设置button效果，开始计时
                $(btn).addClass("btn-mark-disable");
                
                $(btn).text("已发送(" + curCount + "S)");
                InterValObj = window.setInterval(function () { SetRemainTime(btn) }, 1000); //启动计时器，1秒执行一次
            } else if (msg == "found") {
                $(btn).attr("disabled", false);
                $(".captcha").click();
                showError(document.getElementById("r_user_name"), "该手机号已经被注册！");
            }
        });

    });

    //短信验证码框校验
    var has_r_phonecode = 0;
    $("#register_code").blur(function () {
        var error = "";
        var pwd = $(this).val();
        if ($.trim(pwd).length > 0) {
            has_r_phonecode = 1;
        }
        if (has_r_phonecode == 1) {
            if ($.trim(pwd).length <= 0) {
                error = "短信验证码不能为空";
            }
            if (error != "") {
                showError(this, error);
            }
        }
    });

    //注册密码框校验
    var has_r_pwd = 0;
    $("#r_password").blur(function () {
        var error = "";
        var pwd = $(this).val();
        var ret = /^(?![0-9]+$)(?![a-z]+$)[0-9a-z]{6,20}$/;
        if ($.trim(pwd).length > 0) {
            has_r_pwd = 1;
        }
        if (has_r_pwd == 1) {
            if ($.trim(pwd).length <= 0) {
                error = "密码不能为空";
            } else if (ret.test(pwd) == false) {
                error = "密码6-20位，必须包含小写字母和数字";
            }
            if (error != "") {
                showError(this, error);
            }
        }            
    });

    //注册密码确认框校验
    var has_r_conpwd = 0;
    $("#r_rep_password").blur(function () {
        var error = "";
        var pwd2 = $(this).val();
        var pwd1 = $("#r_password").val();
        if ($.trim(pwd2).length > 0) {
            has_r_conpwd = 1;
        }
        if (has_r_conpwd == 1) {
            if ($.trim(pwd2).length <= 0) {
                error = "确认密码不能为空";
            } else if ($.trim(pwd2) != $.trim(pwd1)) {
                error = "两次密码不一致";
            }
            if (error != "") {
                showError(this, error);
            }
        }
       
       
    });

    //登录手机号框校验
    var has_uname = 0;
    $("#user_name").blur(function () {
        var error = "";
        var pwd = $(this).val();
        if ($.trim(pwd).length > 0) {
            has_uname = 1;
        }
        if (has_uname == 1) {
            if ($.trim(pwd).length <= 0) {
                error = "手机号不能为空";
            }
            if (error != "") {
                showError(this, error);
            }
        }
    });

    //登录密码框校验
    var has_pwd = 0;
    $("#password").blur(function () {
        var error = "";
        var pwd = $(this).val();
        if ($.trim(pwd).length > 0) {
            has_pwd = 1;
        }
        if (has_pwd == 1) {
            if ($.trim(pwd).length <= 0) {
                error = "密码不能为空";
            }
            if (error != "") {
                showError(this, error);
            }
        }
    });
    
    //登录密码框校验
    var has_l_imgcode = 0;
    $("#login_code").blur(function () {
        var error = "";
        var pwd = $(this).val();
        if ($.trim(pwd).length > 0) {
            has_l_imgcode = 1;
        }
        if (has_l_imgcode == 1) {
            if ($.trim(pwd).length <= 0) {
                error = "验证码不能为空";
            }
            if (error != "") {
                showError(this, error);
            }
        }
    });

    //登录函数
    function check_login() {
        var name = $.trim($("#user_name").val());
        var pass = $("#password").val();
        var code = $("#login_code").val();
        if (has_uname == 0) {
            has_uname = 1;
            $("#user_name").blur();
        }
        if (has_pwd == 0) {
            has_pwd = 1;
            $("#password").blur();
        }       
        var error = "";
        if (iscode) {
            if (has_l_imgcode == 0) {
                has_l_imgcode = 1;
                $("#login_code").blur();
            }          
        }
        if (checkError() == false) {
            return false;
        }

        var model = {};
        model.UserName = name;
        model.Password = pass;
        model.RememberMe = false;       
        if (iscode) {
            model.Code = code;
        }
        model.__RequestVerificationToken = $("input[name='__RequestVerificationToken']").val();
        $.post("/account/LoginModal", model, function (msg) {
            if (msg == "info_error") {
                logerror("*用户名或密码错误");
                errorCount++;
                if (errorCount == 2) {
                    iscode = true;
                    $("#logcode_wrapper").show();
                }
                shake();
            } else if (msg == "success") {
                
                location.reload();
            } else if (msg == "lock") {
                logerror("*您的账户被锁定，请三小时后再尝试登录");
                shake();
            } else if (msg == "code_error") {
                logerror("*图形验证码错误");
                $(".captcha").click();
                shake();
            }

        });

        //if (name == "sc.chinaz.com" && pass == "sc.chinaz.com") {
        //    alert("登录成功！");
        //    $("#user_name").val("");
        //    $("#password").val("");

        //}
        //else {
        //    shake();
        //}
    }

    //注册函数
    function check_register() {
        if (has_r_uname == 0) {
            has_r_uname = 1;
            $("#r_user_name").blur();
        }
        if (has_r_phonecode == 0) {
            has_r_phonecode = 1;
            $("#register_code").blur();
        }
        if (has_r_pwd == 0) {
            has_r_pwd = 1;
            $("#r_password").blur();
        }
        if (has_r_conpwd == 0) {
            has_r_conpwd = 1;
            $("#r_rep_password").blur();
        }
        
        if (checkError() == false) {
            return false;
        }
        var btn = this;
        var name = $("#r_user_name").val();
        var pass = $("#r_password").val();
        var twopass = $("#r_rep_password").val();
        var code = $("#register_code").val();
        var model = {};
        model.UserName = name;
        model.ValidCode = code;
        model.Password = pass;
        model.ConfirmPassword = twopass;
        model.__RequestVerificationToken = $("input[name='__RequestVerificationToken']").val();
        $.post("/account/registermodal", model, function (msg) {
            if (msg == "ok") {
                location.reload();
            }else  if (msg == "code-error") {
                showError(document.getElementById("register_code"), "短信验证码错误");
                shake();
            }
        });
    }
    $(function () {
        $("#create").click(function () {
            check_register();
            return false;
        })
        $("#login").click(function () {
            check_login();
            return false;
        })
        $('.message a').click(function () {
            $('#login_form form').animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 'slow');
        });
    })

    //添加错误信息
    function showError(obj,error) {
        $(obj).parent().find(".info").addClass("info-error");
        $(obj).parent().find(".info").find(".inner").html('<p  class="error">' + error + '</p>');
        $(obj).addClass("input-error");
        $(obj).parent().find(".info").show();
    }
    //检查是否有错误项
    function checkError() {
        var errorlist = $(".info-error");
        // console.trace(errorlist.length);
        if (errorlist.length > 0) {
            errorlist.each(function (index, element) {
                $(element).show();
                $(element).parent().find("input").addClass("input-error");
            });
            return false;
        } else {
            return true;
        }
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