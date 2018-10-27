$(function() {
    /*
        修改密码
        1.获取修改密码按钮 添加点击事件
        2.获取输入框的内容
        3.对输入框中的内容进行校验
        4.调用修改密码接口  实现修改密码功能
        5.跳转到登录页面  重新登录
    */

    $('#modify-btn').on('tap', function() {
        //原密码
        var originPass = $('[name = "originPass"]').val().trim();
        //新密码
        var newPass = $('[name = "newPass"]').val().trim();
        //确认新密码
        var confirmNewPass = $('[name = "confirmNewPass"]').val().trim();
        //认证码
        var vCode = $('[name = "vCode"]').val().trim();

        if(!originPass) {
            mui.toast('请输入原密码');
            return;
        }
        if(newPass != confirmNewPass) {
            mui.toast('两次密码输入不一致,请重新输入');
            return;
        }
        
        $.ajax({
            url:"/user/updatePassword",
            type:"post",
            data:{
                oldPassword: originPass,
                newPassword: newPass,
                vCode:vCode
            },
            success:function(res) {
                console.log(res);
                if(res.success) {
                    mui.toast('修改密码成功');
                    setTimeout(function(){
                        location.href = "login.html";
                    },2000);
                }
            }
        })
        
    });

    //获取修改密码验证码
    $("#getCode").on('tap', function() {
        $.ajax({
            url:"/user/vCodeForUpdatePassword",
            type:"get",
            success:function(res) {
                console.log(res.vCode);
            }
        })
    })
    // 底部导航跳转
    mui('.my-footer').on('tap','a',function(){
    window.top.location.href=this.href;
    });

})

