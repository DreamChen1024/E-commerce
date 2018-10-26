/*轮播图JS*/
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});

// 底部导航跳转
mui('.my-footer').on('tap','a',function(){
  window.top.location.href=this.href;
});