/// <reference path="jquery/jquery-3.1.1.min.js" />
seajs.config({
    // 配置插件
    plugins: ['shim'],
    base: "/sea-modules/",//"http://jing.xueqitian.com//sea-modules/",
    // 配置别名
    alias: {
        // 配置 jquery 的 shim 配置，这样我们就可以通过 require('jquery') 来获取 jQuery
        'jquery': 'jquery/jquery-3.1.1.min',//注意，这里是从sea.js所在目录的上两节目录开始查找文件
        'bootstrap': 'bootstrap/bootstrap',
        'socket': 'socket/socket',
        'password': 'bootstrap/password',
        'validator': 'jquery/jquery.validate',
        'unobtrusive': 'jquery/jquery.validate.unobtrusive',
        'tool': 'modules/share/tool',
        'loginform': 'modules/share/loginform',
        'logincss': 'modules/share/loginform.css',
        'date': 'modules/share/date',
        'page': 'modules/share/page.css',
        'chart': 'bootstrap/chart',
        'progress': 'modules/class/progress',
        'allRank': 'modules/class/allRank',
        'ueditor-all': 'ueditor/ueditor.all',
        'ueditor-config': 'ueditor/ueditor.config',
        'ueditor-parse': 'ueditor/ueditor.parse',
        'ueditor-css': 'ueditor/themes/default/css/ueditor.min.css',
        'ueditor': 'ueditor/ueditor',
        'sewise': 'player/sewise',
        'swfobject': 'player/js/swfobject',
        'perfectScrollbar': 'jquery/perfectScrollbar',
        'stickup': 'jquery/stickup',
        'admincss': 'css/admin.css',
        'font-awesome': 'font-awesome/font-awesome.min.css',
        'excanvas': 'flot/excanvas.min',
        'flot': 'flot/jquery.flot',
        'canvasjs': 'bootstrap/canvasjs.min',
        'upload': 'qiniu/plupload.full.min',
        'qiniu': 'qiniu/qiniu',
        'main': 'qiniu/main.css',
        'qiniuprogress': 'qiniu/ui',
        'highlight': 'qiniu/highlight',
        'highlightcss': 'qiniu/highlight.css',
        'waypoints': 'jquery/jquery.waypoints.min',
        'datepickercss': 'bootstrap/bootstrap-datetimepicker.min.css',
        'datepicker': 'bootstrap/bootstrap-datetimepicker.min.js',
        'datepicker-zn': 'bootstrap/bootstrap-datetimepicker.zh-CN.js',
        'angular': 'angularjs/angular.min',
        'angular-sanitize': 'angularjs/angular-sanitize.min.js',
        'fuqianla':'https://lib.fuqian.la/pcjssdk.4.0.js'
    },
    map: [
    [ /^(.*\.(?:css|js))(.*)$/i, '$1?20170420' ]
    ]
});