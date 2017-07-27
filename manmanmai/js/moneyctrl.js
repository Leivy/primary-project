/**
 * Created by Administrator on 2017/7/24.
 */
$(function () {
  
  var pageid=$("#select option:selected").val() || 1;
  //渲染页面商品列表数据
  getMoney(pageid);
  function getMoney(pra) {
    var pra =pra -1;
    $.get({
      url:"http://localhost:9090/api/getmoneyctrl",
      data:{
        pageid:pra
      },
      dataType:"json",
      success:function (info) {
        // console.log(info);
        var html=template("moneyTemp",info);
        $(".money ul").html(html);
      }
    })
  
  }
  
  //计算分页数目 创建相应数目的option加入select中
  getPaging(pageid);
  function getPaging() {
    $.get({
      url:"http://localhost:9090/api/getmoneyctrl",
      data:{
        // pageid:pra
      },
      dataType:"json",
      success:function (info) {
        console.log(info);
        var totalCount=info.totalCount;
        var pagesize=info.pagesize;
        var column=Math.ceil(totalCount/pagesize);
        for(var i = 0; i < column; i++) {
          var option=document.createElement("option");
          $(option).val(i+1).html((i+1)+"/"+column);
          $("#select").append(option);
        }
      }
    })
  
  }
  
  //下拉选择时 根据页数 重新渲染页面 给select注册change事件
  $("#select").change(function () {
  
    var pageNum=$("#select option:selected").val();
    getMoney(pageNum);
  
  });
  
  //上下页注册点击事件 这样写也没毛病
  /*$(".next").click(function () {
    // console.log($("#select option:last-child").val());
    maxNum=parseInt($("#select option:last-child").val());
    num=parseInt($("#select option:selected").val());
    if(num<maxNum){
      num++;
      getMoney(num);
      $("#select option:nth-child("+num+")").attr("selected","true").siblings().removeAttr("selected");
      $("#select option:selected").val(num);
    }else{
      return false;
    }
  
  })
  $(".pre").click(function () {
    // console.log($("#select option:last-child").val());
    num=parseInt($("#select option:selected").val());
    console.log($("#select option:selected").val());
    if(num>1){
      num--;
      getMoney(num);
      $("#select option:nth-child("+num+")").attr("selected","true").siblings().removeAttr("selected");
      $("#select option:selected").val(num);
    }else{
      return false;
    }
  
  })*/
  
  //还是用上下页控制select的值好了  字符串!!!我日!!!
  $(".next").click(function () {
    var num=parseInt($("#select option:selected").val());
    if(num<parseInt($("#select option:last-child").val())){
      num++;
      document.getElementById('select').value=num;
      $("#select").change();
    }else{
      return false;
    }
  
  })
  $(".pre").click(function () {
    var num=parseInt($("#select option:selected").val());
    if(num>1){
      num--;
      document.getElementById('select').value=num;
      $("#select").change();
    }else{
      return false;
    }
  
  })
  
  
  
})