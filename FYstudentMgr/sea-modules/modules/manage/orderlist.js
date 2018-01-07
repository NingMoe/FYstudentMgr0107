
define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    require('bootstrap');
    require('tool');
    require('modules/manage/left-nav.css');
    require('modules/manage/orderlist.css');
    document.title = "我的课程订单" + document.title;
    var angular = require('angular');
    var sanitize = require('angular-sanitize');
    var app = angular.module('myApp', ['ngSanitize']);

    app.controller('orderCtrl', function ($scope, $http, $filter) {
        var list;
        $scope.orderList = {};
        $scope.pageSize = 10;
        $scope.totalCount = 1;
        $scope.isShowDetail = false;
        $scope.isNullResult = false;
        $scope.currentShowIndex = 0;
        $scope.currentStatus = 0;
        $scope.orderStatus = [
             { text: '全部订单', status: 0 },
        { text: '完成订单', status: 1 },
        { text: '已过期订单', status: 2 },
         { text: '未完成订单', status: 3 }

        ];
        $scope.pages = [];
        


        $scope.checkDetail = function (index) {
            $scope.isShowDetail = true;
            $scope.currentShowIndex = index;
        }

        $scope.backToList = function () {
            $scope.isShowDetail = false;
        }
  
        $scope.countDate = function (d1) {
            var days = Math.ceil(d1 - new Date());
            if (days > 0) {
                return days+"天";
            } else {
                return "已结课";
            }
        }

        //按使用情况查看
        $scope.setStatusType = function (type) {
            $scope.currentStatus = type;
            getPage();
        }

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

        }
        //$scope.currentPriceRangeIndex = 0;
        ////排序选项
        //选项过滤器
        $scope.statusFilter = function (e) {
            if ($scope.currentStatus == 0)
                return true;
            else if ($scope.currentStatus == 1)
                return e.orderState == 1;
            else if ($scope.currentStatus == 2)
                return e.orderState == 2;
            else 
                return e.orderState == 0;
        }
       

        //分页
        $scope.currentPage = 1;
        $scope.totalPage = 1;
            
        //$scope.totalPage = $scope.items.length / 2 + 1;
        $scope.goPrev = function () {
            if ($scope.currentPage > 1)
            { $scope.currentPage--; }
        }
        $scope.goNext = function () {
            if ($scope.currentPage < $scope.totalPage) {
                $scope.currentPage++;
            }

        }
        


        //获取过滤后的数据
        function getPage() {
            $scope.orderList = $filter('filter')(list, $scope.statusFilter);
            var length = $scope.orderList.length;
            if (length <= 0) {
                $scope.isNullResult = true;
            } else {
                $scope.isNullResult = false;
            }
            $scope.totalPage = Math.ceil(length / $scope.pageSize);
            $scope.setPage(1);
        }


        //获取数据
        $http.post("/order/getOrderList")
        .success(function (data) {
            list = data.data;
            getPage();
            

        });

        //删除订单
        $scope.delOrder = function (index) {
            var doc = {};
            doc.id = $scope.orderList[index].orderId;
            $http.post("/order/del",doc)
            .success(function (data) {
                if (data.status == "ok") {
                    location.reload();
                } else {
                    alert("删除失败-" + data.message);
                }

            });
        }

        //支付订单
        $scope.goToCashier = function (id) {
            var doc = {};
            doc.id = id;
            $http.post("/order/checkorder", doc)
            .success(function (data) {
                if (data.status == "ok") {
                    location.href = "/order/cashier/" + id;
                } else {
                    alert(data.message);
                    location.reload();
                }
            });
        }
       
    });

    //自定义日期过滤器
    app.filter("jsonDate", function ($filter) {
        return function (input, format) {

            //从字符串 /Date(1448864369815)/ 得到时间戳 1448864369815
            var timestamp = Number(input.replace(/\/Date\((\d+)\)\//, "$1"));

            //转成指定格式
            return $filter("date")(timestamp, format);
        };
    });

       

       
    angular.bootstrap(document.body, ["myApp"]);

    

});