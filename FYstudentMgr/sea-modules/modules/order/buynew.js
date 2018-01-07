define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('modules/order/buynew.css');
    require('bootstrap');
  
    var classid,isok=0;
    exports.init = function (id) {
        classid = id;
    }

    $(".coupon-item-active").hover(function () {
        $(".coupontip").show();
    }, function () {
        $(".coupontip").hide();
    });
    var isopen = 0;
    $(".coupon-content").click(function () {
        CleanModal();
        //console.trace(userid);
        
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
            location.reload();
            return false;
        }
        $.post("/Course/ReceiveCoupon/" + classid, { "code": code }, function (msg) {
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
    isfirst2 = 0;
    $(".phone-input").blur(function () {
        var error = "";
        var pwd = $(this).val();
        var errormsg = $(this).next(".error-desc");
        if ($.trim(pwd).length > 0) {
            isfirst2 = 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "*手机号不能为空";
        }
        else if (/^1(3|4|5|7|8)\d{9}$/.test(pwd) == false) {
            error = "*请输入正确的手机号码";
        }
        if (error != "") {
            isok = 1;
            errormsg.text(error);
            if (isfirst2 == 1) {
                errormsg.show();
            }
            
        }
    });

    $(".phone-input").focus(function () {
        isok = 0;
        var errormsg = $(this).next(".error-desc");
        errormsg.hide();
    });

    $(".J_submit").click(function () {
        $(this).attr('disabled', true);
        var doc = {};
        doc.UserID = $("#userid").attr("data-uid");
        doc.ClassID = $("#classid").attr("data-cid");
        doc.UserCouponID = $("#zheid").attr("data-zid");
        doc.DaiJinID = $("#daiid").attr("data-did");
        doc.XueBi = $("#xuebi").attr("data-xuebi");
        doc.Phone = $(".J_phoneInput").val();
        $.post("/order/generateOrder", doc, function (data) {
            if (data.status == "ok") {
                location.href = "/order/cashier/" + data.message;
            } else if (data.status == "again") {
                alert("该订单已存在，无需重复创建");
                location.href = "/manage/orderlist/";
            }
            else{
                $(this).removeAttr('disabled');
                alert("生成订单失败，请重试！");
            }
                
            
        });
    });

});