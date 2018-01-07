define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('font-awesome');
    var idUser = $('#kj_usermenu').attr('data-userid');
    //console.trace(idUser);
    if (idUser>=0) {
        getNewNotice();
        var intervalNotice = setInterval(getNewNotice, 30000);
    }else{
        require.async("loginform");
        require.async("logincss");
    }
   
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $("#btnBackToTop").show();
        } else {
            $("#btnBackToTop").hide();
        }
    });
    $("#btnBackToTop").click(function () {
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    });
    var mynum=0;
    
    
    function getNewNotice() {

      

        $.post("/Profile/GetNoticeNum", function (num,status) {
            //alert(num);
            //alert(status);
            if (num == "" || num == undefined || num == null) {
                 location.href = "http://www.xueqitian.com";
            }

           if (num == -1) {
                alert("您的账户在其他地方登录，被迫下线！");                
                document.getElementById('logoutForm').submit();
                
            }else if (num == 0) {
                $("#noticeNum").hide();
            } else if (num > 0) {
                $("#noticeNum").show();
               $("#noticeNum").text(num);
            }
            
        });
    }
});