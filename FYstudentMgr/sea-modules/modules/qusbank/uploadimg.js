define(function (require, exports, module) {
    var $ = jQuery = require('jquery');
    var boot = require('bootstrap');
    require('admincss');
    require('font-awesome');
    //require("canvasjs");
    //require('scoket');
    require('tool');
    require('main');
    require('upload');
    require('qiniu');
    var courseid = $("#bankname").attr("data-courseid");
    var imgname = $("#bankname").attr("data-id");

    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles',
        container: 'container',
        drop_element: 'container',
        max_file_size: '50kb',
        flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
        //dragdrop: true,
        chunk_size: '0mb',
        // multi_selection: !(mOxie.Env.OS.toLowerCase()==="ios"),
        multi_selection: false,
        uptoken_url: '/Help/UpTokenimg?filename=' + "bankimg/" + imgname,
        // uptoken_func: function(){
        //     var ajax = new XMLHttpRequest();
        //     ajax.open('GET', $('#uptoken_url').val(), false);
        //     ajax.setRequestHeader("If-Modified-Since", "0");
        //     ajax.send();
        //     if (ajax.status === 200) {
        //         var res = JSON.parse(ajax.responseText);
        //         console.log('custom uptoken_func:' + res.uptoken);
        //         return res.uptoken;
        //     } else {
        //         console.log('custom uptoken_func err');
        //         return '';
        //     }
        // },
        domain: 'http://upimg.xueqitian.com',
        get_new_uptoken: false,
        // downtoken_url: '/downtoken',
        // unique_names: true,
        // save_key: true,
        // x_vars: {
        //     'id': '1234',
        //     'time': function(up, file) {
        //         var time = (new Date()).getTime();
        //         // do something with 'time'
        //         return time;
        //     },
        // },
        filters: {
            prevent_duplicates: true,
            // Specify what files to browse for
            mime_types: [
               // {title : "flv files", extensions : "flv"} // 限定flv后缀上传格式上传
           // {title : "Video files", extensions : "flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4"}, // 限定flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4后缀格式上传
            { title: "Image files", extensions: "jpg,gif,png" } // 限定jpg,gif,png后缀上传
           // {title : "Zip files", extensions : "zip"} // 限定zip后缀上传
            ]
        },
        auto_start: false,
        log_level: 5,
        init: {
            // 可以使用该参数来限制上传文件的类型，大小等，该参数以对象的形式传入，它包括三个属性：
            'FilesAdded': function (up, files) {
                plupload.each(files, function (file) {
                    if (!(window.FileReader && window.File && window.FileList && window.Blob)) {
                        //show.innerHTML = '您的浏览器不支持fileReader';
                        alert('您的浏览器不支持fileReader');
                    }

                    //alert(file.getSource());
                    var reader = new mOxie.FileReader();
                    if (!/image\/\w+/.test(file.type)) {
                        $("#preview").html("请确保文件为图像类型");
                        return false;
                    }
                    //alert(reader);

                    //读取文件过程方法
                    //reader.onloadstart = function (e) {
                    //    alert("开始读取....");
                    //}
                    //reader.onprogress = function (e) {
                    //    alert("正在读取中....");
                    //}
                    //reader.onabort = function (e) {
                    //    alert("中断读取....");
                    //}
                    //reader.onerror = function (e) {
                    //    alert("读取异常....");
                    //}
                    reader.onload = function (e) {
                        //alert(e.target.result);
                        //var preloader = new mOxie.Image();
                        ////image. = e.target.result;
                        //preloader.onload = function () {
                        //    var $image = $(new Image());

                        //    $image.data("originWidth", preloader.width);
                        //    $image.data("originHeight", preloader.height);
                        //    $image.attr("src", e.target.result);
                        //    $image.attr("id", "image-id-");

                        //    $image.load();

                        //    $("#preview").html($image);
                        //  }

                        //alert("成功读取....");
                        $("#preview").html('<img width="560" height="344" src="' + e.target.result + '" alt="img">');

                    }

                    reader.readAsDataURL(file.getSource());

                });
            },
            //'BeforeUpload': function (up, file) {

            //},

            //'UploadComplete': function () {
            //    $('#success').show();
            //},
            'FileUploaded': function (up, file, info) {
                //alert("图片上传成功");
                //window.history.back(-1);
                window.location.href = '/Course/Details/' + courseid;
                //var domain = up.getOption('domain');
                //alert(domain);
                //var res = $.parseJSON(info);

                //var sourceLink = domain + "/" + res.key; //获取上传成功后的文件的Url
                //alert(sourceLink);
            },
            'Error': function (up, err, errTip) {
                alert(errTip);
            },
            'Key': function (up, file) {
                var key = "bankimg/" + imgname;//+"."+ Qiniu.getFileExtension(file.name);
                // do something with key
                return key
            }
        }
    });

    $('#up_load').on('click', function () {
        uploader.start();
    });



});