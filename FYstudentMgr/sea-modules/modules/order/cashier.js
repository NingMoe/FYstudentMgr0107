define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('modules/order/cashier.css');
    require('bootstrap');
    var orderid, isok = 0,payment,payid=0;
    exports.init = function (id,account) {
        orderid = id;
        payment = account;
    }
    $(".entrance").click(function () {
        $(".entrance").each(function(index,element){
            $(element).removeClass("active");
        });
        $(this).addClass("active");
        payid = $(this).attr("data-payid");
    });


    $(".paynow").click(function () {

        if (payid == 0) {
            action = "/order/gotopay";
            form = $("<form></form>");
            form.attr('action', action);
            form.attr('target', "_blank");
            form.attr('method', 'post');
            input1 = $("<input type='hidden' name='id' />");
            input1.attr('value', orderid);
            
            form.append(input1);
            
            form.appendTo("body");
            form.css('display', 'none');
            form.submit();
            $("#modalPayConfirm").modal("show");
        }
    });
});