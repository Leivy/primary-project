/**
 * Created by Administrator on 2017/7/24.
 */
//修改国内折扣页面的页头标题
$(function () {
  //不推荐使用,直接在页面渲染数据后的callback里修改结构内容等
  setTimeout(function () {
    // $(".mtop .mheader span").text("国内折扣");
  },1000)
  
  
  //获取页面跳转时顺带的productid
  var productid=location.search.split("=")[1];
  //获取结构渲染页面
  getPro(productid);
  function getPro(pra) {
    $.get({
      url:"http://localhost:9090/api/getmoneyctrlproduct",
      data:{
        productid:pra
      },
      dataType:"json",
      success:function (info) {
        // console.log(info);
        //渲染评论结构
        var html=template("comment",info);
        $(".comment").html(html);
        //渲染页面商品主结构
        var html=template("sale",info);
        $(".sale").html(html);
      }
    })
  }
  
})