$(function() {
    // 底部导航跳转
    mui('.my-footer').on('tap','a',function(){
        window.top.location.href=this.href;
    });
    
})