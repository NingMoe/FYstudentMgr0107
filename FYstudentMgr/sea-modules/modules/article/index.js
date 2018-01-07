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
    exports.showSubject = function () {
        $('#subjectPopup').modal("show");
    }
    window.showSubject = exports.showSubject;

    $("#btnCreateArticle").click(function () {
        var subjectid=$('#SubjectID option:selected').val();
        location.href = "/Article/Create/" + subjectid;
    });
    $("#checkall").click(function () {
        var ischecked = this.checked;
        $("input:checkbox[name='check']").each(function () {
            this.checked = ischecked;
        });
    });


    //点击全选删除按钮弹出提示框
    $("#DelAll").click(function () {
        var id_array = new Array();
        $('input:checkbox[name="check"]:checked').each(function () {
            id_array.push($(this).val());//向数组中添加元素  
        });
        var idstr = id_array.join(',');//将数组元素连接起来以构建一个字符串  
        $('#delidstr').text(idstr);
        $('#delSelectPopup').modal("show");
    });


    //点击已核按钮
    $("#CheckAll").click(function () {
        var id_array = [];
        $('input:checkbox[name="check"]:checked').each(function () {
            id_array.push(parseInt($(this).val()));//向数组中添加元素  
        });
        
        if (id_array.length > 0) {
            $.post("/Article/CheckAll", { "idlist": id_array }, function (msg) {
                if (msg == "ok") {
                    alert("审核成功！");
                    location.reload();
                }
            });
        }
       
    });

    //批量删除文章
    $("#btnDelSelect").click(function () {
        var idstr = $('#delidstr').text();
        //alert(idstr);
        $.post("/Article/DelSelect", { idstring: idstr }, function (msg) {
            //alert(msg);
            location.reload();
        });
    });

    //点击每一行的删除按钮弹出对话框
    exports.showDel = function (self) {
        var title = $(self).parent().parent().find("td:eq(3)").find("a:first").text();
        var articleid = $(self).parent().parent().find("td:eq(0)").find("input").val();
        //alert(articleid);
        $('#deltitle').text(title);
        $("#btnDelArticle").attr("data-articleid", articleid);
        $('#deletePopup').modal("show");
    }
    window.showDel = exports.showDel;

    //删除文章
    $("#btnDelArticle").click(function () {
        var articleid = $(this).attr("data-articleid");
        $.post("/Article/Del", { "id": articleid }, function (msg) {
            if (msg == 'error') {
                alert("删除失败，请重试！");
                location.reload;
            } else {
                location.href = "/Article/Index/";
            }

        });
    });
});