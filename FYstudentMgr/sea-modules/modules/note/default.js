define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('unobtrusive');
    var boot = require('bootstrap'); 
    //require('scoket');
    require('tool');
    require('progress');
    //require('allRank');
    //var date = require('date');
    require('chart');
    var uid = $('#kj_usermenu').attr('data-userid');
    var cid = $('#choiceNavi').attr('data-classid');
    var lessonid = $("#lessonid").text();

    


    //负责打开写备注的文本框
    exports.writeNote = function (self) {
        $(self).hide();
        $(self).siblings("textarea").removeClass("hidden");
        $(self).siblings("textarea").focus();
    }
    window.writeNote = exports.writeNote;


    //负责更新备注
    exports.editDataNote = function (self) {
        var doc = {};
        doc.id = $(self).parent("div").attr("idData");
        doc.note = $(self).val();
        $.post("/ExerciseRecord/UpdateNoteByID", doc, function (msg) {
            if ("ok" === msg) {
                $(self).siblings("div").show();
                if ("" === doc.note) {
                    $(self).siblings("div").html('<div id="btnAddDataNote" class="text-center">+ 我的备注</div>');
                } else {
                    $(self).siblings("div").text(doc.note);
                }
                $(self).addClass("hidden");
                $(self).val(doc.note);
            }
        });
    }
    window.editDataNote = exports.editDataNote;

    exports.showModalRemoveCollected = function showModalRemoveCollected(obj) {
        $("#removeCollected").attr("targetRemoved", $(obj).parent().attr("id"));
        $('#tipModal').modal("show");
    }
    window.showModalRemoveCollected = exports.showModalRemoveCollected;
    var first_note = 1;
    //点击获取第一页的笔记
    $("#mynote").click(function () {
        $("#notePart").show();
        $("#collectedPart").hide();
        if (first_note==1) {
            $.post("/Note/GetAllNote", { classid: cid, userid: uid }, function (data) {
                $("#notePart").html(data);
                first_note++;
            });
        }
        
    });
    var first_error = 1;
    //点击获取第一页的错题
    $("#myerror").click(function () {       
        $("#notePart").hide();
        $("#collectedPart").show();
        if (first_error==1) {
            $.post("/ExerciseRecord/GetError", { classid: cid, userid: uid }, function (data) {
                $("#collectedPart").html(data);
                first_error++;
            });
        }
    });
   
    if (lessonid != "") {
        $("#choiceNavi").hide();
        $("#notePart").hide();
        $("#collectedPart").hide();

        //显示某一课部分
        $("#noteWrapper").show();
        generateNote(lessonid);
    } else {
        //初始化时获取笔记
        $("#mynote").click();
    }


    //给笔记页面的分页导航按钮注册点击事件
    $("body").delegate("div#notePart ul.pagination li a", "click", function (e) {
        e.preventDefault();      
        var url = $(this).attr("href");
        if (url != null) {
            $.post(url, function (data) {
                //alert(data);
                $("#notePart").empty().append(data);
            });
        }
    });

    //给错题页面的分页导航按钮注册点击事件
    $("body").delegate("div#collectedPart ul.pagination li a", "click", function (e) {
        e.preventDefault();
        var url = $(this).attr("href");
        if (url != null) {
            $.post(url, function (data) {
                //alert(data);
                $("#collectedPart").empty().append(data);
            });
        }
    });
    $("body").delegate("#showNoteLessonByKeju", "click", function () {
        $("#noteLessonByKeju").toggleClass("hidden");
    });
   
    function generateNote(id) {
        $("#" + id).attr("class", "active");
        $("#" + id).parent().parent().parent().addClass("in");
        nameLesson = $("#" + id + " span:eq(0)").text();
        $.get("/ExerciseRecord/GetNoteErrorByLesson", { classid: cid, userid: uid, lessonid: id }, function (data) {
            $("#noteWrapper").html(data);
            $(".fromLesson").text("《" + nameLesson + "》");
            $(".fromLesson").attr("href", "/Lesson/Play/" + id + "?classid=" + cid);
            if ($("#noteLessonByKeju span").text() != "") {
                $("#showNoteLessonByKeju").removeClass("hidden");
            }
              
        });

        

    }
    ////---------------------------------
    //  Note页面相关函数
    //  李松明
    //  2015-4-3
    ////---------------------------------

    //var nameLesson, strAnswer = "ABCDEFGH", pageCount = 0;

    //if ("undefined" === typeof idLesson) {
    //    /*
    //    $.post("/lesson/getLatest", {"idCourse":idCourse}, function (docs){
    //      if(docs.length>0){
    //        generateNote(docs[0].idLesson);
    //      } else {
    //        $("#collapse0").addClass("in");
    //        $("#collapse0 li:eq(0)").attr("class","active");
    //      }
    //    });*/
    //    getAllNoteByPage(1);
    //    //getAllCollectByPage(1);
    //} else {
    //    //隐藏全部课程的笔记与错题
    //    $("#choiceNavi").hide();
    //    $("#notePart").hide();
    //    $("#collectedPart").hide();
    //    $("#divPage").hide();
    //    //显示某一课部分
    //    $("#noteWrapper").show();
    //    generateNote(idLesson);
    //}

    ////获取所有笔记
    //function getAllNoteByPage(page) {
    //    $("#notePart").show();
    //    $("#collectedPart").hide();
    //    var listLesson = "qpB12umZ,ESwdXzWV,pve2k4n6,j3hqd4o3,zeasahcb,zbll3hyv,sbpr2kn1,5pbpp9ak,zhf3oczr,zerwhclb,a91bqd22,9mr7qrvu,djxb1g5a,tw5dthmi,ik08ysd0,reeradju,rqkna0cm,e99i8bbn,b9f7qvoq,e61b1bx7,88detyr5,5kh033x0,ljb58vs7,s0io2eid,lstu1h7j,eh8tlkia,uj09550x,afz73xhx,3j8aue7n,a1mto5p1,ncre_no242033,ncre_no241003,ncre_no241004,ncre_no242005,ncre_no241006,ncre_no242012,ncre_no242013,ncre_no243016,ncre_no242020,ncre_no242062,ncre_no242023,ncre_no242024,ncre_no242025,ncre_no242028,ncre_no243028,wwhdu2pm,ncre_no242063,ncre_no242086,gfcxax0q,jowx103z,znj2qry6,ncre_no242081,fah0ojn6,ncre_no243023,cj5fzoed,ncre_no242027,ncre_no242019,ncre_no243048,ncre_no241085,pyrdmlt4,ncre_no243025,ncre_no243018,pv35elfo,l4jchr63,ewmiglw2,oae5luvw,ncre_no242003,ncre_no241082,ncre_no243008,ncre_no243013,ncre_no243014,ncre_no243015,ncre_no241083,ncre_no242017,ncre_no243017,ncre_no243063,ncre_no243064,ncre_no243065,ncre_no243073,o7qyd2hg,ncre_no241090,ncre_no241091,ncre_no242100,r4daxr3t,we4rw4et,ncre_no242103,dr6twcg6,ncre_no243004,ncre_no243076,x7yzbag6,ncre_no242021,4pci426b,czgzhj78,31na2b9o,ncre_no242002,ncre_no242004,ncre_no241005,ncre_no242018,ovid1pd0,ncre_no242001,ncre_no242006,ncre_no242009,ncre_no241012,ncre_no241013,ncre_no243009,ncre_no241014,4udigu2w,ncre_no241017,0twpu244,ncre_no242015,ncre_no242010,ncre_no243005,ncre_no242011,ncre_no243011,ncre_no242016,ncre_no243020,h3qg80Pa,ncre_no241018,ncre_no241019,ncre_no243019,ncre_no241020,we3k4icr,ewoag6j5,s6ubg6nu,ncre_no241010,6v2qss8j,bq0cbk7c,x6dv7mjg,ncre_no243001,ncre_no243007,u7487zkr,e3wmw3us,PwBh7Kmn,7eUQLPmr,eZYv47ot,Ly5e2kJv,m4GJU1sy,QDxbzMiF,cFrXIo3X,QghXFSkH,zv6of0Ef,BYibEdU7,i0pDSy5d,cqtqzwgd,DpUiNYsC,64pBUbua,BUNf6yxy,BMbvMihu,Kv2QVzix,aPn8qepr,llIp7PRV".split(',');
    //    var pageCount = Math.ceil(listLesson.length / 5);
    //    var arrIdLesson = [];
    //    for (var i = (page - 1) * 5; i < (page * 5 < listLesson.length ? page * 5 : listLesson.length) ; i++) {
    //        arrIdLesson.push(listLesson[i]);
    //    }
    //    $.post("/note/getAllNote", { "arrIdLesson": arrIdLesson }, function (doc) {
    //        if ("notLogin" !== doc) {
    //            var strHtml = "";
    //            for (var i = 0; i < doc.listNote.length; i++) {
    //                strHtml += '<div class="text note mgt20">';
    //                if ("" === doc.listNote[i].note) {
    //                    strHtml += '  <div class="muted">本课你还没写笔记哦</div>';
    //                } else {
    //                    strHtml += '  <div>' + doc.listNote[i].note.replace(/\/images/ig, 'http://www.kejuwang.com/images') + '</div>';
    //                }
    //                strHtml += '  <div class="mgt20 muted f12 text">';
    //                var nameLesson = $("#" + doc.listNote[i].idLesson + " span:eq(0)").text();
    //                strHtml += '    来自<a class="muted fromLesson mgl10" href="/lesson/' + idCourse + '/' + $("#" + doc.listNote[i].idLesson).attr("typeLesson") + "/" + doc.listNote[i].idLesson + '" target="_blank">《' + nameLesson + '》</a>';
    //                strHtml += '  </div>';
    //                strHtml += '</div>';
    //            }
    //            $("#notePart").html(strHtml);
    //            changePage("getAllNoteByPage", page, pageCount);
    //        }
    //    });
    //}

   
    //$.post("/lesson/getCollectedMenu", { "idCourse": idCourse }, function (docs) {
    //    var i, j, sumChapter;
    //    for (i = 0; i < docs.length; i++) {
    //        $("#" + docs[i].idLesson + " span:eq(1)").text(docs[i].countCollected);
    //    }
    //    for (i = 0; i < $(".accordion-group").length; i++) {
    //        sumChapter = 0;
    //        for (j = 0; j < $(".accordion-group:eq(" + i + ") li").length; j++) {
    //            sumChapter += Number($(".accordion-group:eq(" + i + ") li:eq(" + j + ") span:eq(1)").text());
    //        }
    //        $(".accordion-heading:eq(" + i + ") span:eq(1)").text(sumChapter);
    //    }
    //});



    //$(".edit-label").toggle(function () {
    //    alert("123");
    //}, function () {
    //    alert("234");
    //});

  
   

    //$("#showNoteLessonByKeju").click(function () {
    //    $("#noteLessonByKeju").toggleClass("hide");
    //});
   

   


    function DateToStr(strDate) {
        var year = strDate.substr(0, 4);
        strDate = strDate.substr(5);
        var month = strDate.substr(0, 2);
        strDate = strDate.substr(3);
        var day = Number(strDate.substr(0, 2));
        strDate = strDate.substr(3);
        var hour = Number(strDate.substr(0, 2));
        hour += 8;
        if (hour >= 24) {
            hour -= 24;
            day += 1;
        }
        if (hour < 10) {
            hour = "0" + hour.toString();
        }
        if (day < 10) {
            day = "0" + day.toString();
        }
        strDate = strDate.substr(3);
        var minute = strDate.substr(0, 2);
        strDate = strDate.substr(3);
        var second = strDate.substr(0, 2);
        strDate = strDate.substr(3);
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    }



    //注册确定删除按钮事件
    $("#removeCollected").click(function () {
        var objThis = $(this);
        objThis.button("loading");
        var idData = $(this).attr("targetRemoved");
        $.post("/ExerciseRecord/RemoveCollected", { id: idData }, function (msg) {
            if ("ok" === msg) {
                objThis.button("reset");
                $('#tipModal').modal("hide");
                $('#' + idData).hide();
            } else if ("notLogin" === msg) {
                location.href = "/";
            }
        });
    });

});