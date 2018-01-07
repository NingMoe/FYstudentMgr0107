define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('bootstrap');
    require('tool');
    require('date');
    require('datepickercss');
    require('datepicker');
    require('datepicker-zn');
    require('modules/manage/left-nav.css');
    require('modules/manage/info.css');
   
    //var isimg = $("#data").attr("data-img");
    //var imgurl;
    //if (isimg == "True") {
    //    imgurl = "http://img.xueqitian.com/avatar50/" + userid + ".jpg";
    //} else {
    //    imgurl = "/content/assert/avatar/default50.jpg";
    //}
    //$("#profile").find("img").attr("src", imgurl);
    $(".btn-modify").click(function () {
        $("#profile").hide();
        $("#profile-modify").show();
       
    });
    $('#birthday').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
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

    $("#name").blur(function () {
        var error = "";
        var pwd = $(this).val();
        if ($.trim(pwd).length >=11) {
            error = "姓名不能超过10个字";
        }
        //} else if ("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$".test(pwd) == false) {
        //    error = "登陆密码不符合规范";
        //}
        if (error != "") {

            $(this).parent().find(".info").addClass("info-error");
            $(this).parent().find(".info").find(".inner").html('<p id="imgcode-error" class="error">' + error + '</p>');
            
                $(this).addClass("input-error");
                $(this).parent().find(".info").show();
            

        }
    });
    $("#signature").blur(function () {
        var error = "";
        var pwd = $(this).val();
        if ($.trim(pwd).length > 20) {
            error = "签名不能超过20个字";
        }
        //} else if ("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$".test(pwd) == false) {
        //    error = "登陆密码不符合规范";
        //}
        if (error != "") {

            $(this).parent().find(".info").addClass("info-error");
            $(this).parent().find(".info").find(".inner").html('<p id="imgcode-error" class="error">' + error + '</p>');

            $(this).addClass("input-error");
            $(this).parent().find(".info").show();


        }
    });
    $(".iradio_flat-hujiang ").click(function () {
        $(".iradio_flat-hujiang ").each(function (index, element) {
            $(element).removeClass("checked");
        });
        $(this).addClass("checked");
    });

    $(".btn-save").click(function () {
        $("#name").blur();
        $("#signature").blur();
        var errorlist = $(".info-error");
        // console.trace(errorlist.length);
        if (errorlist.length > 0) {
            errorlist.each(function (index, element) {
                $(element).show();
                $(element).parent().find("input").addClass("input-error");
            });
            return false;
        }
        var name = $.trim($("#name").val());
        var signature = $.trim($("#signature").val());
        var birthday = $("#birthday").val();
        var sex = $(".iradio_flat-hujiang.checked").find("input").val();
        if (name == '' && signature == '' && birthday == '') {
            msgbox("请填写内容");
            return false;
        }
        $.post("/manage/ModifyInfo", { "name": name, "signature": signature, "birthday": birthday, "sex": sex }, function (msg) {
            if (msg == "ok") {
                location.href = "/manage/info";
            }
        });
    });

    function msgbox(info) {
        $("#msg-info").text(info);
        $("#msgPopup").modal("show");
    }
});