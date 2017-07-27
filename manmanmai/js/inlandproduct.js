/**
 * Created by Administrator on 2017/7/24.
 */
 
 
//获取页面跳转时顺带的productid
var inlandid=location.search.split("=")[1];
//获取结构渲染页面
getPro(inlandid);
function getPro(pra) {
  $.get({
    url:"http://localhost:9090/api/getdiscountproduct",
    data:{
      productid:pra
    },
    dataType:"json",
    success:function (info) {
      console.log(info);
      //渲染评论结构
      var html=template("comment",info);
      $(".comment").html(html);
      //渲染页面商品主结构
      var html=template("inlandproduct",info);
      $(".inlandproduct").html(html);
    }
  })
}
