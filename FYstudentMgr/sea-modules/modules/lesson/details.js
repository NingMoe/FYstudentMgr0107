define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('admincss');
    require('font-awesome');
    //require('scoket');
    require('tool');
    require('waypoints');
    //require('allRank');
    //var date = require('date');
    var UE = require('ueditor');
    var option = {
        //initialContent: noteContent,
        encodeuri: true,
        initialFrameHeight: 300,
        //initialContent: "在这里输入您的问题的详细内容",
        toolbars: [[
        'fullscreen', 'insertcode', '|', 'bold', 'italic', 'underline', 'forecolor', 'backcolor', 'removeformat', '|', 'emotion', 'link', 'simpleupload', 'insertvideo', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'undo', 'redo'
        ]]
    };
    var editue = UE.init("editContent", option);
    var addue = UE.init("addContent", option);
    var insertue = UE.init("insertContent", option);
    var noteue = UE.init("noteContent", option);
    var lessonue = UE.init("lessonContent", option);
    var editStep;
    var addStep;
    var insertStep;
    //$('#myTab a').click(function (e) {
    //    var tabindex = $(this).attr("data-no");
        
    //    console.trace(tabindex);
    //    var icon = $("#step_" + tabindex + " div.list-icon");
    //    var ico = $("#ico-group_" + tabindex + " div");
    //    console.trace(icon);
    //    icon.each(function (index, element) {
    //        $(element).waypoint(function (direction) {
    //            if (direction == "up") {
    //                //if (index == 0) {
    //                //    $($("#ico-group div").get(index)).css("visibility", "hidden");
    //                //}
    //                //alert(index);
    //                console.trace("up" + index);
    //                for (var i = 0; i < ico.length; i++) {
    //                    if (i >= index) {
    //                        $(ico.get(i)).addClass("hidden");
    //                        $(ico.get(i)).removeClass("list-icon-current");
    //                    }
    //                    if (i == index) {
    //                        $(ico.get(i - 1)).addClass("list-icon-current");
    //                    }
    //                }
    //                $(element).css("visibility", "visible");

    //            } else {
    //                console.trace("down" + index);
    //                $(element).css("visibility", "hidden");
    //                for (var i = 0; i < ico.length; i++) {
    //                    if (i < index) {
    //                        $(ico.get(i)).removeClass("list-icon-current");
    //                    } else if (i == index) {
    //                        $(ico.get(i)).removeClass("hidden");
    //                        $(ico.get(i)).addClass("list-icon-current");

    //                    } else {
    //                        $(ico.get(i)).addClass("hidden");
    //                        $(ico.get(i)).removeClass("list-icon-current");
    //                    }
    //                }
    //            }

    //            $(ico.get(index)).unbind("click").bind("click", function () {
    //                var _targetTop = $(element).offset().top - 32 * index - 50;//获取位置
    //                console.trace(_targetTop);
    //                jQuery("html,body").animate({ scrollTop: _targetTop }, 600);//跳转
    //            });

    //        }, {
    //            offset: 50 + index * 32
    //        });
    //    });





    //})
    lessonue.addListener("focus", function () {
        lessonue.addListener("contentChange", function () {
            $("#savecontent").removeAttr("disabled");
        });
        //alert(123);

    });
    noteue.addListener("focus", function () {
        noteue.addListener("contentChange", function () {
            $("#saveNote").removeAttr("disabled");
        });
        //alert(123);

    });
    $("#saveNote").click(function () {
        var id = $(this).attr("data-id");
        if (noteue.getContentLength <= 0) {
            alert("请先编辑笔记内容");
            return false;
        }
        var doc = {};
        doc.lessonid = id;
        doc.userid = 1;
        doc.note = noteue.getURIContent();
        $.post("/Note/Update", doc, function (msg) {
            if (msg == "error") {
                alert("保存失败请重试！");
            } else {
                noteue.setContent(msg);
                alert("保存成功");
            }
        });
    });

    $("#savecontent").click(function () {
        var id = $(this).attr("data-id");
        if (lessonue.getContentLength <= 0) {
            alert("请先编辑课程内容");
            return false;
        }
        var doc = {};
        doc.id = id;
        //doc.userid = 1;
        doc.content = lessonue.getURIContent();
        $.post("/Lesson/UpdateContent", doc, function (msg) {
            if (msg == "notfound") {
                alert("保存失败请重试！");
            } else {
                //lessonue.setContent(msg);
                alert("保存成功");
            }
        });
    });

    //删除步骤
    exports.delStep = function (id,self) {
        var prtli = $(self).parent().parent();
        var sort = prtli.find(".list-icon").text();
        console.trace(sort - 1);

        //如果删除的是第一步  则把第二步添加list-item-1类
        if (sort == 1) {
            prtli.next().addClass("list-item-1");
        }
        var prtlink = $(".icogroup div").get(sort - 1);
        $.post("/Step/Del", { id: id }, function (msg) {
            if (msg == "ok") {
                
                prtli.nextAll().each(function (index, element) {
                    //console.trace(index);
                    $(element).find(".list-icon").text($(element).find(".list-icon").text() - 1);
                    
                });
                $(prtlink).nextAll().each(function (index, element) {
                    $(element).text($(element).text() - 1);
                });
                prtli.remove();
                $(prtlink).remove();
            }
        });
    }

    window.delStep = exports.delStep;


    //打开修改步骤对话框
    exports.showEditStep = function (id, self) {
        var prtli = $(self).parent().parent();
        var content = prtli.find("div.content-list-text:first").html();
        editStep = prtli.find("div.content-list-text:first");
        $("#btnEditStep").attr("data-id", id);
        console.trace(content);
        editue.setContent(content);
        $('#editStepPopup').modal("show");
    }
    window.showEditStep = exports.showEditStep;
    $("#btnEditStep").click(function () {
        $("#btnEditStep").button("loading");
        var id = $("#btnEditStep").attr("data-id");
        var content = editue.getURIContent();
        if (content.length <= 0) {
            alert("请填写步骤内容");
            $("#btnEditStep").button("reset");
            return false;
        }
        $.post("/Step/Update", { id: id, content: content }, function (msg) {
            if (msg == "ok") {
                editStep.html(decodeURI(content));
            } else {
                alert("修改失败，请重试");
            }
        });
        $("#btnEditStep").button("reset");
        $('#editStepPopup').modal("hide");
    });


    //打开插入步骤对话框
    exports.showInsertStep = function (id, self) {
        insertStep = $(self).parent().parent();
        $("#btnInsertStep").attr("data-id", id);
        insertue.setContent("请输入步骤内容");
        $('#insertStepPopup').modal("show");
    }

    window.showInsertStep = exports.showInsertStep;
    $("#btnInsertStep").click(function () {
        $("#btnInsertStep").button("loading");
        var doc = {};
        doc.id = $("#btnInsertStep").attr("data-id");
        doc.content = insertue.getURIContent();
        if (doc.content.length <= 0) {
            alert("请填写步骤内容");
            $("#btnInsertStep").button("reset");
            return false;
        }
        $.post("/Step/Insert", doc, function (data) {
            if (data != null) {
                var addul = insertStep.parent();
                //增加成功后追加到列表中
                var html = '<li class="exp-content-list col-lg-12 stepicon">';
                html = html + '<div class="list-icon" style="visibility: visible;">' + data.Sort + '</div>';
                html = html + '<div class="content-list-text">' + data.Content+ '</div><div><a href="#" onclick="delStep(' + data.StepID + ',this)"><i class="icon-trash"></i>删除此步</a>|';
                html = html + '<a href="#" onclick="showEditStep(' + data.StepID + ',this)"><i class="icon-edit"></i>修改此步</a>|';
                html = html + '<a href="#" onclick="showInsertStep(' + data.StepID + ',this)"><i class="icon-pencil"></i>此步后插入一步</a></div> </li>';
                
                htmladd = '<a href="#" onclick="showAddStep(' + doc.lessonid + ',' + doc.item + ',' + ($("#step_"+data.item+" li").length+1)+ ',this)">新增一步</a>';

                var htmllink = '<div class="list-icon-link " style="visibility: hidden;">' + data.Sort + '</div>';
                var prtlink = $(".icogroup div").get(data.Sort - 2);
                insertStep.nextAll().each(function (index, element) {
                    //console.trace(index);
                    $(element).find(".list-icon").text(parseInt($(element).find(".list-icon").text()) + 1);

                });
                $(prtlink).nextAll().each(function (index, element) {
                    $(element).text(parseInt($(element).text()) + 1);
                });
                $(html).insertAfter(insertStep);//插入li
                $(htmllink).insertAfter($(prtlink));//插入link
                $("#step_"+data.item+" li:last").html("").html(htmladd);//重写新增一步
                waypoints.splice(0, waypoints.length);
                waypoint(doc.item);
            } else {
                alert("插入失败，请重试");
            }
        });
        $("#btnInsertStep").button("reset");
        $('#insertStepPopup').modal("hide");
    });


    //打开新增步骤对话框
    exports.showAddStep = function (lessonid,item,sort,self) {
        addStep = $(self).parent();
        $("#btnAddStep").attr("data-lessonid", lessonid);
        $("#btnAddStep").attr("data-item", item);
        $("#btnAddStep").attr("data-sort", sort);
        addue.setContent("请输入步骤内容");
        $('#addStepPopup').modal("show");
    }
    window.showAddStep = exports.showAddStep;
    $("#btnAddStep").click(function () {
        $("#btnAddStep").button("loading");
        var doc = {};
        doc.lessonid = $("#btnAddStep").attr("data-lessonid");
        doc.item = $("#btnAddStep").attr("data-item");
        doc.sort = $("#btnAddStep").attr("data-sort");

        doc.content = addue.getURIContent();
        console.trace(doc);
        if (doc.content.length <= 0) {
            alert("请填写步骤内容");
            $("#btnAddStep").button("reset");
            return false;
        }
        $.post("/Step/New", doc, function (data) {
            if (data != null) {
                var addul = addStep.parent();
                //增加成功后追加到列表中
                var html = '<li class="exp-content-list col-lg-12 stepicon">';
                html = html + '<div class="list-icon" style="visibility: visible;">' + data.Sort + '</div>';
                html = html + '<div class="content-list-text">' + data.Content + '</div><div><a href="#" onclick="delStep(' + data.StepID + ',this)"><i class="icon-trash"></i>删除此步</a>|';
                html = html + '<a href="#" onclick="showEditStep(' + data.StepID + ',this)"><i class="icon-edit"></i>修改此步</a>|';
                html = html + '<a href="#" onclick="showInsertStep(' + data.StepID + ',this)"><i class="icon-pencil"></i>此步后插入一步</a></div> </li>';
                html = html + '<li class="exp-content-list col-lg-12">';
                html = html + '<a href="#" onclick="showAddStep(' + doc.lessonid + ',' + doc.item + ',' + (parseInt(doc.sort) + 1) + ',this)">新增一步</a></li>';
                console.trace(addStep);
                $("#ico-group_" + doc.item).append($('<div class="list-icon-link " style="visibility: hidden;">' + data.Sort + '</div>'));
                addStep.remove();
                addul.append($(html));
                waypoints.splice(0, waypoints.length);
                waypoint(doc.item);
            } else {
                alert("添加失败，请重试");
            }
        });
        $("#btnAddStep").button("reset");
        $('#addStepPopup').modal("hide");
    });


    //打开删除练习对话框
    exports.showDelExercise = function (id, self) {
        var ebody = $(self).parent().parent().find("blockquote:eq(0)").html();
        $("#btnDelExercise").attr("data-id", id);
        $("#delExerciseBody").html(ebody);
       
        $('#delExercisePopup').modal("show");
    }

    window.showDelExercise = exports.showDelExercise;

    //删除练习
    $("#btnDelExercise").click(function(){
        var id = $("#btnDelExercise").attr("data-id");
        $.post("/Exercise/Del/" + id, null, function (msg) {
            if (msg == "ok") {
                $("#exer_" + id).hide();
                $('#delExercisePopup').modal("hide");
            }
        });
    });


    //锁定解锁练习题
    exports.lockExercise = function (id, self) {
        var icon = $(self).find('i');

        if (icon.hasClass("icon-unlock")) {
            $.post("/Exercise/Lock/" + id, { state: 1 }, function (msg) {
                if (msg == "ok") {
                    icon.removeClass("icon-unlock");
                    icon.addClass("icon-lock");
                    $(self).attr("title", "解锁题目");
                    //$(self).text("解锁");
                }
            });
        } else {
            $.post("/Exercise/Lock/" + id, { state: 0 }, function (msg) {
                if (msg == "ok") {
                    icon.removeClass("icon-lock");
                    icon.addClass("icon-unlock");
                    $(self).attr("title", "锁定题目");
                    //$(self).text("锁定");
                }
            });
        }
    }

    window.lockExercise = exports.lockExercise;

    //var len = $('#myTab a[data-toggle="tab"]').length-1;
    //var isclick=new Array();
    //for(i=0;i<len;i++){
    //    isclick.push(0);
    //}
    //alert(isclick);

    var isclick = 0;
    $('#Tab a[href="#lsteps"]').on('shown.bs.tab', function (e) {
        if (isclick == 0) {
           // console.trace(1111111111);
            isclick = 1;
            waypoint(1);
            //waypoint();
        }      
    });


  
    
    //当前页面添加stepicon类
    $('#myTab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        //console.trace(111);
        var tabindex = $(this).attr("data-no");
        var preindex = $(e.relatedTarget).attr("data-no");
        $("#step_" + preindex).removeClass("stepicon");

        $("#ico-group_" + preindex).removeClass("icogroup");
        //console.trace(tabindex);
        $("#step_" + tabindex).addClass("stepicon");

        $("#ico-group_" + tabindex).addClass("icogroup");
        console.trace(preindex + ">" + tabindex);
        waypoints.splice(0, waypoints.length);
        console.trace(waypoints);
        waypoint(tabindex);
        console.trace(waypoints);
        
        //waypoint();
    });

    var waypoints = new Array();
    
    function waypoint(item) {
        $("#item_"+item+" .stepicon .list-icon").each(function (index, element) {

            waypoints[index]=$(element).waypoint(function (direction) {
                if (direction == "up") {
                    //if (index == 0) {
                    //    $($("#ico-group div").get(index)).css("visibility", "hidden");
                    //}
                    //alert(index);
                    console.trace("up" + index);
                    for (var i = 0; i < $("#item_" + item + " .icogroup div").length; i++) {
                        if (i >= index) {
                            $($("#item_" + item + " .icogroup div").get(i)).css("visibility", "hidden");
                            $($("#item_" + item + " .icogroup div").get(i)).removeClass("list-icon-current");
                        }
                        if (i == index) {
                            $($("#item_" + item + " .icogroup div").get(i - 1)).addClass("list-icon-current");
                        }
                    }
                    $(element).css("visibility", "visible");

                } else {
                    console.trace("down_"+ index);
                    $(element).css("visibility", "hidden");
                    for (var i = 0; i < $(".icogroup div").length; i++) {
                        if (i < index) {
                            $($("#item_" + item + " .icogroup div").get(i)).removeClass("list-icon-current");
                        } else if (i == index) {
                            $($("#item_" + item + " .icogroup div").get(i)).css("visibility", "visible");
                            $($("#item_" + item + " .icogroup div").get(i)).addClass("list-icon-current");

                        } else {
                            $($("#item_" + item + " .icogroup div").get(i)).css("visibility", "hidden");
                            $($("#item_" + item + " .icogroup div").get(i)).removeClass("list-icon-current");
                        }
                    }
                }

                $($("#item_" + item + " .icogroup div").get(index)).unbind("click").bind("click", function () {
                    var _targetTop = $(element).offset().top - 32 * index - 50;//获取位置
                    console.trace(_targetTop);
                    jQuery("html,body").animate({ scrollTop: _targetTop }, 600);//跳转
                });

            }, {
                offset: 50 + index * 32
            });
        });
    }
    
    function cancelwaypoint(item) {
        $(".stepicon_" + item + " .list-icon").each(function (index, element) {
            $($("#ico-group_" + item + " div").get(index)).css("visibility", "hidden");
            $($("#ico-group_" + item + " div").get(index)).removeClass("list-icon-current");
            $(element).waypoint(function (direction) {
                console.trace("cancel");
            });
        });
    }


});