define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    
    //require('scoket');
    require('tool');
    require('progress');
    require('allRank');
    var date = require('date');
    //require('chart');
    var i = 0;
    $(".learnchapter h3").click(function () {
        if (i == 0) {
            //alert(i);
            $(this).next("ul").slideDown();
            $(this).find("span").html("-");
            $(this).find("i").attr("class", "hasOpenOn");
            i = 1;
        } else {
            //alert(i);
            $(this).next("ul").slideUp();
            $(this).find("span").html("+");
            $(this).find("i").attr("class", "hasOpen");
            i = 0;
        }
    });
   
});