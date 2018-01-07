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

    var UE = require('ueditor');
    var option = {
        //initialContent: noteContent,
        initialFrameHeight: 200,
        //initialContent: "在这里输入您的问题的详细内容",
        toolbars: [[
        'fullscreen', 'insertcode', '|', 'bold', 'italic', 'underline', 'forecolor', 'backcolor', 'removeformat', '|', 'emotion', 'link', 'simpleupload', 'insertvideo', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'undo', 'redo'
        ]]
    };
    //添加类别2
    exports.showAddCategory2 = function (idc1,self) {
        $("#btnAddCategory2").attr("data-id", idc1);
        $("#addCategory2Popup").modal("show");
    }
    window.showAddCategory2 = exports.showAddCategory2;
    $("#addcategory2Content").on('input',function () {
        if ($("#addcategory2Content").val().length > 0) {
            console.trace(111);
            $(this).next("div").text("");
        }
    });
    $("#btnAddCategory2").click(function () {
        var myalert = $(this).parent().prev().find(".myalert");
        if ($("#addcategory2Content").val().length <= 0) {
            myalert.text("请输入名目内容！");
            return false;
        }
        $(this).button("loading");
        var doc = {};
        doc.id = $(this).attr("data-id");
        doc.name = $("#addcategory2Content").val();
        $.post("/Category/NewCategory2", doc, function (msg) {
            if (msg == "ok") {
                alert("添加成功！");
                location.reload();
            } else {
                alert("添加失败，请重试！");
                $(this).button("reset");
            }
            return null;
        });
        $(this).button("reset");
    });


    //添加类别1
    exports.showAddCategory1 = function (idc1, self) {
        $("#btnAddCategory1").attr("data-id", idc1);
        $("#addCategory1Popup").modal("show");
    }
    window.showAddCategory1 = exports.showAddCategory1;
    $("#addcategory1Content").on('input', function () {
        if ($("#addcategory1Content").val().length > 0) {
            console.trace(111);
            $(this).next("div").text("");
        }
    });
    $("#btnAddCategory1").click(function () {
        var myalert = $(this).parent().prev().find(".myalert");
        if ($("#addcategory1Content").val().length <= 0) {
            myalert.text("请输入名目内容！");
            return false;
        }
        $(this).button("loading");
        var doc = {};
        doc.id = $(this).attr("data-id");
        doc.name = $("#addcategory1Content").val();
        $.post("/Category/NewCategory1", doc, function (msg) {
            if (msg == "ok") {
                alert("添加成功！");
                location.reload();
            } else {
                alert("添加失败，请重试！");
                $(this).button("reset");
            }
            return null;
        });
        $(this).button("reset");
    });


    //修改类别1
    exports.showEditCategory1 = function (idc1, name) {
        $("#btnEditCategory1").attr("data-id", idc1);
        $("#editcategory1Content").val(name);
        $("#editCategory1Popup").modal("show");
    }
    window.showEditCategory1 = exports.showEditCategory1;
    $("#editcategory1Content").on('input', function () {
        if ($("#editcategory1Content").val().length > 0) {
            console.trace(111);
            $(this).next("div").text("");
        }
    });
    $("#btnEditCategory1").click(function () {
        var myalert = $(this).parent().prev().find(".myalert");
        if ($("#editcategory1Content").val().length <= 0) {
            myalert.text("请输入名目内容！");
            return false;
        }
        $(this).button("loading");
        var doc = {};
        doc.id = $(this).attr("data-id");
        doc.name = $("#editcategory1Content").val();
        $.post("/Category/UpdateCategory1", doc, function (msg) {
            if (msg == "ok") {
                alert("修改成功！");
                location.reload();
            } else {
                alert("修改失败，请重试！");
                $(this).button("reset");
            }
            return null;
        });
        $(this).button("reset");
    });



    //修改类别2
    exports.showEditCategory2 = function (idc1, name) {
        $("#btnEditCategory2").attr("data-id", idc1);
        $("#editcategory2Content").val(name);
        $("#editCategory2Popup").modal("show");
    }
    window.showEditCategory2 = exports.showEditCategory2;
    $("#editcategory2Content").on('input', function () {
        if ($("#editcategory2Content").val().length > 0) {
            console.trace(111);
            $(this).next("div").text("");
        }
    });
    $("#btnEditCategory2").click(function () {
        var myalert = $(this).parent().prev().find(".myalert");
        if ($("#editcategory2Content").val().length <= 0) {
            myalert.text("请输入名目内容！");
            return false;
        }
        $(this).button("loading");
        var doc = {};
        doc.id = $(this).attr("data-id");
        doc.name = $("#editcategory2Content").val();
        $.post("/Category/UpdateCategory2", doc, function (msg) {
            if (msg == "ok") {
                alert("修改成功！");
                location.reload();
            } else {
                alert("修改失败，请重试！");
                $(this).button("reset");
            }
            return null;
        });
        $(this).button("reset");
    });


    //删除类别1
    exports.showDelCategory1 = function (idc1, name) {
        $("#btnDelCategory1").attr("data-id", idc1);
        $("#delcategory1Content").text(name);
        $("#delCategory1Popup").modal("show");
    }
    window.showDelCategory1 = exports.showDelCategory1;
   
    $("#btnDelCategory1").click(function () {
        //var myalert = $(this).parent().prev().find(".myalert");
        //if ($("#delcategory1Content").val().length <= 0) {
        //    myalert.text("请输入名目内容！");
        //    return false;
        //}
        $(this).button("loading");
        var doc = {};
        doc.id = $(this).attr("data-id");
        //doc.name = $("#editcategory1Content").val();
        $.post("/Category/DelCategory1", doc, function (msg) {
            if (msg == "ok") {
                //alert("修改成功！");
                location.reload();
            } else {
                alert("删除失败，请重试！");
                $(this).button("reset");
            }
            return null;
        });
        $(this).button("reset");
    });


    //删除类别2
    exports.showDelCategory2 = function (idc1, name) {
        $("#btnDelCategory2").attr("data-id", idc1);
        $("#delcategory2Content").text(name);
        $("#delCategory2Popup").modal("show");
    }
    window.showDelCategory2 = exports.showDelCategory2;

    $("#btnDelCategory2").click(function () {
        //var myalert = $(this).parent().prev().find(".myalert");
        //if ($("#delcategory1Content").val().length <= 0) {
        //    myalert.text("请输入名目内容！");
        //    return false;
        //}
        $(this).button("loading");
        var doc = {};
        doc.id = $(this).attr("data-id");
        //doc.name = $("#editcategory1Content").val();
        $.post("/Category/DelCategory2", doc, function (msg) {
            if (msg == "ok") {
                //alert("修改成功！");
                location.reload();
            } else {
                alert("删除失败，请重试！");
                $(this).button("reset");
            }
            return null;
        });
        $(this).button("reset");
    });


    exports.lockCategory2 = function (id, self) {
        var icon = $(self).find('i');

        if (icon.hasClass("icon-unlock")) {
            $.get("/Category/LockCategory2/" + id, { islock: true }, function (msg) {
                if (msg == "ok") {
                    icon.removeClass("icon-unlock");
                    icon.addClass("icon-lock");
                    $(self).attr("title", "解锁名目");
                }
            });
        } else {
            $.get("/Category/LockCategory2/" + id, { islock: false }, function (msg) {
                if (msg == "ok") {
                    icon.removeClass("icon-lock");
                    icon.addClass("icon-unlock");
                    $(self).attr("title", "锁定名目");
                }
            });
        }
    }
    window.lockCategory2 = exports.lockCategory2;

    exports.lockCategory1 = function (id, self) {
        var icon = $(self).find('i');

        if (icon.hasClass("icon-unlock")) {
            $.get("/Category/LockCategory1/" + id, { islock: true }, function (msg) {
                if (msg == "ok") {
                    icon.removeClass("icon-unlock");
                    icon.addClass("icon-lock");
                    $(self).attr("title", "解锁名目");
                }
            });
        } else {
            $.get("/Category/LockCategory1/" + id, { islock: false }, function (msg) {
                if (msg == "ok") {
                    icon.removeClass("icon-lock");
                    icon.addClass("icon-unlock");
                    $(self).attr("title", "锁定名目");
                }
            });
        }
    }
    window.lockCategory1 = exports.lockCategory1;
});