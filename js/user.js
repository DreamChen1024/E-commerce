// 保存用户信息
var userInfo = null;


// 向后台发送请求,判断用户是否登录
$.ajax({
    url:"/user/queryUserMessage",
    type:"get",
    //ajax为异步请求,先改为同步,判断用户是否登录,再继续后续操作
    async: false,
    success:function(res) {
        // console.log(res);
        // // 用户没有登录
        if(res.error && res.error == 400) {
            location.href = "login.html";
        } 
        //用户登录了,记录下来
        userInfo = res;
    }
})

$(function() {
    /*
        1.获取退出按钮
        2.调取退出接口
        3.退出成功跳转到首页
    */
    $('#logout').on('tap',function() {
        $.ajax({
            type:"get",
            url:"/user/logout",
            success:function(res){
                if(res.success) {
                    mui.toast("成功退出登录");
                    setTimeout(function(){
                        location.href = "index.html";
                    },2000)
                }
            }
        })
    })

    // 获取用户信息 并且要出来用户未登录的问题
    var html = template("userTpl",userInfo);
    $(userInfoBox).html(html);

    // 底部导航跳转
    mui('.my-footer').on('tap','a',function(){
        window.top.location.href=this.href;
    });
})
