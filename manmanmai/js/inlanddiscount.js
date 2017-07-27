/**
 * Created by Administrator on 2017/7/24.
 */
//页面内容渲染
$(function () {
  
  getInland();
  function getInland() {
    $.get({
      url:"http://localhost:9090/api/getinlanddiscount",
      dataType:"json",
      success:function (info) {
        console.log(info);
        var html=template("inland",info);
        $(".inland>ul").html(html);
      }
    })
  }
  
})