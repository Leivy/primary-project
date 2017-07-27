/**
 * Created by Administrator on 2017/7/25.
 */

$(function () {
  
  //获取页面跳转后携带的id
  var href=location.search.split("&");
  var brandtitleid=parseInt(href[0].split("=")[1]);
  
  //获取十大品牌数据渲染到页面 参数是品牌标题id  brandtitleid
  // var brandtitleid=0;
  getbrandlist(brandtitleid);
  function getbrandlist(pra) {
    $.get({
      url:"http://localhost:9090/api/getbrand",
      dataType:"json",
      data:{
        brandtitleid:pra
      },
      success:function (info) {
        console.log(info);
        var html=template("rankTemp",info);
        $(".brandrank").html(html);
      }
    })
  
  }
  
  //获取热销产品列表渲染到页面 参数依然是brandtitleid 还有pagesize 展示的数据量   默认是4个
  getprolist(brandtitleid);
  function getprolist(pra) {
    $.get({
      url:"http://localhost:9090/api/getbrandproductlist",
      dataType:"json",
      data:{
        brandtitleid:pra,
        pagesize:4
      },
      success:function (info) {
        // console.log(info);
        var html=template("prolistTemp",info);
        $(".prorank ul").html(html);
        
        
      }
    })
  }
  
  //获取评论区商品列表
  getcomprolist(brandtitleid);
  function getcomprolist(pra) {
    $.get({
      url:"http://localhost:9090/api/getbrandproductlist",
      dataType:"json",
      data:{
        brandtitleid:pra,
        pagesize:4
      },
      success:function (info) {
        // console.log(info);
        var html=template("comproTemp",info);
        $(".commentrank ul").html(html);//商品列表渲染页面
  
        //渲染商品下对应的评论 联系是参数productid
        var productid = $(".mark").data("productid");
        console.log(productid);
        getcomment(productid);
      }
    })
  }
  
  //获取产品评论渲染到页面 参数productid
  function getcomment(pra) {
    $.get({
      url:"http://localhost:9090/api/getproductcom",
      dataType:"json",
      data:{
        productid:pra
      },
      success:function (info) {
        // console.log(info);
        var html=template("commentTemp",info);
        $(".comtolink").html(html);
      }
    })
  }
})