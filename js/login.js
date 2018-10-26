$(function() {
    /*
        1.获取登录按钮,注册点击事件
        2.获取到输入框中内容
        3.发送ajax请求,进行匹配
    */ 
   $('#login-btn').on('click', function() {
    //    阻止form表单跳转
       event.preventDefault();
    //    获取输入框内容,并去除前后空格
       var username = $("[name = 'username']").val().trim();
       var password = $("[name = 'password']").val().trim();

    //    判断用户是否输入
    if(!username) {
        mui.toast("请输入用户名");
        return;
    }
    if(!password) {
        mui.toast("请输入密码");
        return;
    }
       $.ajax({
           url:"/user/login",
           type:"post",
           data:{
               username: username,
               password: password
           },

           beforeSend:function() {
                $('#login-btn').html("正在登录...");
           },
           success:function(res){
                mui.toast("登录成功");
                $('#login-btn').html("登录");

                setTimeout(function(){
                    //账号密码正确,进行跳转到个人中心
                    location.href = "user.html";
                },2000);
                
           }
       })
   })
})