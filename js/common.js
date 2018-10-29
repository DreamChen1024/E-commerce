$(function() {
    // 底部导航跳转
    mui('.my-footer').on('tap','a',function(){
        window.top.location.href=this.href;
    });
   
    // getParamsByUrl(location.href)
})
 // 获取地址栏参数
 function getParamsByUrl(url, name) {
    //获取地址取?后面的字符串根据&进行分割
    var params = url.substr(url.indexOf('?')+1).split('&');
    // console.log(parms);
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        // console.log(param);
        if(param[0] == name) {
            return param[1];
        }

    }
    return null;
}