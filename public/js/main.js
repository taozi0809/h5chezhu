$(function(){
    var u = navigator.userAgent;
    var ua = window.navigator.userAgent.toLowerCase();
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    if(!isAndroid){
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            console.log("微信浏览器")
            var wxShareHtml = "<div class=\"wx-share\">\n" +
                "            <img src=\"./img/arrow.png\" alt=\"\">\n" +
                "            <div class=\"wx-share-des\">\n" +
                "                <p>点击右上角</p>\n" +
                "                <p>选择在“在浏览器打开”进行下载</p>\n" +
                "            </div>\n" +
                "        </div>"

            $(".main").append(wxShareHtml)
            $(".download").on("click",function(){
                $(".wx-share").css("display","block")
            })
            $(".wx-share").on('click',function(){
                $(".wx-share").css("display","none")
            })
        }
    }
})