
define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('scoket');
    require('tool');
    require('modules/profile/profile-edit.css')
    //require('progress');
    //require('allRank');
    var date = require('date');
    //require('chart');
    var userid = $("#data").attr("data-userid");
    var isimg = $("#data").attr("data-img");
    var imgurl;
    if (isimg == "True") {
        imgurl = "http://img.xueqitian.com/avatar50/" + userid + ".jpg";
    } else {
        imgurl = "/content/assert/avatar/default50.jpg";
    }
    var i = 0;
    $(".feedtime").each(function () {
        var time = $(this).text();
        $(this).text(date.countNow(time));
    });

    var pageNewsFeed = 1;
    var userid = $("#ulNewsFeed").attr("data-userid");
    $(".title").click(function () {
        if ($(this).find(".preview").css("display") != "none") {
            $(this).nextAll(".holder").slideDown();
            $(this).find(".preview").hide();
            $(this).next(".edit-label").removeClass().addClass("edit-label-open");
        } else {
            $(this).nextAll(".holder").slideUp();
            $(this).find(".preview").show();
            $(this).next(".edit-label-open").removeClass().addClass("edit-label");

            $(this).find("img").attr("src", imgurl);
            //location.reload();
        }
        
   
    });

    //更新个人信息
    $("#btnUpdate").click(function () {
        var docUser = {};
        docUser.name = $.trim($("#txtName").val());
        docUser.gender = "男" === $("#selGender>option:selected").val();
        docUser.birthday = new Date($("#txtBirthday").val());
        $.post("/user/update", docUser, function (msg) {
            location.reload();
        });
    });

    //验证第一次密码
    $("#txtPwd1").focus(function () {
        var pwd1 = $("#txtPwd1").val();
        if (pwd1.length < 6 || pwd1.length > 16) {
            $("#txtPwd1").next().show();
        }
    });
    $("#txtPwd1").keyup(function () {
        var pwd1 = $("#txtPwd1").val();
        var pwd2 = $("#txtPwd2").val();
        if (pwd1.length >= 6 && pwd1.length <= 16) {
            $("#txtPwd1").next().hide();
            if ("" !== pwd2) {
                if (pwd1 !== pwd2) {
                    $("#txtPwd2").next().show();
                    $("#btnSetPwd").attr("disabled", true);
                } else {
                    //成功的情况
                    $("#txtPwd2").next().hide();
                    $("#btnSetPwd").attr("disabled", false);
                    $("#btnSetPwd").focus();
                }
            } else {
                $("#btnSetPwd").attr("disabled", true);
            }
        } else {
            $("#txtPwd1").next().show();
        }
    });

    //验证第二次密码
    $("#txtPwd2").focus(function () {
        var pwd1 = $("#txtPwd1").val();
        var pwd2 = $("#txtPwd2").val();
        if ("" === pwd2 || pwd1 !== pwd2) {
            $("#txtPwd2").next().show();
        }
    });
    $("#txtPwd2").keyup(function () {
        $("#txtPwd1").keyup();
    });

    //更改密码
    $("#btnSetPwd").click(function () {
        var pwd = $("#txtPwd").val();
        var pwd1 = $("#txtPwd1").val();
        var pwd2 = $("#txtPwd2").val();
        if (pwd2.length >= 6 && pwd2.length <= 16 && pwd1 === pwd2) {
            $("#btnSetPwd").button("loading");
            var obj = {};
            if (typeof pwd === 'undefined') {
                obj = { "pwd2": faultylabs.MD5(pwd2) };
            } else {
                obj = { "pwd": faultylabs.MD5(pwd), "pwd2": faultylabs.MD5(pwd2) };
            }
            $.post("/user/resetPwd/pwd", obj, function (msg) {
                if ("pwdWrong" === msg) {
                    $("#txtPwd").next().show();
                } else if ("ok" === msg) {
                    location.reload();
                }
                $("#btnSetPwd").button("reset");
            });
        } else {
            $("#txtPwd2").keyup();
        }
    });

    //倒数60秒重新发送
    function countDown60(s, idBtn) {
        if (s === 1) {
            $("#" + idBtn).attr("disabled", false);
            $("#" + idBtn).text("获取验证码");
            return;
        }
        if ($("#" + idBtn).text() !== "验证成功") {
            s = s - 1;
            $("#" + idBtn).text(s + "秒后重新发送");
            setTimeout("countDown60(" + s + ", '" + idBtn + "')", 1000);
        }
    }
    //发送手机验证码
    $("#btnSendPhoneCode").click(function () {
        $(this).attr("disabled", "disabled");
        $(this).text("60秒后重新发送");
        var phone = $.trim($("#txtBindPhone").val());
        var reverse = phone.substr(0, 3) + phone.substr(7, 4) + phone.substr(3, 4);
        $.post("/user/sendCode/phone", { "phone": phone, "check": "20161115", "reverse": reverse }, function (msg) {
            if (msg === "ok") {
                $("#btnSendPhoneCode").next().text("短信已成功发送，预计将于1分钟内到达");
            } else if (msg === "outCount") {
                $("#btnSendPhoneCode").next().text("今日发送短信数量太多，如有需要请联系网站管理员！");
            } else {
                $("#btnSendPhoneCode").next().text("啊哦！短信系统好像发生故障了，发送失败……");
            }
            $("#btnSendPhoneCode").next().show();
        });
        setTimeout("countDown60(60, 'btnSendPhoneCode')", 1000);
    });
    //绑定手机
    $("#btnBindPhone").click(function () {
        $(this).button("loading");
        $.post("/user/bind/phone", { "phone": $.trim($("#txtBindPhone").val()), "code": $.trim($("#txtPhoneCode").val()) }, function (msg) {
            $("#btnBindPhone").button("reset");
            if ("ok" === msg) {
                alert("绑定成功");
                location.reload();
            } else if ("found" === msg) {
                alert("您的手机号绑定了其它账号，且两个账号都有还未毕业的课程，无法绑定。请毕业后再试，或联系客服进行绑定");
                location.reload();
            } else if ("codeWrong" === msg) {
                alert("验证码不正确");
                location.reload();
            } else if ("fmtWrong" === msg) {
                alert("手机号格式不正确");
            } else {
                alert("未知错误，请稍后再试，或联系客服进行绑定");
            }
        });
    });
    //发送邮箱验证码
    $("#btnSendEmailCode").click(function () {
        $(this).attr("disabled", "disabled");
        $(this).text("60秒后重新发送");
        var email = $.trim($("#txtBindEmail").val());
        $.post("/user/sendCode/email", { "email": email }, function (msg) {
            if (msg === "ok") {
                $("#btnSendEmailCode").next().text("验证码已成功发送，预计将于1分钟内到达");
            } else {
                $("#btnSendEmailCode").next().text("啊哦！短信系统好像发生故障了，发送失败……");
            }
            $("#btnSendEmailCode").next().show();
        });
        setTimeout("countDown60(60, 'btnSendEmailCode')", 1000);
    });
    //绑定邮箱
    $("#btnBindEmail").click(function () {
        $(this).button("loading");
        $.post("/user/bind/email", { "email": $.trim($("#txtBindEmail").val()), "code": $.trim($("#txtEmailCode").val()) }, function (msg) {
            $("#btnBindEmail").button("reset");
            if ("ok" === msg) {
                alert("绑定成功");
                location.reload();
            } else if ("found" === msg) {
                alert("您的邮箱绑定了其它账号，且两个账号都有还未毕业的课程，无法绑定。请毕业后再试，或联系客服进行绑定");
                location.reload();
            } else if ("codeWrong" === msg) {
                alert("验证码不正确");
                $("#txtEmailCode").val("");
                $("#txtEmailCode").focus();
            } else if ("fmtWrong" === msg) {
                alert("邮箱格式不正确");
            } else {
                alert("未知错误，请稍后再试，或联系客服进行绑定");
            }
        });
    });
    //绑定QQ
    $("#btnBindQQ").click(function () {
        QC.Login.signOut();
        QC.Login.showPopup({
            appId: "100232402",
            redirectURI: "http://www.kejuwang.com/user/connect/qq"
        });
        QC.api("get_user_info", {})
        .success(function (doc) {
            if (QC.Login.check()) {
                QC.Login.getMe(function (openId, accessToken) {
                    var docQQ = { idQQ: openId, name: doc.data.nickname };
                    docQQ.gender = doc.data.gender === "男";
                    docQQ.avatar = doc.data.figureurl_2;
                    docQQ.avatar50 = doc.data.figureurl_1;
                    $.post("/user/bind/qq", docQQ, function (msg) {
                        if ("ok" === msg) {
                            alert("绑定成功");
                            location.reload();
                        } else if ("found" === msg) {
                            alert("您的QQ绑定了其它账号，且两个账号都有还未毕业的课程，无法绑定。请毕业后再试，或联系客服进行绑定");
                            location.reload();
                        } else {
                            alert("未知错误，请稍后再试，或联系客服进行绑定");
                        }
                        location.reload();
                    });
                });
            } else {
                alert("QQ登录失败，请联系网站客服");
            }
        })
        .error(function () {
            alert("QQ登录失败，请联系网站客服");
        });
    });
    //绑定微信
    var obj = new WxLogin({
        id: "qrWeixin",
        appid: "wxf7076aa15de935f4",
        scope: "snsapi_login",
        redirect_uri: "http://www.kejuwang.com/user/connect/weixin",
        state: "3d6be0a4035d839573b04816624a415e",
        style: "",
        href: ""
    });

});