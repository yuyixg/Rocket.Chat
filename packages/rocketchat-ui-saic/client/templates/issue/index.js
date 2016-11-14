Template.issueindex.onCreated(function () {

    var elment = $("#grid_paging_part"); //分页插件的容器id
    //if (data.rowCount > 0) {
    var options = { //分页插件配置项
        bootstrapMajorVersion: 3,
        currentPage: 1, //当前页
        numberOfPages: 200, //总数
        totalPages: 100, //总页数
        onPageChanged: function (event, oldPage, newPage) { //页面切换事件
            //loadTables(newPage);
        }
    }

     //  elment.bootstrapPaginator(options); //分页插件初始化
    //}
});