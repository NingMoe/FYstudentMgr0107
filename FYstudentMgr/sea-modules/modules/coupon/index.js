define(function (require, exports, module) {
    require('modules/coupon/card.css')
    var angular = require('angular');
    var sanitize = require('angular-sanitize');
    var app = angular.module('myApp', ['ngSanitize']);
    var ruleue;
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('modules/coupon/card.css')
    require('admincss');
    require('tool');
    //require('progress');
    //require('allRank');
    var date = require('date');
    //require('chart');
    var option = {
        //initialContent: noteContent,
        encodeuri: true,
        initialFrameWidth: 800,
        initialFrameHeight: 150,
        //initialContent: "在这里输入课程的适用对象",
        toolbars: [[
        'fullscreen', 'insertcode', '|', 'bold', 'italic', 'underline', 'forecolor', 'backcolor', 'removeformat', '|', 'emotion', 'link', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'undo', 'redo'
        ]]
    };
    app.controller('cardlistCtrl', function ($scope, $http, $filter) {
        var length;
        var list;
        $scope.totalPage = 1;
        $scope.pageSize = 6;
        $scope.isShowAddCoupon = false;
        $scope.isShowEditCoupon = false;
        $scope.isShowModal = false;
        $scope.delIndex = 0;
        var currentCard;
        $scope.data = {};
        //获取数据
        $http.post("/coupon/getAllCoupon")
        .success(function (data) {
            $scope.cards = data.data;
            list = data.data;
            getPage();


        });

        $scope.orderTypeList = [
             { text: '过期时间升序', orderType: 'OverDate' },
             { text: '过期时间降序', orderType: '-OverDate' },
        { text: '金额升序', orderType: 'Vlaue' },
        { text: '金额降序', orderType: '-Vlaue' },
        { text: '名称升序', orderType: 'CouponName' },
        { text: '名称降序', orderType: '-CouponName' }

        ];

        $scope.types = [
             { text: '折上减', type: 0 },
        { text: '代金券', type: 1 },
        { text: '课程卡', type: 2 }

        ];

      

        $scope.currentType = 0;
        $scope.IsShowOrderSelect = false;
        $scope.orderText = '过期时间升序';
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
       

        //选项过滤器
        $scope.typeFilter = function (e) { return e.Type == $scope.currentType; }
        

        //按卡券类别查看
        $scope.setType = function (type) {
            $scope.currentType = type;
            getPage();
        }
       

        //获取过滤后的数据
        function getPage() {
            $scope.data = $filter('filter')(list, $scope.typeFilter);
            
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
        var isFirstOpen = true;//是否是初次打开添加页面，
        //打开添加卡券或编辑卡券窗口
        $scope.showAddCoupon = function (data) {
            if (isFirstOpen) {//避免多次载入ueditor
                require.async('ueditor', function (ue) {
                    
                    ruleue = ue.init("rule", option);
                    //ruleue.setContent("请输入使用规则");
                    inputForm(data);
                });
                require.async('datepickercss');
                require.async('datepicker', function () {
                    require.async('datepicker-zn');
                    $('#overDate').datetimepicker({
                        language: 'zh-CN',
                        weekStart: 1,
                        todayBtn: 1,
                        autoclose: 1,
                        todayHighlight: 1,
                        startView: 2,
                        minView: 2,
                        forceParse: 0
                    });
                });                                             
                isFirstOpen = false;
            } else {
                inputForm(data);
            }
           
            
        }


        //新增卡券
        $scope.addCoupon = function (isValid) {
            //if (!isValid) {
            //    alert('验证失败');
            //}
            var doc = {};
            doc.CouponName = $scope.couponName;
            doc.Type = $scope.selectType.type;
            doc.Vlaue = $scope.value;
            doc.Rule = ruleue.getURIContent();
            doc.OverDate = $("#overDate").val();
            doc.__RequestVerificationToken = $("input[name='__RequestVerificationToken']").val();
            
            $http.post("/Coupon/new", doc)
                  .success(function (data) {
                      if (data.status == "ok") {
                          location.reload();
                      } else {
                          $scope.isShowAddResult = true;
                      }
                  });
            return false;
        };

        //填充卡券表单内容
        function inputForm(data) {
            if (data == null) {//添加卡券
                $scope.couponName = null;
                $scope.value = 0;
                $scope.overDate = new Date();
                ruleue.setContent("请输入使用规则");

                $scope.isShowAddCoupon = true;
            } else {//编辑卡券
                currentCard = data;//根据id找到卡券
                if (currentCard == null) {
                    return false;
                }
                $scope.couponName = currentCard.couponName;
                $scope.value = currentCard.Vlaue;
                $scope.selectType = $scope.types[currentCard.Type];
                $scope.overDate = $filter('jsonDate')(currentCard.OverDate,'yyyy-MM-dd');
                ruleue.setContent(currentCard.Rule);
                $scope.isShowEditCoupon = true;
            }
        }



        //新增卡券
        $scope.editCoupon = function (isValid) {
            //if (!isValid) {
            //    alert('验证失败');
            //}
            var doc = {};
            doc.CouponID = currentCard.couponID;
            doc.CouponName = $scope.couponName;
            doc.Type = $scope.selectType.type;
            doc.Vlaue = $scope.value;
            doc.Rule = ruleue.getURIContent();
            doc.OverDate = $("#overDate").val();
            doc.__RequestVerificationToken = $("input[name='__RequestVerificationToken']").val();

            $http.post("/Coupon/update", doc)
                  .success(function (data) {
                      if (data.status == "ok") {
                          $scope.backToList();
                          currentCard.couponName = doc.CouponName;
                          currentCard.Type = doc.Type;
                          currentCard.TypeName = $scope.types[currentCard.Type];
                          currentCard.Vlaue = doc.Vlaue;
                          currentCard.Rule = ruleue.getContent();
                          currentCard.OverDate = doc.OverDate;
                          currentCard.DaysRemaining = parseInt(Math.abs(currentCard.OverDate - new Date()) / 1000 / 60 / 60 / 24);
                          copyCoupon();

                      } else {
                          $scope.isShowAddResult = true;
                      }
                  });
            return false;
        };

        //根据id在 js数组中查找卡券对象
        function findCoupon(id) {
            for (var i = 0; i < $scope.cards.length; i++) {
                if ($scope.cards[i].couponID == id) {
                    return $scope.cards[i];
                }
            }
            return null;
        }


        //根据id在 js数组中修改卡券对象
        function copyCoupon() {
            for (var i = 0; i < $scope.cards.length; i++) {
                if ($scope.cards[i].couponID == currentCard.couponID) {
                    $scope.cards[i] = currentCard;
                }
            }
            return null;
        }
        //添加卡券或者编辑卡券是返回列表
        $scope.backToList = function () {
            $scope.isShowAddCoupon = false;
            $scope.isShowEditCoupon = false;
        }

        //删除卡券按钮
        $scope.showDelModal = function (index) {
            $scope.delIndex = index;
            $scope.isShowModal = true;
           

        }
        //删除卡券
        $scope.delCoupon = function () {
            $scope.isShowModal = false;
            var doc = {};
            doc.id = $scope.cards[$scope.delIndex].couponID;
            $http.post("/Coupon/del", doc)
                   .success(function (data) {
                       if (data.status == "ok") {
                           $scope.cards.splice($scope.delIndex, 1);
                           $scope.isDelOkResult = true;
                       } else {
                           $scope.isDelOkResult = false;
                       }
                       $scope.isShowDelResult = true;
                   });


        }


        //关闭弹出框
        $scope.hideModal = function () {
            $scope.isShowModal = false;
            $scope.isShowDelResult = false;
            $scope.isShowAddResult = false;
        }
    });
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