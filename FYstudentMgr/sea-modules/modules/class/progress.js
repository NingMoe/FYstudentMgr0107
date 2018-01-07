define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('chart');
    var finish = parseInt($('#finish').text());
    var total = parseInt($('#total').text());
    //alert(finish);
    //alert(total);
    //计算学习进度
    var dataChart = [];
    dataChart.push({ "value": finish, "color": "#84c00b" });
    dataChart.push({ "value": total - finish, "color": "#E2EAE9" });
    var ctx = $("#chartProgress").get(0).getContext("2d");
    window.myDoughnut = new Chart(ctx).Doughnut(dataChart, { responsive: false });
    //计算百分比
    var percent = GetPercent(finish, total);
    $("#percent").text(percent);
    $("#avatar").attr("title", percent);

    ///计算两个整数的百分比值 
    function GetPercent(num, total) {
        num = parseFloat(num);
        total = parseFloat(total);
        if (isNaN(num) || isNaN(total)) {
            return "-";
        }
        return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00 + "%");
    }
});