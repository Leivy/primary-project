/**
 * Created by Administrator on 2017/7/24.
 */
 
window.onload=function () {
  $(".mtop").load("backheader.html",function () {
    
    $(".mtop .mheader").css("background","#f4483e");
    $(".mtop .mheader a").attr("href","coupon.html")
    
    //发送ajax请求
    //获取页面跳转时传输的参数 couponid
    var couponid=location.search.split("=")[1];
    getCoupon(couponid);
    function getCoupon(pra) {
      $.get({
        url:"http://localhost:9090/api/getcouponproduct",
        data:{
          couponid:pra
        },
        dataType:"json",
        success:function (info) {
          console.log(info);
          var html=template("couproTemp",info);
          $(".prolist>ul").html(html);
        }
      })
    }
  
    //修改跳转后的页面标题
    var content;
    getTitle();
    function getTitle() {
      $.get({
        url:"http://localhost:9090/api/getcoupon",
        dataType:"json",
        success:function (info) {
          var arr=info.result;
          for(var i = 0; i < arr.length; i++) {
            if(arr[i].couponId==couponid){
              content=arr[i].couponTitle;
              $(".mtop .mheader span").html(content+"优惠券");
              break;
            }
          }
        }
      })
    }
    
  });
  $(".mfooter").load("footer.html");
  
}