/**
 * Created by Administrator on 2017/7/25.
 */
$(function () {
  
  //发送请求获取数据渲染页面
  $.get({
    url:"http://localhost:9090/api/getsitenav",
    dataType:"json",
    success:function (info) {
      console.log(info);
      var html=template("friendlink",info);
      $(".friendlink").html(html);
    }
  })
  
})