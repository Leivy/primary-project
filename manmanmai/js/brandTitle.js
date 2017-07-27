/**
 * Created by Administrator on 2017/7/25.
 */

$(function () {
  
  //获取品牌大全标题列表渲染到页面
  getbrandlist();
  function getbrandlist() {
    $.get({
      url:"http://localhost:9090/api/getbrandtitle",
      dataType:"json",
      success:function (info) {
        console.log(info);
        var html=template("brandlistTemp",info);
        $(".brandlist ul").html(html);
      }
    })
  }
  
})