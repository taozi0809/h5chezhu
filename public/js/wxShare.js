(function(){
    var urlAt = {url:location.href.split('#')[0]}

    var UserInfo = parseURL(urlAt.url).params

    var userInfo = {
        openid:decodeURI(UserInfo.openid),
        nickname:decodeURI(UserInfo.nickname),
        sex:decodeURI(UserInfo.sex),
        province:decodeURI(UserInfo.province),
        city:decodeURI(UserInfo.city),
        country:decodeURI(UserInfo.country),
        headimgurl:decodeURI(UserInfo.headimgurl),
        privilege:decodeURI(UserInfo.privilege),
        unionid:decodeURI(UserInfo.unionid),
    }
    console.log(userInfo)
    $.post('http://e1z9508874.iask.in/index/postUrlAt',urlAt,function(res){
        $.get('http://e1z9508874.iask.in/index/getWechatConfig',function(data){
            var encodeURI1 = encodeURI("http://e1z9508874.iask.in/demo.html")
            var imgurl = "http://e1z9508874.iask.in/images/logo.png"

            var appId = "wx7aafc1fd8b091781"
            var timestamp = data.timestamp
            var nonceStr = data.noncestr
            var signature = data.signature

            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId:appId, // 必填，公众号的唯一标识
                timestamp:timestamp, // 必填，生成签名的时间戳
                nonceStr:nonceStr, // 必填，生成签名的随机串
                signature:signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.ready(function(){
                  wx.onMenuShareTimeline({
                    title: '这是分享到朋友圈的标题', //
                    link:encodeURI1, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl:imgurl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                //获取“分享给朋友”按钮点击状态及自定义分享内容接口
                wx.onMenuShareAppMessage({
                    title: '这是分享给朋友的标题', // 分享标题
                    desc: '这是分享给朋友的描述', // 分享描述
                    link:encodeURI1, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl:imgurl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

            });

            wx.error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        })
    })

    function parseURL(url) {
        var a =  document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function(){
                var ret = {},
                    seg = a.search.replace(/^\?/,'').split('&'),
                    len = seg.length, i = 0, s;
                for (;i<len;i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
            hash: a.hash.replace('#',''),
            path: a.pathname.replace(/^([^\/])/,'/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
            segments: a.pathname.replace(/^\//,'').split('/')
        };
    }
})()