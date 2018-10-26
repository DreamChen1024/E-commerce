//页面加载入口函数
$(function() {
    
    // 初始化区域滚动组件
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    
    //获取一级分类数据
    $.ajax({
        url:"/category/queryTopCategory",
        type:'get',
        success:function(res) {
            
            var html = template('category-first',{result: res.rows}
            );
            // console.log(res.rows);
            $('.links').html(html);

            //如果一级分类有数据
            if (res.rows.length) {
                //给第一个添加状态
                $('.links').find('a').eq(0).addClass('active');
                //获取第一个一级分类的ID
                var id = res.rows[0].id;
                //根据一级分类id获取二级分类数据
                getSecondCategory(id);
            }
        }
    })

    // 一级分类添加 点击事件
    $('.links').on('click', 'a', function() {
        //获取当前点击的一级分类id
        var id = $(this).attr('data-id');
        // 给当前点击的一级分类添加选中状态
        $(this).addClass('active').siblings().removeClass('active');
        // 调用接口 获取数据
        getSecondCategory(id);
    })

    //获取二级分类数据
    function getSecondCategory (id) {
        $.ajax({
            url:"/category/querySecondCategory",
            type:'get',
            data: {
                id: id
            },
            success : function(res) {
                console.log(res);
                var html = template('category-second',res);
                $('.lists').html(html);
            }
    
        })
    }

    // 底部导航跳转
    mui('.my-footer').on('tap','a',function(){
        window.top.location.href=this.href;
    });
})