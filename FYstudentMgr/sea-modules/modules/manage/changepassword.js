define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('bootstrap');
    require('tool');
    require('modules/manage/left-nav.css');
    require('modules/manage/changepassword.css');
    $("input").focus(function () {
        $(this).addClass("input-focus");
        $(this).next(".tip").show();
    });
    $("input").blur(function () {
        $(this).removeClass("input-focus");
        $(this).next(".tip").hide();
    });
    var isfirst1 = 0;
    $("#pwd").blur(function () {
        var error = "";
        var pwd = $(this).val();
        if ($.trim(pwd).length>0) {
           isfirst1=1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "登陆密码不能为空";
        }
        //} else if ("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$".test(pwd) == false) {
        //    error = "登陆密码不符合规范";
        //}
        if (error != "") {
            
            $(this).next("div").addClass("info-error");
            $(this).next("div").find(".inner").html('<p id="pwd-error" class="error">'+error+'</p>');
            if (isfirst1 == 1) {
                $(this).addClass("input-error");
                $(this).next(".info").show();
            }
           
        }
    });
    var isfirst2 = 0;
    $("#newpwd").blur(function () {
        var error = "";
        var pwd = $(this).val();
        var ret = /^(?![0-9]+$)(?![a-z]+$)[0-9a-z]{6,20}$/;
        if ($.trim(pwd).length > 0) {
            isfirst2 = 1;
        }
        if ($.trim(pwd).length <= 0) {
            error = "新密码不能为空";
        } else if (ret.test(pwd) == false) {
            error = "新密码必须是6-20位小写字母和数字";
        }
        if (error != "") {
            
            $(this).next("div").next("div").addClass("info-error");
            $(this).next("div").next("div").find(".inner").html('<p id="newpwd-error" class="error">' + error + '</p>');
            if (isfirst2 == 1) {
                $(this).addClass("input-error");
                $(this).next("div").next("div").show();
            }
        }
    });


    var isfirst3 = 0;
    $("#confirmpwd").blur(function () {
        var error = "";
        var pwd2 = $(this).val();
        var pwd1 = $("#newpwd").val();
        if ($.trim(pwd2).length > 0) {
            isfirst3 = 1;
        }
        if ($.trim(pwd2).length <= 0) {
            error = "确认密码不能为空";
        } else if ($.trim(pwd2)!=$.trim(pwd1)) {
            error = "两次密码不一致";
        }
        if (error != ""  ) {
            
            $(this).next("div").addClass("info-error");
            $(this).next("div").find(".inner").html('<p id="confirmpwd-error" class="error">' + error + '</p>');
            if (isfirst3 == 1) {
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
        $(".strong").find("li").each(function (index,element) {
            if (index < relex) {
                $(element).css("background", "rgb(255, 102, 51)");
            } else {
                $(element).css("background", "rgb(238, 238, 238)");
            }
        });
    }

    $("#newpwd").focus(function () {
        $(this).removeClass("input-error");
        
        $(this).parent().find(".info").removeClass("info-error");
        $(this).parent().find(".info").hide();
        
    });
    $("#confirmpwd").focus(function () {
        $(this).removeClass("input-error");
        $(this).parent().find(".info").removeClass("info-error");
        $(this).parent().find(".info").hide();
        
    });
    $("#pwd").focus(function () {
        $(this).removeClass("input-error");
        $(this).parent().find(".info").removeClass("info-error");
        $(this).parent().find(".info").hide();
    });

    $("#submit").click(function () {
        $("#newpwd").blur();
        $("#pwd").blur();
        $("#confirmpwd").blur();
        var errorlist = $(".info-error");
        //console.trace(errorlist);
        if (errorlist.length > 0) {
            errorlist.each(function (index,element) {
                $(element).show();
                $(element).parent().find("input").addClass("input-error");
            });
            return false;
        }
    });
});