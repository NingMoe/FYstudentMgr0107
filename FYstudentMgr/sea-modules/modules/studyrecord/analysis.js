define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    //var boot = require('bootstrap');
    require('admincss');
    require('font-awesome');
    require("modules/studyrecord/monitor.css");
    require('page');
    require('tool');
    var date = require('date');
    require("canvasjs");
    require('chart');
    //alert(boot);
    var classname;
    exports.init = function (id) {
        var angular = require('angular');
        var sanitize = require('angular-sanitize');
        var app = angular.module('myApp', ['ngSanitize']);

       

        app.controller('monitor', function ($scope, $http, $filter) {

            

            //获取分班级数据
            $http.post("/studyrecord/chartClass/" + id)
                  .success(function (data) {
                      var chart = new CanvasJS.Chart("chartClass",
                      {
                          animationEnabled: true,
                          zoomEnabled: true,

                          title: {
                              text: "按班级",
                              fontColor: "yellow",
                          },
                          axisX: {
                              lineColor: "transparent",
                          },
                          axisY: {
                              lineColor: "transparent",
                              gridColor: "transparent",
                          },
                          backgroundColor: "transparent",
                          data: [
                          {
                              type: "column",
                              dataPoints: formatData(data)
                          }
                          ]
                      });
                      chart.render();
                  });

            //获取主要信息
            $http.post("/studyrecord/chartMain/" + id)
                 .success(function (data) {
                     $scope.coursename = data.coursename;
                     $scope.studentall = data.studentall;
                     $scope.studentpay = data.studentpay;
                 });
            //获取视频播放分日统计信息
            $http.post("/studyrecord/chartvideo/" + id)
                  .success(function (data) {
                      var chart = new CanvasJS.Chart("chartvideo",
                      {
                          animationEnabled: true,
                          zoomEnabled: true,

                          title: {
                              text: "按班级",
                              fontColor: "yellow",
                          },
                          axisX: {
                              lineColor: "transparent",
                              labelAngle: 0,
                              tickColor: "transparent",
                          },
                          axisY: {
                              lineColor: "transparent",
                              gridColor: "transparent",
                              tickColor: "transparent",
                          },
                          backgroundColor: "transparent",
                          data: [
                          {
                              type: "scatter",
                              legendMarkerType: "circle",

                              dataPoints: formatDate(data)
                          }
                          ]
                      });
                      chart.render();
                  });

            //每日进班情况分析
            $http.post("/studyrecord/chartenroll/" + id)
                  .success(function (data1) {
                      $http.post("/studyrecord/chartfufei/" + id)
                      .success(function (data2) {
                          var chart = new CanvasJS.Chart("chartstudent",
                            {
                                animationEnabled: true,
                                zoomEnabled: true,

                                title: {
                                    text: "进班",
                                    fontColor: "yellow",
                                },
                                axisX: {
                                    lineColor: "transparent",
                                    labelAngle: 0,
                                    tickColor: "transparent",
                                },
                                axisY: {
                                    lineColor: "transparent",
                                    gridColor: "transparent",
                                    tickColor: "transparent",
                                },
                                backgroundColor: "transparent",
                                data: [{
                                    type: "stackedColumn",
                                    legendText: "缴费人数",
                                    showInLegend: "true",
                                    dataPoints: formatDate(data2)
                                }, {
                                    type: "stackedColumn",
                                    legendText: "试听人数",
                                    showInLegend: "true",
                                    indexLabel: "总计 #total",
                                    //yValueFormatString: "#0.#,.",
                                    indexLabelPlacement: "outside",
                                    dataPoints: formatDate(data1)
                                }
                                ]

                            });
                          chart.render();
                      });
                  });

            //各课时学习情况
            $http.post("/studyrecord/chartlesson/" + id)
                  .success(function (data) {
                     
                      var chart = new CanvasJS.Chart("chartlesson",
                      {
                          animationEnabled: true,
                          zoomEnabled: true,

                          title: {
                              text: "按课时",
                              fontColor: "yellow",
                          },
                          axisX: {
                              lineColor: "transparent",
                              labelAngle: 0,
                              tickColor: "transparent",
                          },
                          axisY: {
                              lineColor: "transparent",
                              gridColor: "transparent",
                              tickColor: "transparent",
                          },
                          backgroundColor: "transparent",
                          data: [
                          {
                              type: "scatter",
                              legendMarkerType: "circle",

                              dataPoints: formatData(data)
                          }
                          ]
                      });
                      chart.render();
                      $scope.totalLesson = data.length;
                      
                  });
            $scope.formatNumber = function (number) {
                
                var list = [];
                number = parseInt(number);
                while (number > 0) {
                    list.push( number % 10);
                    number = parseInt(number / 10);
                }
                //alert(list);
                return list.reverse();
            }

           
        });




        app.controller('monitor-info', function ($scope, $http, $filter) {

            $scope.isFiledOpen = false;
            $scope.isClassOpen = false;
            $scope.pagesize = 20;
            $scope.isNullStatisticsResult = false;
            $scope.currentOrder = 1;
            //表格字段控制
            $scope.filedList = [
                { text: "学员姓名", index: 0 ,width:130,selected:true,name:'name'},
                 { text: "手机号", index: 1, width: 150, selected: true, name: 'phone' },
                 { text: "最近学习时间", index: 2, width: 150, selected: true, name: 'latestDate' },
                  { text: "完成课时", index: 3, width: 80, selected: true, name: 'finishCount' },
                   { text: "有效时长", index: 4, width: 80, selected: true, name: 'effectDur' },
                    { text: "完成进度", index: 5, width: 150, selected: true, name: 'name' },
                    { text: "班级", index: 6, width: 200, selected: true, name: 'name' }
            ];

            //过滤器过滤选中的字段
            $scope.filedFilter = function (e) {
                return e.selected;
            }

            $http.post("/studyrecord/getClass/" + id)
            .success(function (data) {
                $scope.classList = data;
                $scope.getStatistics(0, 1);
            });


            //获取统计数据
            $scope.getStatistics = function (index, page) {
                $scope.className = $scope.classList[index].name;
                $scope.classIndex = index;
                var doc = {};
                doc.id = $scope.classList[index].id;
                doc.pageSize = $scope.pagesize;
                doc.page = page;
                doc.order = $scope.currentOrder;
                doc.searchString = $scope.searchContent;
                $http.post("/studyrecord/getStudyStatistics",doc)
                  .success(function (data) {
                      if (data.status != "ok" || data.studentCount == 0) {
                          $scope.isNullStatisticsResult = true;
                          $scope.studentList = null;
                      } else {
                          
                          $scope.lessonCount = data.data.lessonCount;                        
                          $scope.isNullStatisticsResult = false;
                          $scope.studentList = data.data.items;
                          $scope.totalCount = data.data.studentCount;
                          $scope.totalPage = data.data.pageCount;

                          $scope.setPage(page);
                          
                      }
                  });
                $scope.isClassOpen = false;
            }

            //设置排序
            $scope.setOrderType = function (order) {
                if (Math.abs(order) >= 6) {
                    return false;
                }
                if (Math.abs($scope.currentOrder) === Math.abs(order) && $scope.currentOrder > 0) {
                    order = -order;
                }
                $scope.currentOrder = order;
                $scope.getStatistics($scope.classIndex, 1);
                return false;
            }

            //分页功能模块

            $scope.setPage = function (index) {
                if (index == '...') {
                    return false;
                }
                $scope.pages = [];
                for (var i = 1; i <= $scope.totalPage; i++) {
                    if (i <= 3 || i >= $scope.totalPage - 2 || (i <= index + 2 && i >= index - 2)) {
                        $scope.pages.push(i);
                    }
                }
                for (var i = 0; i < $scope.pages.length; i++) {
                    if ($scope.pages[i + 1] - $scope.pages[i] >= 2) {
                        $scope.pages.splice(i + 1, 0, "...");
                        i = i + 1;
                    }
                }
                $scope.currentPage = index;
                return false;
            }
            

            $scope.goNext = function () {
                if ($scope.currentPage < $scope.totalPage) {
                    $scope.getStatistics($scope.classIndex, $scope.currentPage + 1);
                }
            }

            $scope.goPrev = function () {
                if ($scope.currentPage > 1) {
                    $scope.getStatistics($scope.classIndex, $scope.currentPage - 1);
                }
                return false;
            }
        });




        function sumData(data) {
            var i;
            var sum = 0;
            for (i = 0; i < data.length; i++) {
                sum = sum + data.y;
            }
            return sum;
        }

        function formatData(data) {
            var i;
            var dataPoints = [];
            for (i = 0; i < data.length; i++) {
                //x = formatDate(data[i].x).toString();
                // alert(x);
                //y = data[i].y;
                dataPoints.push({ label: data[i].x, y: data[i].y });
            }
            // console.trace(dataPoints);
            return dataPoints;
        }


        function formatDate(data) {
            var i, x, y;
            var dataPoints = [];
            for (i = 0; i < data.length; i++) {
                x = toDate(data[i].x).toString();
                //alert(x);
                y = data[i].y;
                dataPoints.push({ label: x, y: y });
            }
            // console.trace(dataPoints);
            return dataPoints;
        }

        //格式化日期
        function toDate(val) {
            var re = /-?\d+/;
            var m = re.exec(val);
            var d = new Date(parseInt(m[0]));
            // 按【2012-02-13 09:09:09】的格式返回日期
            return (d.getMonth() + 1) + "." + d.getDate();
        }

        //自定义日期过滤器
        app.filter("jsonDate", function ($filter) {
            return function (input, format) {

                //从字符串 /Date(1448864369815)/ 得到时间戳 1448864369815
                var timestamp = Number(input.replace(/\/Date\((\d+)\)\//, "$1"));

                //转成指定格式
                return $filter("date")(timestamp, format);
            };
        });

        //秒数格式化过滤器
        app.filter("formatSecond", function () {
            return function (input) {
                    var s = parseInt(input);
                    var t;
                    if (s > -1) {
                        hour = Math.floor(s / 3600);
                        min = Math.floor(s / 60) % 60;
                        sec = s % 60;
                        day = parseInt(hour / 24);
                        if (day > 0) {
                            hour = hour - 24 * day;
                            t = day + '天'+hour+'小时'+min+'分钟'+sec+'秒';
                        }else if (hour > 0) {
                            t =  hour + '小时' + min + '分钟' + sec + '秒';
                        } else if (min > 0) {
                            t =  min + '分钟' + sec + '秒';
                        } else {
                            t = sec + '秒';
                        }
                    }
                    return t;
                
            };
        });
        //百分数过滤器
        app.filter('PercentValue', function () {

            return function (o) {
               
                if (o != undefined && /(^(-)*\d+\.\d*$)|(^(-)*\d+$)/.test(o)) {

                    var v = parseFloat(o);

                    return Number(Math.round(v * 10000) / 100).toFixed(2) + "%";

                } else {

                    return "undefined";

                }

            }

        });
        angular.bootstrap(document.body, ["myApp"]);
    }
    
    ////格式化日期
    //function formatDate(val) {
    //    var re = /-?\d+/;
    //    var m = re.exec(val);
    //    var d = new Date(parseInt(m[0]));
    //    // 按【2012-02-13 09:09:09】的格式返回日期
    //    return d.toLocaleDateString();
    //}

    //$.post("/Home/ChartDailyUser", null, function (data) {
    //    var i, x, y;
    //    var dataPoints = [];
    //    for (i = 0; i < data.length; i++) {
    //        x = formatDate(data[i].x).toString();
    //        // alert(x);
    //        y = data[i].y;
    //        dataPoints.push({ label: x, y: y });
    //    }
    //    //alert(dataPoints);
    //    var chart = new CanvasJS.Chart("chartDailyUser",
    //       {
    //           animationEnabled: true,
    //           zoomEnabled: true,

    //           title: {
    //               text: "注册用户分日走势图"
    //           },
    //           data: [
    //           {
    //               type: "spline",
    //               dataPoints: dataPoints
    //           }
    //           ]
    //       });
    //    chart.render();
    //});



    //$.post("/Home/ChartDailyDiscuss", null, function (data) {
    //    var i, x, y;
    //    var dataPoints = [];
    //    for (i = 0; i < data.length; i++) {
    //        x = formatDate(data[i].x).toString();
    //        // alert(x);
    //        y = data[i].y;
    //        dataPoints.push({ label: x, y: y });
    //    }
    //    //alert(dataPoints);
    //    var chart = new CanvasJS.Chart("chartDailyDiscuss",
    //       {
    //           animationEnabled: true,
    //           zoomEnabled: true,

    //           title: {
    //               text: "注册用户分日走势图"
    //           },
    //           data: [
    //           {
    //               type: "spline",
    //               dataPoints: dataPoints
    //           }
    //           ]
    //       });
    //    chart.render();
    //});


});
