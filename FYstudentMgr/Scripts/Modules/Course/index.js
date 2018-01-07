var player;
var myurl;
myurl = " http://video.xueqetian.com/lessonvideo/93.m3u8";
var config = {
    elid: "player",//包裹播放器的div容器ID属性值
    autostart: true,
    url: myurl,
    //encodeurl: true,
    server: "vod",
    skinType: "tangerine",
    type: "m3u8",
    //hlsjs: true,
    skin: "vodTangerine",
    title: "学7天-课程介绍",
    lang: "zh_CN",
    seekmode: "ACCURATE",
    claritybutton: 'disable',
    starttime: "0",
    //poster: "http://jackzhang1204.github.io/materials/poster.png",
    logo: "http://image.xueqitian.com/assert/img/video/logo.png?11",
    maxbufferlength: 60,
    //timeNoticeDelay: 1000
};
function dowReady() {
    player = new Sewise.SewisePlayer(config);

    player.startup();

};
$(document).ready(function () {

    dowReady();

});