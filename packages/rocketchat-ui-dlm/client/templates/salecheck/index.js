Template.salecheck.onRendered(function () {
    $('.flex-tab-bar').css("width", "0px");
    $('.main-content').css("right", "0px");
    $('#InvoiceTable').bootstrapTable({
        url: 'getinvoicechangelist',         //请求后台的URL（*）
        method: 'meteor',                      //请求方式（*）
        //toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: false,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams: {},//传递参数（*）
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
        columns: [
            {
                formatter: function (value, row, index) {
                    var e =
                        '<div><h4><lable style="font-weight:bold">' + row.carno + "</label><label style='font-weight:bold;margin-left:50px'>" + row.carbrand + "</lable>"
                        + '<br /><br /><lable>车辆配置：</lable><lable>' + row.vehicleconfiguration
                        + '<br /><br /><lable>车主姓名：</lable><lable>' + row.ownname
                        + '<br /><br /><lable>交车时间：</lable><lable>' + row.deliverydate + '<lable style="margin-left:30px;">上报时间：</lable>' + row.submitdate
                        + '<br /><br /><lable>发票号：</lable><lable>' + row.invoiceno + '<lable style="margin-left:30px;">开票时间：</lable>' + row.billingdate
                        + '<br /><br /><lable>变更原因：</lable><lable>' + row.changereason + "&nbsp;" +
                        '<input style="float:right;" id="' + row.id
                        + '" type="checkbox"></input>'
                        + '</h4></div>';
                    return e;

                }
            }
        ]
    });

    //三包变更
    $('#TreeeTable').bootstrapTable({
        url: 'getthreechangelist',         //请求后台的URL（*）
        method: 'meteor',                      //请求方式（*）
        //toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: false,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams: {},//传递参数（*）
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
        columns: [
            {
                formatter: function (value, row, index) {
                    var e =
                        '<div><h4><lable style="font-weight:bold">' + row.carno + "</label><label style='font-weight:bold;margin-left:50px'>" + row.carbrand + "</lable>"
                        + '<br /><br /><lable>车辆配置：</lable><lable>' + row.vehicleconfiguration
                        + '<br /><br /><lable>车主姓名：</lable><lable>' + row.ownname
                        + '<br /><br /><lable>交车时间：</lable><lable>' + row.deliverydate + '<lable style="margin-left:30px;">上报时间：</lable>' + row.submitdate
                        + '<br /><br /><lable>发票号：</lable><lable>' + row.invoiceno + '<lable style="margin-left:30px;">开票时间：</lable>' + row.billingdate
                        + '<br /><br /><lable>三包状态：</lable><lable>' + row.status + '<lable style="margin-left:30px;">三包申请时间：' + row.applydate
                        + '<br /><br /><lable>三包变更原因：</lable><lable>' + row.changereason + "&nbsp;" +
                        '<input style="float:right;" id="' + row.id
                        + '" type="checkbox"></input>'
                        + '</h4></div>';
                    return e;

                }
            }
        ]
    });

});
Template.salecheck.onDestroyed(function () {
    $('.main-content .content').empty();
    $('.flex-tab-bar').css("width", "40px");
    $('.main-content').css("right", "40px");
});

