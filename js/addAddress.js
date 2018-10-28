$(function() {
    //初始化PopPicker组件
    var cityPicker = new mui.PopPicker({layer: 3});
    //给picker对象添加数据,数据在city.js
    cityPicker.setData(cityData);
    //获取省市区弹出框
    var showCityPickerBtn = $('#showCityPicker')[0];
    // 给弹出框添加点击事件
    showCityPickerBtn.addEventListener('tap', function(event) {
        //显示Picker
        cityPicker.show(function(items){
            // console.log(items)
            $('[name = "address"]').val((items[0] || {}).text + (items[1] || {}).text + (items[2] || {}).text);
        })
    },false);

    //添加收货地址
    $('#addAddress').on('tap','span',function() {
        //获取输入框内容
        var recipients = $('[name = "recipients"]').val().trim();
        var postcode = $('[name = "postcode"]').val().trim();
        var address = $('[name = "address"]').val().trim();
        var addressDetail = $('[name = "addressDetail"]').val().trim();

        $.ajax({
            url:"/address/addAddress",
            type:"post",
            data: {
                address: address,
                addressDetail: addressDetail,
                recipients: recipients,
                postcode: postcode
            },
            success:function(res) {
                
                location.href = "address.html";
                console.log(res);
                var html = template("addressTpl",res);
                console.log(html);
                $('#address-box').html(html);
            }
        })
    })

})