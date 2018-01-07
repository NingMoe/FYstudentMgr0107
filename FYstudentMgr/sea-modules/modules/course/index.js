define(function (require, exports, module) {
    var angular = require('angular');
    var sanitize = require('angular-sanitize');
    var app = angular.module('myApp', ['ngSanitize']);
    var $ = jQuery = require('jquery');
    app.controller('courseCtrl', function ($scope, $http, $filter) {

        $scope.barIndex = -1;
        var timer;
        //获取分类数据
        $http.post("/subject/SubjectBar")
       .success(function (data) {
           $scope.bar = data;         
       });

        //获取用户信息
        $http.post("/account/userIndexInfo")
      .success(function (data) {
          $scope.userInfo = data;
          var hs = 2;//水平移动速度
          var vs = 2;//垂直移动速度

          var timer = setInterval(function () {
              var logo = $(".sewise-player-ui .logo");
              logo.find("a").text(data.ID);
              var playerui = $(".sewiseplayer-container");
              logo.css("right", Number(logo.css("right").replace("px", "")) + hs + "px");
              //console.trace(logo.css("right"));
              logo.css("top", Number(logo.css("top").replace("px", "")) + vs + "px");
              //console.trace(Number(playerui.css("width").replace("px", "")));
              if (Number(logo.css("right").replace("px", "")) <= 0) {
                  hs = 2;
              }
              if (Number(logo.css("top").replace("px", "")) <= 0) {
                  vs = 2;
              }
              if (Number(logo.css("right").replace("px", "")) >= Number(playerui.css("width").replace("px", ""))) {
                  hs = -2;
              }
              if (Number(logo.css("top").replace("px", "")) >= Number(playerui.css("height").replace("px", ""))) {
                  vs = -2;
              }
          }, 50);
      });
      

        //获取分版块班级展示信息
        $http.post("/course/ClassIndexCategoryShow")
      .success(function (data) {
          $scope.plateList = data;
          $scope.select = [];
          for (i = 0; i < data.length; i++) {
              $scope.select.push(0);
          }
      });


        ///实现菜单的显示隐藏效果
        $scope.showLayer = function (index) {
            if (timer != null) {
                window.clearInterval(timer);
            }
            $(".categary-list").css("display","block");
            $scope.barIndex = index;
           // console.trace(index);
        }
        $scope.hideLayer = function () {
            //$scope.barIndex = -1;
            timer=setTimeout(function () {
                $scope.$apply(function () {  //apply 超时才会执行
                    $scope.barIndex = -1;
                });
            },200);         
        }
        
        $scope.stickLayer = function (index) {
            window.clearInterval(timer);
        }

        $scope.cancelLayer = function () {
            //$scope.barIndex = -1;
            timer = setTimeout(function () {
                $scope.$apply(function () {  //apply 超时才会执行
                    $scope.barIndex = -1;
                });
            }, 200);
        }

        $scope.trialClass = function (id) {
            if (!$scope.userInfo) {
                return false;
            }
            $http.post("/course/trialclass/" + id)
                   .success(function (data) {
                       if (data == "notlogin") {
                           $(".fastlogin").click();
                       } else if (data == "ok") {
                           location.href = "/class/default/" + id;
                       }
                   });

          
        }
        




    });


    angular.bootstrap(document.body, ["myApp"]);

    
    var boot = require('bootstrap');
    require('admincss');
    require('modules/course/index.css');
    require('font-awesome');
    //require('scoket');
    require('tool');
    var out1, out2,ind;


    $(".entry-box li").mouseenter(function () {
        $(this).addClass("hover");

        $(this).find("i").addClass("hover");
        $(this).find(".entry-info").show();
    }).mouseleave(function () {
        $(this).removeClass("hover");
        $(this).find("i").removeClass("hover");
        $(this).find(".entry-info").hide();
    });

});