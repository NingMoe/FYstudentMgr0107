define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('admincss');
    require('font-awesome');
    //require('scoket');
    require('tool');
    //require('progress');
    //require('allRank');
    //var date = require('date');
    var id_array, title, replyid;

    $("#checkall").click(function () {
        var ischecked = this.checked;
        $("input:checkbox[name='check']").each(function () {
            this.checked = ischecked;
        });
    });

    //点击全选删除按钮弹出提示框
    $("#CheckAll").click(function () {
        id_array = [];
        $('input:checkbox[name="check"]:checked').each(function () {
            id_array.push(parseInt($(this).val()));//向数组中添加元素  
        });

        if (id_array.length > 0) {
            $.post("/Reply/CheckAll", { "idlist": id_array }, function (msg) {
                if (msg == "ok") {
                    alert("审核成功！");
                    location.reload();
                }
            });
        }

    });
    //点击全选删除按钮弹出提示框
    $("#DelAll").click(function () {
        id_array = [];
        $('input:checkbox[name="check"]:checked').each(function () {
            id_array.push(parseInt($(this).val()));//向数组中添加元素  
        });
        $('#delSelectPopup').modal("show");
    });

    //批量删除评论
    $("#btnDelSelect").click(function () {

        $.post("/Reply/DelSelect", { idlist: id_array }, function (msg) {
            if (msg == "ok") {
                location.reload();
            } else {
                alert("删除失败，请刷新重试");
            }
            
        });
    });

    //点击每一行的删除按钮弹出对话框
    exports.showDel = function (id,self) {
        title = $(self).prev().prev().find("a:first").text();
        replyid =id;
        //alert(articleid);
        $('#deltitle').text(title);
        $('#deletePopup').modal("show");
    }
    window.showDel = exports.showDel;

    //删除评论
    $("#btnDelReply").click(function () {
        $.post("/Reply/Del", { "id": replyid }, function (msg) {
            if (msg == 'error') {
                alert("删除失败，请重试！");
                location.reload;
            } else {
                location.reload;
            }

        });
    });
});