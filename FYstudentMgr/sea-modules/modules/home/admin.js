define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('admincss');
    require('font-awesome');

    //require('scoket');
    require('tool');
    var date = require('date');
    require("canvasjs");
    require('chart');
    //alert(boot);

    //格式化日期
    function formatDate(val) {
        var re = /-?\d+/;
        var m = re.exec(val);
        var d = new Date(parseInt(m[0]));
        // 按【2012-02-13 09:09:09】的格式返回日期
        return d.toLocaleDateString();
    }
   
    $.post("/Home/ChartDailyUser", null, function (data) {
        var i,x,y;
        var dataPoints = [];
        for (i = 0; i < data.length; i++) {
            x = formatDate(data[i].x).toString();
           // alert(x);
             y=data[i].y;
             dataPoints.push({ label: x, y: y });
        }
        //alert(dataPoints);
        var chart = new CanvasJS.Chart("chartDailyUser",
           {
               animationEnabled: true,
               zoomEnabled: true,

               title: {
                   text: "注册用户分日走势图"
               },
               data: [
               {
                   type: "spline",
                   dataPoints: dataPoints
               }
               ]
           });
        chart.render();
    });



    $.post("/Home/ChartDailyDiscuss", null, function (data) {
        var i, x, y;
        var dataPoints = [];
        for (i = 0; i < data.length; i++) {
            x = formatDate(data[i].x).toString();
            // alert(x);
            y = data[i].y;
            dataPoints.push({ label: x, y: y });
        }
        //alert(dataPoints);
        var chart = new CanvasJS.Chart("chartDailyDiscuss",
           {
               animationEnabled: true,
               zoomEnabled: true,

               title: {
                   text: "注册用户分日走势图"
               },
               data: [
               {
                   type: "spline",
                   dataPoints: dataPoints
               }
               ]
           });
        chart.render();
    });
    
    
});
