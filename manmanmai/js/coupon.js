/**
 * Created by Administrator on 2017/7/24.
 */
$(function () {
  
  $.get({
    url:"http://localhost:9090/api/getcoupon",
    dataType:"json",
    success:function (info) {
      console.log(info);
      var html=template("couponTemp",info);
      $(".coupon ul").html(html);
    }
  })
  
})