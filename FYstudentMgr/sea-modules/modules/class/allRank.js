define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('chart');
    var chartprogress = $('.chartProgress');
    chartprogress.each(function () {
        var ct = $(this);
        var finish = parseInt(ct.attr('data-finish'));
        var total = parseInt(ct.attr('data-total'));
        var dataChart = [];
        dataChart.push({ "value": finish, "color": "#84c00b" });
        dataChart.push({ "value": total - finish, "color": "#E2EAE9" });
        var ctx = ct.get(0).getContext("2d");
        window.myDoughnut = new Chart(ctx).Doughnut(dataChart, { responsive: false });
    });

});