define(function (require, exports, module) {
   

    

    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    var UE = require('ueditor');
    var option = {
        //initialContent: noteContent,
        encodeuri: true,
        initialFrameWidth: 800,
        initialFrameHeight: 150,
        //initialContent: "在这里输入课程的适用对象",
        toolbars: [[
        'fullscreen', 'insertcode', '|', 'bold', 'italic', 'underline', 'forecolor', 'backcolor', 'removeformat', '|', 'emotion', 'link',  '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'undo', 'redo'
        ]]
    };
    var option2 = {
        //initialContent: noteContent,
        encodeuri: true,
        initialFrameWidth: 800,
        initialFrameHeight: 150,
        //initialContent: "在这里输入课程的适用对象",
        toolbars: [[
        'fullscreen', 'insertcode', '|', 'bold', 'italic', 'underline', 'forecolor', 'backcolor', 'removeformat', '|', 'emotion', 'link', 'simpleupload', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'undo', 'redo'
        ]]
    };
    var rightforue = UE.init("rightfor", option);
    var purposeue = UE.init("purpose", option);
    var description = UE.init("description", option2);
    require('admincss');
    var angular = require('angular');
    var sanitize = require('angular-sanitize');
        var app = angular.module('myApp', ['ngSanitize']);
        app.controller('courseCtrl', function ($scope, $http, $filter, $location) {
            $scope.currentPage = 1;
            $scope.currentOrder = 0;
            $scope.pagesize = 4;
            $scope.isCard = false;
            $scope.category = null;
            $scope.filterCategory = null;
            $scope.isShowFirstLevelCategory = false;
            $scope.isShowSecondLevelCategory = false;
            $scope.isInitialCategoryFilter = false;
            $scope.isNullResult = false;
            $scope.isShowModal = false;
            $scope.delIndex = 0;
            $scope.isShowAddCourse = false;
            $scope.isShowEditCourse = false;
           
            $scope.pages = [];

            //获取用户信息
            $http.post("/account/userIndexInfo")
          .success(function (data) {
              $scope.userInfo = data;
          });
            $http.post("/Course/getAllFilter")
                     .success(function (data) {
                         $scope.category = data.childNodeList;
                         
                             $scope.clearBootCate();
                        
                     });

            $scope.setOrderType = function (order) {
                if ($scope.currentOrder == 1 && order == 1) {
                    order = 2;
                } else if ($scope.currentOrder == 2 && order == 2) {
                    order = 1;
                }

                $scope.getByCategory($scope.currentCateId, 1, $scope.pagesize, order);
                return false;
            }

            $scope.getByCategory = function (id, page, pagesize, order) {
                $scope.currentCateId = id;
                
                var doc = {};
                doc.Id = id;
                doc.pageSize = pagesize;
                doc.page = page;
                doc.order = order;
                $http.post("/Course/queryCourse", doc)
                        .success(function (data) {
                            if (data.status != "ok" || data.data.totalItemCount == 0) {
                                $scope.isNullResult = true;
                            } else {
                                $scope.isNullResult = false;
                                $scope.courseList = data.data.items;
                                $scope.totalCount = data.data.totalItemCount;
                                $scope.totalPage = data.data.pageCount;
                                $scope.currentOrder = order;
                                $scope.setPage(page);
                            }
                        });
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
                return false;
            }

            $scope.initialCategory = function (id) {

                for (var i = 0; i < $scope.category.length; i++) {
                    if ($scope.category[i].cateId == id) {
                        $scope.setFirstLevelCate(i);
                    }
                    for (var j = 0; j < $scope.category[i].childNodeList.length; j++) {
                        if ($scope.category[i].childNodeList[j].cateId == id) {
                            $scope.setSecondLevelCate(j, i);
                        }

                        for (var k = 0; k < $scope.category[i].childNodeList[j].childNodeList.length; k++) {
                            if ($scope.category[i].childNodeList[j].childNodeList[k].cateId == id) {
                                $scope.setSecondLevelCate(j, i, 1);
                                $scope.setCategory(k);
                            }
                        }
                    }
                }
            }

            $scope.setFirstLevelCate = function (index, isget) {
                $scope.firstLevelCate = index;
                $scope.secondLevelCate = null;
                $scope.currentFilterIndex = null;
                $scope.filterCategory = $scope.category[index].childNodeList;
                $scope.isShowFirstLevelCategory = false;
                $scope.isInitialCategoryFilter = false;
                if (isget == null) {
                    $scope.getByCategory($scope.category[index].cateId, 1, $scope.pagesize, 0);
                }
                return false;
            }

            $scope.setSecondLevelCate = function (index, parentIndex, isget) {
                if (parentIndex != null) {
                    $scope.setFirstLevelCate(parentIndex, 1);
                }
                $scope.secondLevelCate = index;
                $scope.currentFilterIndex = null;
                $scope.filterCategory = $scope.category[$scope.firstLevelCate].childNodeList[index].childNodeList;
                $scope.isShowSecondLevelCategory = false;
                if (isget == null) {
                    $scope.getByCategory($scope.category[$scope.firstLevelCate].childNodeList[index].cateId, 1, $scope.pagesize, 0);
                }
                
                return false;
            }

            $scope.setCategory = function (index) {
                if ($scope.secondLevelCate == null) {
                    $scope.setSecondLevelCate(index);
                } else {
                    $scope.getByCategory($scope.category[$scope.firstLevelCate].childNodeList[$scope.secondLevelCate].childNodeList[index].cateId, 1, $scope.pagesize, 0);
                    $scope.currentFilterIndex = index;
                    
                }
                return false;


            }
            //删除课程按钮
            $scope.showDelModal = function (index) {             
                $scope.delIndex = index;
                $scope.isShowModal = true;
               
            
            }

            $scope.delCourse = function () {
                $scope.isShowModal = false;
                var doc = {};
                doc.id = $scope.courseList[$scope.delIndex].CourseID;
                $http.post("/Course/del", doc)
                       .success(function (data) {
                           if (data == "ok") {
                               $scope.courseList.splice($scope.delIndex, 1);
                               $scope.isDelOkResult = true;
                           } else {
                               $scope.isDelOkResult = false;
                           }
                           $scope.isShowDelResult = true;
                       });
                

            }

            //打开新增或编辑课程窗口
            $scope.showAddCourseForm = function (id) {
                if (id == null) {
                    $scope.courseName = null;
                    $scope.subTitle = null;
                    $scope.lessonCount = null;
                    description.setContent("请输入课程介绍");
                    rightforue.setContent("请输入课程适用对象");
                    purposeue.setContent("请输入课程学习目标");
                    $scope.isShowAddCourse = true;
                } else {
                    var doc = {};
                    doc.id = id;
                    $http.post("/Course/getCourseInfo", doc)
                      .success(function (data) {
                          
                          if (data.status == "ok") {
                              $scope.isShowEditCourse = true;
                              $scope.courseName = data.data.courseName;
                              $scope.subTitle = data.data.subTitle;
                              $scope.lessonCount = data.data.lessonCount;
                              //$scope.description = data.data.description;
                              //$scope.rightfor = data.data.rightFor;
                              //$scope.purpose = data.data.purpose;
                              $scope.currentCourseId = data.data.courseId;
                              description.setContent(data.data.description);
                              rightforue.setContent(data.data.rightFor);
                              purposeue.setContent(data.data.purpose);
                              
                          } else {
                              return false;
                          }
                      });
                }
                
            }
            $scope.backToList = function () {
                $scope.isShowAddCourse = false;
                $scope.isShowEditCourse = false;
            }

          
            //新增课程
            $scope.addCourse = function (isValid) {
                //if (!isValid) {
                //    alert('验证失败');
                //}
                var doc = {};
                doc.SubjectID = $scope.currentCateId;
                doc.CourseName = $scope.courseName;
                doc.SubTitle = $scope.subTitle;
                doc.LessonCount = $scope.lessonCount;
                doc.RightFor = rightforue.getURIContent();
                doc.Purpose = purposeue.getURIContent();
                doc.Description = description.getURIContent();
                $http.post("/Course/new", doc)
                      .success(function (data) {
                          if (data == "ok") {
                              $scope.backToList();
                              $scope.clearBootCate();
                          } else {
                              $scope.isShowAddResult = true;
                          }
                      });
                return false;
            };

            //编辑课程
            $scope.editCourse = function (isValid) {
                //if (!isValid) {
                //    alert('验证失败');
                //}
                var doc = {};
                doc.CourseId = $scope.currentCourseId;
                doc.CourseName = $scope.courseName;
                doc.SubTitle = $scope.subTitle;
                doc.LessonCount = $scope.lessonCount;
                doc.RightFor = rightforue.getURIContent();
                doc.Purpose = purposeue.getURIContent();
                doc.Description = description.getURIContent();
                $http.post("/Course/update", doc)
                      .success(function (data) {
                          if (data == "ok") {
                              $scope.backToList();
                              $scope.clearBootCate();
                          } else {
                              $scope.isShowAddResult = true;
                          }
                      });
                return false;
            };


            $scope.hideModal = function () {
                $scope.isShowModal = false;
                $scope.isShowDelResult = false;
                $scope.isShowAddResult = false;
            }

            $scope.showFirstLevelCategory = function () {
                $scope.isShowFirstLevelCategory = true;
            }
            $scope.hideFirstLevelCategory = function () {
                $scope.isShowFirstLevelCategory = false;
            }
            $scope.showSecondLevelCategory = function () {
                $scope.isShowSecondLevelCategory = true;
            }
            $scope.hideSecondLevelCategory = function () {
                $scope.isShowSecondLevelCategory = false;
            }
            $scope.clearBootCate = function () {
                $scope.firstLevelCate = null;
                $scope.secondLevelCate = null;
                $scope.currentFilterIndex = null;
                $scope.isInitialCategoryFilter = true;
                $scope.getByCategory(-1, 1, $scope.pagesize, 0);
                return false;
            }

            $scope.clearCategory = function () {
                if ($scope.secondLevelCate == null) {
                    return false;
                } else {
                    $scope.getByCategory($scope.category[$scope.firstLevelCate].childNodeList[$scope.secondLevelCate].cateId, 1, $scope.pagesize, 0);
                    $scope.currentFilterIndex = null;
                }

                return false;
            }

            $scope.goNext = function () {
                if ($scope.currentPage < $scope.totalPage) {
                    $scope.getByCategory($scope.currentCateId, $scope.currentPage + 1, $scope.pagesize, $scope.currentOrder);
                }
            }

            $scope.goPrev = function () {
                if ($scope.currentPage > 1) {
                    $scope.getByCategory($scope.currentCateId, $scope.currentPage - 1, $scope.pagesize, $scope.currentOrder);
                }
                return false;
            }
            $scope.setCardView = function () {
                $scope.isCard = true;
                return false;
            }
            $scope.setListView = function () {
                $scope.isCard = false;
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
    

    require('modules/course/category.css');
    require('font-awesome');
    //require('scoket');
    require('tool');

});