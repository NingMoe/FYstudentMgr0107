define(function (require, exports, module) {
    var angular = require('angular');
    var sanitize=require('angular-sanitize');
    var app = angular.module('myApp', ['ngSanitize']);
  
    app.controller('cardlistCtrl', function ($scope, $http, $filter) {
        var length;
        var list;
        $scope.totalPage = 1;
        $scope.pageSize = 6;
        $scope.data = {};
        //获取数据
        $http.post("/coupon/list")
        .success(function (data) {
            $scope.cards = data;
            list = data;
            getPage();
            
            
        });
        
        $scope.orderTypeList = [
             { text: '过期时间', orderType: 'OverDate' },
        { text: '获取时间', orderType: 'ReceiveDate' }
       
        ];

        $scope.useStatus = [
             { text: '未使用', status: 0 },
        { text: '已使用', status: 1 },
        { text: '已过期', status: 2 }

        ];

        $scope.classType = [
             { text: '折上减', classType: 0 },
             { text: '代金券', classType: 1 },
        { text: '课程卡', classType: 2 }

        ];
        $scope.currentClass = 0;
        
        $scope.currentStatus = 0;
        $scope.IsShowOrderSelect = false;
        $scope.IsShowClassSelect = false;
        $scope.orderText = '过期时间';
        $scope.orderType = 'OverDate';

        //设置排序
        $scope.setOrderType = function (type) {
            $scope.orderType = type;
            for (var i in $scope.orderTypeList) {
                if ($scope.orderTypeList[i].orderType == type) {
                    $scope.orderText = $scope.orderTypeList[i].text;
                    
                }
            }
            $scope.IsShowOrderSelect = false;
            //$.each($scope.orderTypeList, function (i, val) {
            //    if (val.orderType == type) {
            //        $scope.orderText = val.text;
            //    }
            //});
        }
        //分类查看
        $scope.classText = function (e) {
            for (var i in $scope.classType) {
                if ($scope.classType[i].classType == e) {
                    return $scope.classType[i].text;

                }
            }

        }

        //选项过滤器
        $scope.statusFilter = function (e) { return e.UseStatus == $scope.currentStatus; }
        $scope.classFilter = function (e) { return e.Type == $scope.currentClass; }
        
        //按使用情况查看
        $scope.setStatusType = function (type) {
            $scope.currentStatus = type;
            getPage();
        }
        $scope.setClassType = function (type) {
            $scope.currentClass = type;
            $scope.IsShowClassSelect = false;
            getPage();
        }

        //获取过滤后的数据
        function getPage() {
            $scope.data = $filter('filter')(list, $scope.statusFilter);
            $scope.data = $filter('filter')($scope.data, $scope.classFilter);
            length = $scope.data.length;
           // console.trace($scope.currentPage);
            $scope.totalPage = Math.ceil(length / $scope.pageSize);
        }

       
        //分页
        $scope.currentPage = 1;
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
       
    });

   
    angular.bootstrap(document.body, ["myApp"]);


    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('modules/coupon/card.css')
    
    require('tool');
    //require('progress');
    //require('allRank');
    var date = require('date');
    //require('chart');
    
});