define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var validator = require('validator');
    var unob = require('unobtrusive');
    var boot = require('bootstrap');
    var pass = require('password');

    $("#switchCode").click(function () {
        $("#imgcode").attr("src", "/Account/GetAuthCode?time=" + Math.random());
    });
    $(function () {
        $('form').bind('submit', checkform);
    });

    function checkform() {
        //var code = $("#ValidCode").val();
        //alert(code);
    }

    $(function () {
        $('#password').password().on('show.bs.password', function (e) {
            $('#eventLog').text('On show event');
            $('#methods').prop('checked', true);
        }).on('hide.bs.password', function (e) {
            $('#eventLog').text('On hide event');
            $('#methods').prop('checked', false);
        });
        $('#confirmpassword').password().on('show.bs.password', function (e) {
            $('#eventLog').text('On show event');
            $('#methods').prop('checked', true);
        }).on('hide.bs.password', function (e) {
            $('#eventLog').text('On hide event');
            $('#methods').prop('checked', false);
        });
    });
});