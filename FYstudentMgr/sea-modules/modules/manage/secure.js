
define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('bootstrap');
    require('tool');
    require('modules/manage/left-nav.css');
    require('modules/manage/secure.css');

    exports.init = function (msg) {
        $(document).ready(function () {
            if (msg != "") {
                $("#msg-info").text(msg);
                $("#msgPopup").modal("show");
            }
        });
    }
});