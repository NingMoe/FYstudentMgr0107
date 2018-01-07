define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('modules/course/intro.css');
    require('admincss');
    require('font-awesome');
    //require('scoket');
    require('tool');
    var angular = require('angular');
    var sanitize = require('angular-sanitize');
    var app = angular.module('myApp', ['ngSanitize']);
    app.controller('classCtrl', function ($scope, $http, $filter, $location) {
        $scope.classId = $("#classid").val();
       // alert($scope.classId);
        $scope.isShowCouponTip = false;
        $scope.isShowFullCouponTip = false;
        $scope.isShowDisCouponList = false;
        $scope.isShowCourseCouponList = false;
        $scope.isShowStateOption = false;
        $scope.currentDisIndex = -1;
        $scope.currentCourseIndex = -1;
        $scope.currentStateIndex = -1;
        $scope.searchContent = null;
        $scope.orderType = ['enrollDate', '-registerDate'];//默认排序
        $scope.pages = [];
        $scope.currentPage = 1;//默认显示第一页
        $scope.pagesize = 10;//每页条数
        //$scope.currentState = -1;//状态过滤数据
        //$scope.currentSex = -1;//性别过滤数据
        //$scope.isShowStateFilter = false;//是否显示状态筛选框
        //$scope.isShowSexFilter = false;//是否显示性别筛选框
        var list;
        //$scope.currentNavIndex = 0;
        $http.post("/class/getClassInfo", { "id": $scope.classId })
                   .success(function (data) {
                       if (data.status == "ok") {
                           $scope.classInfo = data.data;

                           $scope.currentStateIndex = $scope.classInfo.state;

                           //获取所有优惠券信息
                           $http.post("/coupon/discountCoupon")
                                   .success(function (data) {
                                       if (data.status == "ok") {
                                           $scope.disCoupon = data.data;
                                           if ($scope.classInfo.hasCoupon) {
                                               for (var i = 0; i < $scope.disCoupon.length; i++) {
                                                   if ($scope.disCoupon[i].couponID == $scope.classInfo.couponId) {
                                                       $scope.currentDisIndex = i;
                                                   }
                                               }
                                           }
                                           
                                       }

                                   });
                           //获取所有课程卡信息
                           $http.post("/coupon/courseCoupon")
                                   .success(function (data) {
                                       if (data.status == "ok") {
                                           $scope.courseCoupon = data.data;
                                           if ($scope.classInfo.hasFullCoupon) {
                                               for (var i = 0; i < $scope.courseCoupon.length; i++) {
                                                   if ($scope.courseCoupon[i].couponID == $scope.classInfo.fullCouponId) {
                                                       $scope.currentCourseIndex = i;
                                                   }
                                               }
                                           }
                                       }

                                   });
                           $scope.setNav(0);
                       }
                   });
        $scope.courseStates = [
            { text: '待开课', states: 0 },
       { text: '已开课', states: 1 },
       { text: '已结课', states: 2 }

        ];

        $scope.enrollStates = [
           { text: '试听', states: 0 },
      { text: '缴费', states: 1 },
      { text: '重修', states: 2 }

        ];

        $scope.navs = [
           { text: '学员管理', index: 0 },
      { text: '课程卡', index: 1 },
      { text: '数据分析', index: 2 }

        ];

        //$scope.sexs = [ '保密',  '男','女' ];
        //获取用户信息
        $http.post("/account/userIndexInfo")
                .success(function (data) {
                    $scope.userInfo = data;
                });
      

        $scope.showFullCouponTip = function () {
            $scope.isShowFullCouponTip = true;
        }

        $scope.showCouponTip = function () {
            $scope.isShowCouponTip = true;
        }

        $scope.showStateOption = function () {
            $scope.isShowStateOption = true;
        }

        $scope.showDisCouponList = function () {
            $scope.isShowDisCouponList = !$scope.isShowDisCouponList;
        }

        $scope.showCourseCouponList = function () {

            $scope.isShowCourseCouponList = !$scope.isShowCourseCouponList;
        }

        //打开学生班级状态设置下拉菜单
        $scope.showStudentStateOption = function (index) {
            $scope.studentList[index].isShowStateOption = true;
            for (var i = 0; i < $scope.enrollStates.length; i++) {
                if ($scope.enrollStates[i].text == $scope.studentList[index].stateName) {
                    $scope.studentList[index].currentStateIndex = $scope.enrollStates[i].states;
                }
            }
        }
        //关闭学生班级状态设置下拉菜单
        $scope.hideStudentStateOption = function (index) {
            $scope.studentList[index].isShowStateOption = false;
            
        }

        $scope.showBatchStudentStateOption = function () {
            $scope.isShowBatchStateOption = true;
            
        }

        $scope.hideBatchStudentStateOption = function () {
            $scope.isShowBatchStateOption = false;

        }


        //$scope.showStudentStateFilter = function () {
        //    $scope.isShowStateFilter = true;
        //}
        //$scope.showStudentSexFilter = function () {
        //    $scope.isShowSexFilter = true;
        //}
        $scope.hideCouponTip = function () {
            $scope.isShowCouponTip = false;
            $scope.isShowFullCouponTip = false;
            $scope.isShowStateOption = false;
            //$scope.isShowStateFilter = false;
            //$scope.isShowSexFilter = false;
        }


        //设置折扣优惠券
        $scope.setDisCoupon = function (index) {
            $scope.isShowDisCouponList = false;
            if (index == $scope.currentDisIndex) {
                
                return false;
            }

            var doc = {};
            doc.id = $scope.classId;
            doc.couponid = $scope.disCoupon[index].couponID;

            //设置优惠券
            $http.post("/class/setCoupon",doc)
                    .success(function (data) {
                        if (data.status == "ok") {
                            $scope.currentDisIndex = index;
                        }

                    });

            
        }

        //设置学生的班级状态
        $scope.setStudentState = function (parent, index) {
            $scope.studentList[parent].isShowStateOption = false;
            if (index == $scope.studentList[parent].currentStateIndex) {
                return false;
            }

            var doc = {};
            doc.id = $scope.studentList[parent].enrollId;
            doc.state = index;
            $http.post("/class/setEnrollState", doc)
                    .success(function (data) {
                        if (data.status == "ok") {
                            $scope.studentList[parent].currentStateIndex = index;
                            $scope.studentList[parent].stateName = $scope.enrollStates[index].text;
                        }

                    });


        }


        //批量设置学生的班级状态
        $scope.setBatchStudentState = function (index) {
           
            if ($scope.selectedStudent.length<=0) {
                return false;
            }
            var idList = [];

            for (var i = 0; i < $scope.selectedStudent.length; i++) {
                idList.push($scope.selectedStudent[i].enrollId);
            }
            var doc = {};
            doc.id = idList;
            doc.state = index;
            $http.post("/class/setBatchEnrollState", doc)
                    .success(function (data) {
                        if (data.status == "ok") {
                            for (var i = 0; i < $scope.selectedStudent.length; i++) {
                                $scope.selectedStudent[i].currentStateIndex = index;
                                $scope.selectedStudent[i].stateName = $scope.enrollStates[index].text;
                            }
                            
                        }

                    });


        }
        //设置课程卡
        $scope.setCourseCoupon = function (index) {
            $scope.isShowCourseCouponList = false;
            if (index == $scope.currentCourseIndex) {
                return false;
            }

            var doc = {};
            doc.id = $scope.classId;
            doc.couponid = $scope.courseCoupon[index].couponID;

            
            $http.post("/class/setFullCoupon", doc)
                    .success(function (data) {
                        if (data.status == "ok") {
                            $scope.currentCourseIndex = index;
                        }

                    });


        }

        //设置班级状态
        $scope.setState = function (index) {
            $scope.isShowStateOption = false;
            if (index == $scope.currentStateIndex) {
                return false;
            }

            var doc = {};
            doc.id = $scope.classId;
            doc.state = index;


            $http.post("/class/setState", doc)
                    .success(function (data) {
                        if (data.status == "ok") {
                            $scope.currentStateIndex = index;
                        }

                    });


        }

        //选项卡点击
        $scope.setNav = function (index) {
            
            if (index == $scope.currentNavIndex) {
                return false;
            }
            if (index == 0) {
                $scope.currentOrder = -1;
                $scope.getStudent(1);             
            }
            $scope.currentNavIndex = index;
           
         
        }


        //搜索按钮事件
        $scope.search = function () {
         
            $scope.getStudent(1);
        }

        //清除搜索框事件
        $scope.clearSearch = function () {
            $scope.searchContent = null;
            $scope.getStudent(1);
        }
        $scope.getStudent = function (page) {
            var doc = {};
            doc.id = $scope.classId;
            doc.pageSize = $scope.pagesize;
            doc.page = page;
            doc.order = $scope.currentOrder;
            doc.searchString = $scope.searchContent;
                $http.post("/class/getStudent", doc)
                        .success(function (data) {
                            
                            if (data.status != "ok" || data.studentCount == 0) {
                                $scope.isNullStudentResult = true;
                                $scope.studentList = null;
                            } else {
                                $scope.isNullStudentResult = false;
                                $scope.studentList = data.data.items;
                                $scope.totalCount = data.data.studentCount;                               
                                $scope.totalPage = data.data.pageCount;
                                
                                $scope.setPage(page);
                                
                            }

                        });
            
        }

        //设置排序
        $scope.setOrderType = function (order) {
            if (Math.abs($scope.currentOrder) === Math.abs(order) && $scope.currentOrder>0) {
                order = -order;
            } 
            $scope.currentOrder = order;
            $scope.getStudent(1);
            return false;
        }


        //复选框选中学生
        $scope.selectStudent = function (e) {
            e.selected = !e.selected;
            $scope.selectedStudent = $filter('filter')($scope.studentList, $scope.selectFilter);
            return false;
        }

        ////按状态筛选
        //$scope.setStateFilter = function (index) {
        //    $scope.currentState = index;
        //    getPage();
        //    $scope.isShowStateFilter = false;
        //}

        ////按性别筛选
        //$scope.setSexFilter = function (index) {
        //    $scope.currentSex = index;
        //    getPage();
        //    $scope.isShowSexFilter = false;
        //}
        
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

        //过滤器
        $scope.selectFilter = function (e) {          
                return e.selected;                       
        }
        //$scope.stateFilter = function (e) {
        //    if ($scope.currentState == -1) {
        //        return true;
        //    } else {
        //        return e.state == $scope.currentState;
        //    }
            
        //}
        //$scope.sexFilter = function (e) {
        //    if ($scope.currentSex == -1) {
        //        return true;
        //    } else {
        //        return e.sex == $scope.currentSex;
        //    }

        //}
        //获取过滤后的数据
        function getPage() {
            $scope.studentList = list; //$filter('filter')(list, $scope.stateFilter);
            //$scope.studentList = $filter('filter')($scope.studentList, $scope.sexFilter);
            $scope.totalStudentCount = $scope.studentList.length;                       
            $scope.totalPage = Math.ceil($scope.totalStudentCount / $scope.pagesize);
            $scope.setPage(1);
        }

        $scope.goNext = function () {
            if ($scope.currentPage < $scope.totalPage) {
                $scope.getStudent($scope.currentPage + 1);
            }
        }

        $scope.goPrev = function () {
            if ($scope.currentPage > 1) {
                $scope.getStudent($scope.currentPage - 1);
            }
            return false;
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