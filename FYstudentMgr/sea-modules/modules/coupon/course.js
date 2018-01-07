define(function (require, exports, module) {
    var angular = require('angular');
    var sanitize = require('angular-sanitize');
    var couponid;
    var orderResult,resultTemp;
    
  
    exports.init = function (data) {
        couponid = data;
        
        var app = angular.module('myApp', ['ngSanitize']);

        app.controller('courseCtrl', function ($scope, $http, $filter) {
            $scope.pageSize = 1;
            $scope.totalCount = 1;
            //获取数据
            $http.post("/coupon/getCouponInfo/" + couponid)
            .success(function (data) {
                $scope.coupon = data;
                document.title = data.CouponName + document.title;
            });

            $http.post("/coupon/getCourseResult/" + couponid)
            .success(function (data) {
                $scope.courseResult = data;
                orderResult = data;
                getPage();
            });

            
            //价格筛选
            $scope.filterPriceRange = [
                { text: '全部', index: 0,low:0 ,top:100000},
                { text: '200以下', index: 1, low: 0,top:200 },
                { text: '201-500元', index: 2, low: 201,top:500},
                { text: '501-1000元', index: 3, low: 501,top:1000 },
                { text: '1000元以上', index: 4, low: 1001,top:100000 }

            ];
            $scope.currentPriceRangeIndex = 0;
            //排序选项
            $scope.orderOptionList = [
               { text: '人气', index: 0, value: '-StudentCount' },
               { text: '价格升序', index: 1, value: 'DiscountPrice' },
               { text: '价格降序', index: 2, value: '-DiscountPrice' }
              
            ];
            $scope.currentOrderOptionIndex = 0;
            $scope.orderOption = '-StudentCount';
            $scope.setOrderOption = function (index) {
                $scope.currentOrderOptionIndex = index;
                $scope.orderOption = $scope.orderOptionList[index].value;
            }
            //价格过滤器
            $scope.priceFilter = function (e) { return e.DiscountPrice >= $scope.filterPriceRange[$scope.currentPriceRangeIndex].low && e.DiscountPrice <= $scope.filterPriceRange[$scope.currentPriceRangeIndex].top; }

            //价格选择
            $scope.setPriceRange = function (index) {
                $scope.currentPriceRangeIndex = index;
                getPage();
            }

            //分页
            $scope.currentPage = 1;
            $scope.totalPage = 1;
            
            //$scope.totalPage = $scope.items.length / 2 + 1;
            $scope.prev = function () {
                if ($scope.currentPage > 1)
                { $scope.currentPage--; }
            }
            $scope.next = function () {
                if ($scope.currentPage < $scope.totalPage) {
                    $scope.currentPage++;
                }

            }

            //获取分页数据
            function getPage() {
                resultTemp = $filter('filter')(orderResult, $scope.priceFilter);
                length = resultTemp.length;
                $scope.totalCount = length;
                //console.trace($scope.currentPage);
                $scope.totalPage = Math.ceil(length / $scope.pageSize);
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
    }
    


    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('modules/coupon/course.css')

    require('tool');
    //require('progress');
    //require('allRank');
    var date = require('date');
    //require('chart');

});