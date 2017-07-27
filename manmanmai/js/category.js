/**
 * Created by Administrator on 2017/7/23.
 */

//列表 标题
$(function () {
  //渲染标题页面
  titles();
  function titles() {
    $.get({
      url: "http://localhost:9090/api/getcategorytitle",
      dataType: "json",
      success: function (info) {
        var html = template("headTemp", info);
        $(".category .box").html(html);
        var arr = info.result;//取出标题返回数据中的titleid
        var cathId = [];//定义一个数组存放所有的titleid
        for (var i = 0; i < arr.length; i++) {
          cathId.push(arr[i].titleId);//存储下所有的id
        }
        for (var i = 0; i < cathId.length; i++) {
          //渲染标题下的内容页面
          render(cathId[i]);//遍历titleid数组,将对应的商品list放入对应id的catcon中
        }
        
        //注册点击显示列表事件  必须在success里注册,这里页面数据才是真正渲染出来的
        $(".catHead").click(function () {
          var id=$(this).data("titleid");//显示id对应的catcon
          $(".catCon[data-titleid='"+id+"']").slideToggle ();//当前id对应的内容显示隐藏
          for(var i = 0; i < cathId.length; i++) {
            if(cathId[i]==id){
              continue;
            }//除了当前id,其他的全部隐藏
            $(".catCon[data-titleid='"+cathId[i]+"']").slideUp();
          }
        })
      }
    })
    
  }
  
  //列表内容 数据渲染页面 定义函数
  function render(cathead) {
    $.get({
      url: "http://localhost:9090/api/getcategory",
      dataType: "json",
      data: {
        titleid: cathead
      },
      success: function (info) {
        console.log(info);
        var html = template("conTemp", info);
        $(".category .catCon[data-titleid=" + cathead + "]").html(html);
      }
    })
  }
  
  
  
    
});

