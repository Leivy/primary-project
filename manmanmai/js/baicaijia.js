/**
 * Created by Administrator on 2017/7/24.
 */
$(function () {
//获取标题的数据渲染页面
  $.get({
    url:"http://localhost:9090/api/getbaicaijiatitle",
    dataType:"json",
    success:function (info) {
      // console.log(info);
      var html=template("baiTil",info);
      $("#baiTitle ul").html(html);
      // 获取所有的li,计算ul的宽度
      var liwidth=Math.ceil($("#baiTitle li").outerWidth(true));
      var ulwidth=liwidth*$("#baiTitle li").length+20;
      $("#baiTitle ul").css("width",ulwidth);
  
      //只有结构渲染完成后才能找到对象T_T
      
      //iscroll插件控制滚动效果
      new IScroll('#baiTitle', {
        scrollX:true,//横向滚动
        scrollY:false//纵向滚动
      });
      
      //注册点击事件添加active样式  并且渲染对应id的商品列表
      $("#baiTitle li:first-child").addClass("active");
      $("#baiTitle li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        //根据id获取对应商品列表渲染到页面中
        var titleid=$(this).data("titleid");
        getProlist(titleid);
      });
      
    }
  })
  
  
//根据标题id获取对应的商品列表渲染到页面
  var titleid=0;//初始化渲染页面 好吧这是测试写的 但是不想改了
  getProlist(titleid);
  function getProlist(pra) {
    $.get({
      url:"http://localhost:9090/api/getbaicaijiaproduct",
      data:{
        titleid:pra
      },
      dataType:"json",
      success:function (info) {
        // console.log(info);
        var html=template("bailistTemp",info);
        $(".baiprolist ul").html(html);
      }
    })
  }
  
  
  //根据页面滚动显示to top的小图标
  $(".tohead").hide();
  $(window).scroll(function () {
    if($(window).scrollTop()>300){
      $(".tohead").show();
    }else{
      $(".tohead").hide();
    }
  })
})