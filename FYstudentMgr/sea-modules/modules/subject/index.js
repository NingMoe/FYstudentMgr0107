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
    var idAdd,sort;
    var UE = require('ueditor');
    var option = {
        //initialContent: noteContent,
        initialFrameHeight: 200,
        //initialContent: "在这里输入您的问题的详细内容",
        toolbars: [[
        'fullscreen', 'insertcode', '|', 'bold', 'italic', 'underline', 'forecolor', 'backcolor', 'removeformat', '|', 'emotion', 'link', 'simpleupload', 'insertvideo', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'undo', 'redo'
        ]]
    };
    


    //删除模块对话框
    exports.showDelSubject = function (self) {
        var id=$(self).attr("data-id");
        var name = $(self).attr("data-name");
        //alert(id);
        $("#sname").attr("data-id",id );
        $("#sname").text(name);
        $('#delSubjectPopup').modal("show");
    }
    window.showDelSubject = exports.showDelSubject;

    //删除模块对话框
    exports.lockSubject = function (id, self) {
        var icon = $(self).find('i');
        
        if (icon.hasClass("icon-unlock")) {
            $.get("/Subject/Lock/" + id, { islock: true }, function (msg) {
                if (msg == "ok") {
                    icon.removeClass("icon-unlock");
                    icon.addClass("icon-lock");
                    $(self).attr("title", "解锁模块");
                }
            });
        } else {
            $.get("/Subject/Lock/" + id, { islock: false }, function (msg) {
                if (msg == "ok") {
                    icon.removeClass("icon-lock");
                    icon.addClass("icon-unlock");
                    $(self).attr("title", "锁定模块");
                }
            });
        }
        
    }
    window.lockSubject = exports.lockSubject;

   

    //添加类别对话框
    exports.showAdd = function (id,count) {
        idAdd = id;
        sort = count+1;
        $("#salert").hide();
        $("#SubjectTitle").val("")
        $('#addSubjectPopup').modal("show");
    }
    window.showAdd = exports.showAdd;


    //编辑模块对话框
    exports.showEditSubject = function (id,title) {
        idAdd = id;
        $("#ealert").hide();
        $("#editSubjectTitle").val(title)
        $('#editSubjectPopup').modal("show");
    }
    window.showEditSubject = exports.showEditSubject;



    //编辑课程对话框
    exports.moveSubject = function (id,index) {
        $.post("/Subject/Move", { "id": id, "index": index }, function (msg) {
            if (msg != "ok") {
                alert("移动失败，请重试");
                
            } else {
                location.reload();
            }
        });
        
    }
    window.moveSubject = exports.moveSubject;



    //添加类别
    $("#btnAddSubject").click(function () {
        var title = $("#SubjectTitle").val();
        var alert = $("#salert");
        if (title == "") {
            alert.text("请输入类别名称");
            alert.show();
            return false;
        } else {
            alert.hide();
        }
        $.post("/Subject/New" , { "id":idAdd,"sort":sort,"title": title }, function (msg) {
            if (msg != "ok") {
                alert("添加失败，请重试");
                $('#addSubjectPopup').modal("hide");
            } else {
                location.reload();
            }
        });
    });


    //编辑类别
    $("#btnEditSubject").click(function () {
        var title = $("#editSubjectTitle").val();
        var alert = $("#ealert");
        if (title == "") {
            alert.text("请输入类别名称");
            alert.show();
            return false;
        } else {
            alert.hide();
        }
        $.post("/Subject/Update", { "id": idAdd, "title": title }, function (msg) {
            if (msg != "ok") {
                alert("更新失败，请重试");
                $('#addSubjectPopup').modal("hide");
            } else {
                location.reload();
            }
        });
    });

   //删除模块
    $("#btnDelSubject").click(function () {
        var id = $("#sname").attr("data-id");
        $.post("/Subject/Del/" + id, null, function (msg) {
            if (msg == "notallow") {
                alert("该模块已包含有课程，不能删除，建议你锁定该模块");
            } else {
                location.reload();
            }
        });
    });

});