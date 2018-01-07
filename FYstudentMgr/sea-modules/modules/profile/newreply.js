define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('scoket');
    require('tool');
    //require('progress');
    //require('allRank');
    //var date = require('date');
    //require('chart');
    //全选
    $("#selectAll").click(function () {
        var ischecked = this.checked;
        $("input:checkbox[name='check']").each(function () {
            this.checked = ischecked;
        });
    });
    $("#ReadAll").click(function () {
        var id_array = [];
        $('input:checkbox[name="check"]:checked').each(function () {
            id_array.push(parseInt(this.value));//向数组中添加元素  
        });
        if (id_array.length > 0) {
            $.post("/Profile/ReadAllReply", { list: id_array }, function (msg) {
                if (msg == "ok") {
                    location.reload();
                } else {
                    alert("阅读失败，请重试！");
                }
            });
        }
    });
    $("#DelAll").click(function () {
        var id_array = [];
        $('input:checkbox[name="check"]:checked').each(function () {
            id_array.push(parseInt(this.value));//向数组中添加元素  
        });
        if (id_array.length > 0) {
            $.post("/Profile/DelAllReply", { list: id_array }, function (msg) {
                if (msg == "ok") {
                    location.reload();
                } else {
                    alert("删除失败，请重试！");
                }
            });
        }
    });
});