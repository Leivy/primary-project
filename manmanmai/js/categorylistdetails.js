/**
 * Created by Administrator on 2017/7/24.
 */

//修改三级导航栏链接
  //1.修改二级标题的链接
var categoryid=parseInt(location.search.split("&")[1].split("=")[1]);
  $("#secondlink").attr("href","categorylist.html?categoryid="+categoryid);
  //2.修改二级标题的文字
var secondlinktxt;
getTXT(categoryid);
//ajax异步请求,请在success里面修改文本内容
// setTimeout(function () {
//   // console.log(secondlinktxt);
// },1000)
function getTXT(pra) {
  $.get({
    url:"http://localhost:9090/api/getcategorybyid",
    dataType:"json",
    data:{
      categoryid:pra
    },
    success:function (info) {
      // console.log(info);
      secondlinktxt=info.result[0].category;
      // console.log(secondlinktxt);
      $("#secondlink").html(secondlinktxt);
    }
  })
}
  //3.修改三级标题的文字 得在页面渲染完成的success里面修改




var productId=parseInt(location.search.split("=")[1].split("&")[0]);
// console.log(productId);
productList(productId);
//获取商品信息 渲染商品图片 描述 价格和购买链接的table
function productList(pra) {
  // console.log(pra);
  $.get({
    url:"http://localhost:9090/api/getproduct",
    data:{
      productid:parseInt(pra)
    },
    dataType:"json",
    success:function (info) {
      // console.log(info);
      var html=template("priceTemp",info);
      $("#price").html(html);
      var html=template("prolistpic",info);
      $(".prolistpic").html(html);
      
      //修改三级标题文字
      var thirdtxt=$(".prolistpic h5").html().split(" ")[0];
      // console.log(thirdtxt);
      $("#thirdlink").html(thirdtxt);
    }
  })
}

//渲染网友评论页面
netContent(productId);
function netContent(pra) {
  $.get({
    url:"http://localhost:9090/api/getproductcom",
    data:{
      productid:pra
    },
    dataType:"json",
    success:function (info) {
      // console.log(info);
      var html=template("netConTemp",info);
      $(".con-body").html(html);
    }
  })
}