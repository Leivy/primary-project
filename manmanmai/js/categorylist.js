/**
 * Created by Administrator on 2017/7/23.
 */
// console.log(request.getParameter("categoryid"));
// console.log(location.search);
// console.log(location.search.split("=")[1]);


//根据分类页中商品的id categoryId来发送相应的ajax请求获取对应商品的数据渲染页面
var categoryid = location.search.split("=")[1];
catlist(categoryid);
//标题分类名称数据获取和渲染
function catlist(pra) {
  // console.log(pra);
  $.get({
    url: "http://localhost:9090/api/getcategorybyid",
    data: {
      categoryid: parseInt(pra)
    },
    dataType: "json",
    success: function (info) {
      // console.log(info);
      var html = template("pronavTemp", info);
      // console.log(html);
      $(".pronav").append(html);
    }
  })
}

//分页渲染数据
var pageNum = 1;

paging(categoryid, pageNum);
//页面初始化渲染时 加了分页数目的数据渲染实现
function paging(categoryid, pageNum) {
  var pageNum = pageNum || 1;
  $.get({
    url: 'http://localhost:9090/api/getproductlist',
    data: {
      categoryid: categoryid,
      pageid: pageNum
    },
    dataType: "json",
    success: function (info) {
      // console.log(info);
      var html = template("prolistTemp", info);
      // console.log(html);
      $(".prolist>ul").html(html);
      //分页数目
      var pageCon = Math.ceil(info.totalCount / info.pagesize)
      for (var i = 0; i < pageCon; i++) {
        var option = document.createElement("option");
        $(option).val(i + 1).html((i + 1) + "/" + pageCon);
        $(".page>select").append(option);
      }
    }
  })
}

//页面后续刷新  剔除了分页功能的页面数据渲染
function pagingOnly(categoryid, pageNum) {
  $.get({
    url: 'http://localhost:9090/api/getproductlist',
    data: {
      categoryid: categoryid,
      pageid: pageNum
    },
    dataType: "json",
    success: function (info) {
      // console.log(info);
      var html = template("prolistTemp", info);
      $(".prolist>ul").html(html);
    }
  })
}

//点击分页select  重新渲染页面
$(".page>select").change(function () {
  var pageNum = $(".page>select  option:selected").val();
  pagingOnly(categoryid, pageNum);
})

//点击上下页 重新定义select option的值
$(".next").click(function () {
  var count = $(".page select option:selected").val();
  if (count < $(".page select option:last-child").val()) {
    count++;
    document.getElementById('select').value = count;
    $(".page>select").change();
  } else {
    return false;
  }
})
$(".pre").click(function () {
  var count = $(".page select option:selected").val();
  if (count > 1) {
    count--;
    document.getElementById('select').value = count;
    $(".page>select").change();
  } else {
    return false;
  }
})
