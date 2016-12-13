
Template.stafflist.onRendered(function () {

    $('.flex-tab-bar').css("width", "0px");
    $('.main-content').css("right", "0px");
    var _id = FlowRouter.getParam('_id');
    $("#search").click(function () {
        $('#stafftable').bootstrapTable('refresh');
    });
    $('#stafftable').bootstrapTable({
        url: 'getknowledgeList',
        method: 'meteor',
        striped: true,
        //是否显示行间隔色
        cache: false,
        //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,
        //是否显示分页（*）
        sortable: true,
        //是否启用排序
        sortOrder: "asc",
        //排序方式
        queryParams: queryParams,
        //传递参数（*）
        sidePagination: "server",
        //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,
        //初始化加载第一页，默认第一页
        pageSize: 8,
        //每页的记录行数（*）
        pageList: [10, 25, 50, 100],
        //可供选择的每页的行数（*）
        //search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,
        //是否显示所有的列
        showRefresh: false,
        //是否显示刷新按钮
        minimumCountColumns: 2,
        //最少允许的列数
        clickToSelect: true,
        //是否启用点击选中行
        //height: 200,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",
        //每一行的唯一标识pagination，一般为主键列
        showToggle: false,
        //是否显示详细视图和列表视图的切换按钮
        cardView: false,
        //是否显示详细视图
        detailView: false,
        //是否显示父子表
        showHeader: false,
        search: false,
        //是否显示父子表  
        columns: [{
            field: 'id'
        }, 
        { field: 'title' }
        ],
        onClickRow: function (value) {
            FlowRouter.go('pending-reply', {_id:_id, _userid: value.id,_username:value.title });
        },
        formatLoadingMessage: function () {
            return "请稍等，正在加载中...";
        }
    });
});

Template.stafflist.onDestroyed(function () {
    $('.main-content .content').empty();
    $('.flex-tab-bar').css("width", "40px");
    $('.main-content').css("right", "40px");
})