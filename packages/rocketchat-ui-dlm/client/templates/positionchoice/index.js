Template.positionchoice.onRendered(function () {
  $('#postionTable').bootstrapTable({
    url: 'getRolesDLM',         //请求后台的URL（*）
    method: 'meteor',                      //请求方式（*）
    //toolbar: '#toolbar',                //工具按钮用哪个容器
    striped: true,                      //是否显示行间隔色
    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
    pagination: false,                   //是否显示分页（*）
    sortable: true,                     //是否启用排序
    sortOrder: "asc",                   //排序方式
    //queryParams: queryParams,//传递参数（*）
    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
    pageNumber: 1,                       //初始化加载第一页，默认第一页
    pageSize: 10,                       //每页的记录行数（*）
    pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
    //search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
    strictSearch: true,
    showColumns: false,                  //是否显示所有的列
    showRefresh: false,                  //是否显示刷新按钮
    minimumCountColumns: 2,             //最少允许的列数
    clickToSelect: true,                //是否启用点击选中行
    //height: 200,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
    uniqueId: "id",                     //每一行的唯一标识pagination，一般为主键列
    showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
    cardView: false,                    //是否显示详细视图
    detailView: false,                   //是否显示父子表
    showHeader: false,
    search: false,
    //classes:  "table-no-bordered",      //
    //data : [
    //         { "id": 1, "name": "ZJJ", "position": '小区经理' }],
    columns: [
      {
        formatter: function (value, row, index) {
          var e =
            '<div><h4>姓名：' +row.name
             +'<br /><br />岗位名称：' + row.position           
             +'</h4></div>';
          return e;
        }
      }
    ]
  });


});
Template.positionchoice.onDestroyed(function () {
  $('.main-content .content').empty();
});

