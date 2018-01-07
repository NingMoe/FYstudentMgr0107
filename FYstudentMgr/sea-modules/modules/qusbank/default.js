define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    //require('scoket');
    require('tool');
    require('progress');
    require('allRank');
    var date = require('date');
    require('chart');
    var classid;
    var idSubject = "", subject = "", type = "";

    $(".subject").click(function () {
        idSubject = $(this).attr("idSubject");
        subject = $(this).attr("value");
        getSubject(idSubject);
    });
    function getSubject(idSubject) {
        var strHtml = "";
        $("#content").html("");
        $("#subjectLoading").show();
        $.post("/QusBank/getChapter", { "idBank": idSubject }, function (doc) {
            strHtml += '<div class="mgt10">';
            strHtml += '  <div class="row well">';
            strHtml += '  <div class="span4">';
            strHtml += '    <img src="http://stat.kejuwang.com/img/tiku/cover_' + subject + '.png" alt="" />';
            strHtml += '  </div>';
            strHtml += '  <div class="offset4">';
            strHtml += '    <div class="f24 mgt10">' + subject + '</div>';
            strHtml += '      <p class="mgt20 muted">共<span class="text-success">' + doc.Count + '</span>题</p>';
            strHtml += '      <p class="muted">学习人数：<span class="text-success">' + doc.LearningCount + '</span>人</p>';
            strHtml += '    </div>';
            strHtml += '  </div>';
            strHtml += '</div>';
            strHtml += '<div class="sortlist mgt40">';
            strHtml += '  <ul id="ulExercise" class="list-unstyled nav clearfix" style="width:690px">';
            strHtml += '    <li class="active"><a href="#chapterExam"  data-toggle="tab" style="font-size:14px;">章节练习</a></li>';
            strHtml += '    <li><a href="#typeExam"  data-toggle="tab" style="font-size:14px;">题型练习</a></li>';
           
            strHtml += '    <li><a href="#collectExam"  data-toggle="tab" style="font-size:14px;">错题集</a></li>';
            strHtml += '  </ul>';
            strHtml += '</div>';
            strHtml += '<div class="tab-content mgt20">';
            strHtml += '  <div class="tab-pane active" id="chapterExam">';
            strHtml += '    <div class="tikuchapter">';
            strHtml += '      <ul class="list-unstyled">';
            for (var i = 0; i < doc.ChapterList.length; i++) {
                //var countTikuRecord = doc.chapterList[i].doTotal;
                //var countTikuRecordCorrect = doc.chapterList[i].correctTotal;
                var countUserTikuRecord = doc.ChapterList[i].DoCount;
                //var countUserTikuRecordCorrect = doc.chapterList[i].correctCount ? doc.chapterList[i].correctCount : 0;
                var countData = doc.ChapterList[i].TotalCount;
               
                strHtml += '<li>';
                strHtml += '  <a href="" class="tiku  col-md-4 pd0">第' + doc.ChapterList[i].Sort + '章 ' + doc.ChapterList[i].ChapterName + '</a>';
                strHtml += '  <span class="muted pull-right f12">共' + countData + '道题</span>';
                strHtml += '  <div class="progress pos_rel col-md-2 pd0" >';
                strHtml += '    <span>我的进度:' + Math.round((0 === countData) ? 0 : (countUserTikuRecord / countData) * 100) + '%</span>';
                strHtml += '    <div class="progress-bar progress-bar-success" style="width: ' + Math.round((0 === countData) ? 0 : (countUserTikuRecord / countData) * 100) + '%;"></div>';
                strHtml += '  </div>';
                strHtml += '  <div class="chapter_hover">';
                strHtml += '    <a href="/Exam/ReDo/' + idSubject + "?cid=" + doc.ChapterList[i].ChapterID+'&classid='+classid + '" target="_blank" class="btn btn-primary re_btn">重新做题</a>';
                strHtml += '    <a href="/Exam/Index/' + idSubject + "?cid=" + doc.ChapterList[i].ChapterID + '&classid=' + classid + '" target="_blank" class="btn btn-success enter_btn">开始练习</a>';
                strHtml += '  </div>';
                strHtml += '</li>';
            }
            strHtml += '      </ul>'
            strHtml += '    </div>';
            strHtml += '  </div>';
            strHtml += '  <div class="tab-pane" id="typeExam">';
            strHtml += '    <div class="tikuchapter">';
            strHtml += '      <ul class="list-unstyled"></ul>';
            strHtml += '    </div>';
            strHtml += '  </div>';
            //strHtml += '  <div class="tab-pane" id="testExam">';
            //strHtml += '     <a href="/testPaper/office/' + idSubject + '" target="_blank" class="btn btn-large btn-keju">开始组卷</a>';
            //strHtml += '    <div class="tikuchapter">';
            //strHtml += '      <ul class="list-unstyled"></ul>';
            //strHtml += '    </div>';
            //strHtml += '  </div>';
            strHtml += '  <div class="tab-pane" id="collectExam">';
            strHtml += '    <div class="tikuchapter">';
            strHtml += '      <ul class="list-unstyled"></ul>';
            strHtml += '    </div>';
            strHtml += '  </div>';
            strHtml += '</div>';
            $("#content").html(strHtml);
            $("#subjectLoading").hide();
            getTypeBySubject(idSubject);
            //getTestBySubject(idSubject);
            getCollectedByID(idSubject);
            //如果没有章节，则显示题型练习隐藏章节练习
            if (doc.ChapterList.length === 0) {
                $("#ulExercise li").eq(0).hide();
                $("#ulExercise li").eq(1).show();
                $("#ulExercise li").eq(1).find("a").click();
            }
        });
    }
    function getTypeBySubject(idSubject) {
        var strHtml = "";
        $.post("/QusBank/getSubejctByType", { "idBank": idSubject }, function (doc) {
            for (var i = 0; i < doc.length; i++) {
                //var countTikuRecord = doc.typeList[i].doTotal;
                //var countTikuRecordCorrect = doc.typeList[i].correctTotal;
                var countUserTikuRecord = doc[i].DoCount;
                //var countUserTikuRecordCorrect = doc.typeList[i].correctCount ? doc.typeList[i].correctCount : 0;
                var countData = doc[i].Count;
                
                strHtml += '<li>';
                strHtml += '  <span href="" class="tiku col-md-4 pd0">' + doc[i].TypeName + '</span>';
                strHtml += '  <span class="muted pull-right f12">共' + countData + '道题</span>';
                strHtml += '  <div class="progress pos_rel col-md-2 pd0">';
                strHtml += '    <span>我的进度:' + Math.round((0 === countData) ? 0 : (countUserTikuRecord / countData) * 100) + '%</span>';
                strHtml += '    <div class="progress-bar progress-bar-success" style="width: ' + ((0 === countData) ? 0 : (countUserTikuRecord / countData) * 100) + '%;"></div>';
                strHtml += '  </div>';
                strHtml += '  <div class="chapter_hover">';
                strHtml += '    <a href="/Exam/ReDo/' + idSubject + "?tid=" + doc[i].TypeID + '&classid=' + classid + '" target="_blank" class="btn btn-primary re_btn">重新做题</a>';
                strHtml += '    <a href="/Exam/Index/' + idSubject + "?tid=" + doc[i].TypeID + '&classid=' + classid + '" class="btn btn-success enter_btn" target="_blank">开始练习</a>';
                strHtml += '  </div>';
                strHtml += '</li>';
            }
            $("#typeExam div ul").html(strHtml);
        });
    }
    ////模拟考试
    //function getTestBySubject(idSubject) {
    //    $.post("/tiku/getTestBySubject", { "idSubject": idSubject, "idTiku": idTiku }, function (doc) {
    //        var strHtml = "";
    //        //组卷练习列表
    //        for (var i = 0; i < doc.listTestRecord.length; i++) {
    //            strHtml += '<li><span class="span4">' + DateTimeToStr(doc.listTestRecord[i].createdAt, "-", true) + '</span><span href="" class="pull-right muted mgr20"><span class="text-keju bold">' + doc.listTestRecord[i].score + '</span>分</span>';
    //            strHtml += '  <div class="chapter_hover">';
    //            strHtml += '    <a href="/testPaper/finish/' + doc.listTestRecord[i].idAuto + '" target="_blank" class="btn btn-success enter_btn">查看试卷</a>';
    //            strHtml += '  </div>';
    //            strHtml += '</li>';
    //        }
    //        $("#testExam div ul").html(strHtml);
    //    });
    //}
    ////错题集
    function getCollectedByID(idSubject) {
        var strHtml = "";
        $.post("/QusBank/getCollectedByID", { "idBank": idSubject }, function (doc) {
            //生成章节的错题列表
            for (var i = 0; i < doc.ChapterList.length; i++) {
                
                strHtml += '<li>';
                strHtml += '  <span href="" class="tiku col-md-4 pd0">'+'第' + doc.ChapterList[i].Sort + '章 '  + doc.ChapterList[i].ChapterName + '</span>';
                strHtml += '  <span class="muted pull-right f12">共' + doc.ChapterList[i].ErrorCount + '道题</span>';
                if (doc.ChapterList[i].ErrorCount > 0) {
                    strHtml += '  <div class="chapter_hover">';
                    strHtml += '    <a href="#" target="_blank" class="btn btn-primary re_btn hide">错题练习</a>';
                    strHtml += '    <a href="/Exam/MyCollect/' + idSubject + "?cid=" + doc.ChapterList[i].ChapterID + '&classid=' + classid + '" class="btn btn-success enter_btn" target="_blank">查看错题</a>';
                    strHtml += '  </div>';
                }
                strHtml += '</li>';
            }
            for (var i = 0; i < doc.TypeList.length; i++) {
               
                strHtml += '<li>';
                strHtml += '  <span href="" class="tiku col-md-4 pd0">' + doc.TypeList[i].TypeName + '</span>';
                strHtml += '  <span class="muted pull-right f12">共' + doc.TypeList[i].ErrorCount + '道题</span>';
                if (doc.TypeList[i].ErrorCount > 0) {
                    strHtml += '  <div class="chapter_hover">';
                    strHtml += '    <a href="#" target="_blank" class="btn btn-primary re_btn hide">错题练习</a>';
                    strHtml += '    <a href="/Exam/MyCollect/' + idSubject + "?tid=" + doc.TypeList[i].TypeID + '&classid=' + classid + '" class="btn btn-success enter_btn" target="_blank">查看解析</a>';
                    strHtml += '  </div>';
                }
                strHtml += '</li>';
            }
            $("#collectExam div ul").html(strHtml);
        });
    }
    exports.init=function(idclass){
        classid=idclass;
        $(".subject:first").click();
    }
    
    //// 功能：将日期时间转换为字符串
    //function DateTimeToStr(date, separator, isFull, withoutYear, withoutSecond) {
    //    var date = new Date(date);
    //    var str = "";
    //    if (!withoutYear) {
    //        str += date.getFullYear().toString() + separator;
    //    }
    //    if (isFull) {
    //        str += ((date.getMonth() + 1) < 10 ? "0" : "");
    //    }
    //    str += (date.getMonth() + 1).toString() + separator;
    //    if (isFull) {
    //        str += (date.getDate() < 10 ? "0" : "");
    //    }
    //    str += date.getDate();
    //    if (separator) str += " ";

    //    str += (date.getHours() < 10 ? "0" : "");
    //    str += date.getHours();
    //    if (separator) str += ":";
    //    str += (date.getMinutes() < 10 ? "0" : "");
    //    str += date.getMinutes();
    //    if (!withoutSecond) {
    //        if (separator) str += ":";
    //        str += (date.getSeconds() < 10 ? "0" : "");
    //        str += date.getSeconds();
    //    }
    //    return str;
    //}

});