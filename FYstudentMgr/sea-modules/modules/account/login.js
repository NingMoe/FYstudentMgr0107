define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var validator = require('validator');
    var unob = require('unobtrusive');
    var boot = require('bootstrap');
    var pass = require('password');

    $(function () {
        $('#password').password().on('show.bs.password', function (e) {
            $('#eventLog').text('On show event');
            $('#methods').prop('checked', true);
        }).on('hide.bs.password', function (e) {
            $('#eventLog').text('On hide event');
            $('#methods').prop('checked', false);
        });

    });
});