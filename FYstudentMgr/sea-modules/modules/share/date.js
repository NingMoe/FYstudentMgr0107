define(function (require, exports, module) {
    module.exports = {
        countNow: function (then) {
            var ms = Math.floor((Date.now() - new Date(then)) / 1000);
            //alert(ms);
            if (ms >= 86400) {
                return Math.floor(ms / 86400) + "天前";
            } else if (ms >= 3600) {
                return Math.floor(ms / 3600) + "小时前";
            } else if (ms >= 60) {
                return Math.floor(ms / 60) + "分钟前";
            } else {
                return "刚刚";
            }
        }

    }
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1,  //month   
            "d+": this.getDate(),     //day   
            "h+": this.getHours(),    //hour   
            "m+": this.getMinutes(),  //minute   
            "s+": this.getSeconds(), //second   
            "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter   
            "S": this.getMilliseconds() //millisecond   
        }
        var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(w+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, week[this.getDay()]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    Date.prototype.add = function (part, value) {
        value *= 1;
        if (isNaN(value)) {
            value = 0;
        }
        switch (part) {
            case "y":
                this.setFullYear(this.getFullYear() + value);
                break;
            case "m":
                this.setMonth(this.getMonth() + value);
                break;
            case "d":
                this.setDate(this.getDate() + value);
                break;
            case "h":
                this.setHours(this.getHours() + value);
                break;
            case "n":
                this.setMinutes(this.getMinutes() + value);
                break;
            case "s":
                this.setSeconds(this.getSeconds() + value);
                break;
            default:

        }
    }
});