define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('scoket');
    require('tool');
    //require('progress');
    //require('allRank');
    //var date = require('date');
    var UE = require('ueditor');
    var option = {
        //initialContent: noteContent,
        initialFrameHeight: 500,
        initialContent: "请填写文章类容",
        toolbars: [[
        'fullscreen', 'insertcode', '|', 'bold', 'italic', 'underline', 'forecolor', 'backcolor', 'removeformat', '|', 'emotion', 'link', 'simpleupload', 'insertvideo', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'undo', 'redo'
        ]]
    };
    var ue = UE.init("Content", option);
    window.ue = exports.ue = ue;


    $("#Category1ID").change(function () {
        // alert($("option:selected").val());
        currentId = parseInt($("#Category1ID option:selected").val());
        $.post("/Article/Category2DropDownListByCategory1", { category1id: currentId },function (data) {
            //alert(data[0]);
            $("#Category2ID option").remove();//BuildingID为要绑定的select，先清除数据  
            $.each(data, function (i, item) {
                //alert(item.Value);
                $("#Category2ID").append("<option value=" + item.Value + ">" + item.Text + "</option>");//赋值  
            });

        });

    });

    $("#btnSubmit").click(function () {
        $("#btnSubmit").button("loading");
        var title = $.trim($("#Title").val()), contentHtml = ue.getContent(), contentText = ue.getPlainTxt();
        if ("" === title) {
            alert("这位课官，先给帖子起个标题吧！");
            $("#btnSubmit").button("reset");
            return false;
        } else if (!ue.hasContents()) {
            alert("这位课官，先写点什么再发布吧！");
            $("#btnSubmit").button("reset");
            return false;
        } else{
            var category1 = $("#Category1ID").val();
            //alert(category1 === "");
            if (category1 === "") {
                alert("这位课官，请选择一个类别1");
                $("#btnSubmit").button("reset");
                return false;
            } else {
                var category2 = $("#Category2ID").val();
                if (category2 === "") {
                    alert("这位课官，请选择一个类别2");
                    $("#btnSubmit").button("reset");
                    return false;
                }
            }
            //return false;
        }


    });

});