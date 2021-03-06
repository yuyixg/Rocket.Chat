
Template.pendingindex.onRendered(function () {
    var self = this;
    saicRendered(self);
    var _type = FlowRouter.getParam('_status');
    if (_type) {

        switch (_type) {
            case '0':
                $('#txt_status').val('全部');
                $("#txt_status").find("option[text='全部']").attr("selected", true);
                break;
            case '1':
                $('#txt_status').val('问题池');
                $("#txt_status").find("option[text='问题池']").attr("selected", true);
                break;
            case '2':
                $('#txt_status').val('待处理');
                $("#txt_status").find("option[text='待处理']").attr("selected", true);
                break;
            case '3':
                $('#txt_status').val('已转交');
                $("#txt_status").find("option[text='已转交']").attr("selected", true);
                break;
            case '4':
                $('#txt_status').val('已答复');
                $("#txt_status").find("option[text='已答复']").attr("selected", true);
                break;
            case '5':
                $('#txt_status').val('已完成');
                $("#txt_status").find("option[text='已完成']").attr("selected", true);
                break;

        }
    }
    $('.flex-tab-bar').css("width", "0px");
    $('.main-content').css("right", "0px");
    $("#search").click(function () {
        $('#pendingtable').bootstrapTable('refresh');
    });
    $('#pendingtable').bootstrapTable({
        url: 'issueallList',
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
        pageSize: 10,
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
        showHeader: true,
        search: false,
        //是否显示父子表  
        columns: [
            {
                field: 'title',
                title: '标题'
            },

            {
                field: 'pendingProcessName',
                title: '状态'
            }
            //{
            //    title: '发布时间',
            //   formatter: function (value, row, index) {
            //        return row.createDate.substr(0, 10);
            //   }
            // }
        ],
        onClickRow: function (value) {
            var status;
            if ($('#txt_status option:selected').text() == "全部")
            { status = "0"; }
            else
            { status = $('#txt_status').get(0).selectedIndex; }
            FlowRouter.go('pending-reply', { _id: value.id, _status: status });
        },
        formatLoadingMessage: function () {
            return "请稍等，正在加载中...";
        }
    });
});

Template.pendingindex.onDestroyed(function () {
    $('.main-content .content').empty();
    $('.flex-tab-bar').css("width", "40px");
    $('.main-content').css("right", "40px");
});