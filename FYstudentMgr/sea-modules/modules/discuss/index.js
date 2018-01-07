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
    var id_array,title,discussid;
    
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
            $.post("/Discuss/CheckAll", { "idlist": id_array }, function (msg) {
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

    //批量删除文章
    $("#btnDelSelect").click(function () {
       
        $.post("/Discuss/DelSelect", { idlist: id_array }, function (msg) {
            //alert(msg);
            location.reload();
        });
    });

    //点击每一行的删除按钮弹出对话框
    exports.showDel = function (self) {
         title = $(self).parent().parent().find("td:eq(3)").find("a:first").text();
         discussid = $(self).parent().parent().find("td:eq(0)").find("input").val();
        //alert(articleid);
        $('#deltitle').text(title);       
        $('#deletePopup').modal("show");
    }
    window.showDel = exports.showDel;

    //删除问题
    $("#btnDelDiscuss").click(function () {
        $.post("/Discuss/Del", { "id": discussid }, function (msg) {
            if (msg == 'error') {
                alert("删除失败，请重试！");
                location.reload;
            } else {
                location.reload;
            }

        });
    });
});