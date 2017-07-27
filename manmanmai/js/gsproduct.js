/**
 * Created by Administrator on 2017/7/24.
 */
$(function () {
  
  //cao 标题也是渲染出来的 三个标题渲染后可加上shopid和areaid
  // function gettitle() {
  //   $.get({})
  //   url:""
  // }
  
  
  //获取京东下拉店铺数据渲染页面
  jdData();
  function jdData() {
    $.get({
      url:"http://localhost:9090/api/getgsshop",
      dataType:"json",
      success:function (info) {
        // console.log(info);
        var html=template("jdbox",info);
        $(".jdbox ul").html(html);
        
        jdclick();
      }
    })
  }
  
  //获取华北下拉地址数据渲染页面
  locationData();
  function locationData() {
    $.get({
      url:"http://localhost:9090/api/getgsshoparea",
      dataType:"json",
      success:function (info) {
        var html=template("locationbox",info);
        $(".locationbox ul").html(html);
        
        locationclick();
  
        
      }
    })
  
  }
  
  //点击事件 给京东的下拉菜单打钩 返回shopid 修改标题内容
  var shopid;
  var areaid;//用全局变量存储两个id
  function jdclick() {
    //点击京东标题 显示隐藏京东的下拉菜单
    $(".jd").click(function () {
      $(".jdbox").toggle();//当前京东的下拉菜单显示隐藏
      $(".locationbox,.pricebox").hide();
    })
    
    //京东下拉菜单打钩 修改标题内容
    $(".selectbox .jdbox li").click(function () {
      $(".selectbox .jdbox li").removeClass("active");
      $(this).addClass("active");
      $(".jd a").html($(this).html());
  
     //用点击当前li的shopid重新渲染页面
     shopid=$(this).data("shopid");
     console.log([shopid,areaid]);
     getprolist(shopid,areaid);
    });
  }
  
  //点击事件 给地址下拉菜单打钩 返回areaid 修改标题内容
  function locationclick() {
    //点击华北标题 显示隐藏地址的下拉菜单
    $(".location").click(function () {
      $(".locationbox").toggle();//当前地址的下拉菜单显示隐藏
    
      $(".jdbox,.pricebox").hide();
    
    })
    
    // 给地址下拉菜单打钩 修改标题内容
   $(".selectbox .locationbox li").click(function () {
      $(".selectbox .locationbox li").removeClass("active");
      $(this).addClass("active");
      var locationtxt=$(this).html().split("（")[0];
      $(".location a").html(locationtxt);
      
      //用当前的areaid重新渲染页面
      areaid = $(this).data("areaid");
      // console.log([shopid,areaid]);
      getprolist(shopid,areaid);
    });
  }
  
  //价格下拉菜单点击事件 显示打钩
  pirceClick();
  function pirceClick() {
    //点击价格标题 显示隐藏价格的下拉菜单
    $(".price").click(function () {
      $(".pricebox").toggle();//当前价格的下拉菜单显示隐藏
    
      $(".jdbox,.locationbox").hide();
    
    })
    
    //点击事件 给价格下拉菜单打钩
    $(".selectbox .pricebox li").click(function () {
      $(this).addClass("active");
    })
  }
  
  //商品列表数据渲染到页面 传入参数是 shopid 和 areaid
  var shopid=1,areaid=1;
  getprolist(shopid,areaid);
  function getprolist(shopid,areaid) {
    $.get({
      url:"http://localhost:9090/api/getgsproduct",
      data:{
        shopid:shopid,
        areaid:areaid
      },
      dataType:"json",
      success:function (info) {
        // console.log(info);
        var html=template("gsprolist",info);
        $(".gsbody ul").html(html);
      }
    })
  }
  
})