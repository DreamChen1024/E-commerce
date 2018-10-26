$(function () {
    /* 实现用户搜索按钮跳转到搜索结果页
        1.给搜索按钮添加点击事件
        2.获取用户输入的搜索关键字
        3.判断用户是否输入了搜索关键字
        4.如果用户没有输入  阻止 并给出提示
        5.如果用户输入了  跳转到搜索结果页 并且将用户输入的关键字带到这个页面去 */

    //定义一个数组
    var keyArr = [];
    //给搜索按钮添加点击事件
    $('#search-btn').on('click', function() {
        //获取输入框中的内容
        var keyword = $(this).siblings('input').val();
        // 判断用户是否输入
        if (keyword) {
            //当用户输入时,把获取到的内容存储到数组中,在数组起始的位置添加元素
            keyArr.unshift(keyword);
            //将获取的内容数组存储在本地
            localStorage.setItem('keyArr',JSON.stringify(keyArr));
            location.href = "search-result.html?keyword=" + keyword;

        } else {
            //用户没有输入内容时
            mui.toast('请输入要搜索的商品关键字',{ duration:2000, type:'div' })
        }
    });

    /* 实现历史关键字储存
        1.准备一个储存关键字的数组
        2.当用户点击搜索按钮的时候  将用户搜索的关键字添加到数组中
        3.将数组储存在本地存储中
        4.在页面一加载就判断本地存储中是否有已经存储的关键字
        5.将数据和HTML拼接,将数据渲染到页面中
    */

    //判断本地是否已经存储了
    if (localStorage.getItem('keyArr')){
        //由JSON字符串转换为对象
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        var html = template('historyTpl', {result: keyArr});
        $('.history-box').html(html);
        // console.log(keyArr);
        // console.log(html);
    }

    // 实现清空历史记录
    // 1.给元素添加点击事件
    // 2.清空页面中的数据,清空本地存储的数据

    $('#clear-btn').on('click', function() {
        $('.history-box').html("");
        localStorage.removeItem("keyArr");
    })

    // 底部导航跳转
    mui('.my-footer').on('tap','a',function(){
        window.top.location.href=this.href;
  });
})