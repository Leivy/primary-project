/**
 * Created by Administrator on 2017/7/23.
 */
//导航部分 模板引擎,后台引入数据渲染页面
$(function () {
  $.get({
    url:"http://localhost:9090/api/getindexmenu",
    data:{},
    dataType:"json",
    success:function (info) {
      var html=template("mnavTemp",info);
      $(".mnav>ul").html(html);
  
      //点击更多按钮显示隐藏nav导航的最后四个li
      $(".mnav ul li:nth-last-child(-n+4)").hide();
      morebtn=$(".mnav ul li:nth-last-child(-n+5)")[0];
      morebtn.onclick=function () {
        $(".mnav ul li:nth-last-child(-n+4)").toggle();
      }
      
    }
  })
});

//超值折扣产品列表  模板引擎,后台数据渲染页面
$(function () {
  $.get({
    url:"http://localhost:9090/api/getmoneyctrl",
    dataType:"json",
    success:function (info) {
      var html=template("prolistTemp",info);
      $(".proList>ul").html(html);
    }
  })
});

