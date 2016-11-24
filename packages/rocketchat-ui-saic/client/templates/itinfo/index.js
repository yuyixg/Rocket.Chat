Template.itinfoindex.onRendered(function () {

    $('#itinfotable').bootstrapTable({
      url: '/itinfo/getlist',         //请求后台的URL（*）
      method: 'post',                      //请求方式（*）
      //toolbar: '#toolbar',                //工具按钮用哪个容器
      striped: true,                      //是否显示行间隔色
      cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
      pagination: false,                   //是否显示分页（*）
      sortable: true,                     //是否启用排序
      sortOrder: "asc",                   //排序方式
      //queryParams: queryParams,//传递参数（*）
      sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
      pageNumber: 1,                       //初始化加载第一页，默认第一页
      pageSize: 3 ,                       //每页的记录行数（*）
      pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
      //search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
      strictSearch: true,
      showColumns: false,                  //是否显示所有的列
      showRefresh: false,                  //是否显示刷新按钮
      minimumCountColumns: 2,             //最少允许的列数
      clickToSelect: true,                //是否启用点击选中行
      height: 200,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
      uniqueId: "id",                     //每一行的唯一标识pagination，一般为主键列
      showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
      cardView: false,                    //是否显示详细视图
      detailView: false,                   //是否显示父子表
      showHeader: false,
      search: false,
      //classes:  "table-no-bordered",      //
      //data: [
      // { "id": 1, "title": "sallency1", "description": "description description description description description", "updateDate": '2016-11-01' },
      // { "id": 2, "title": "sallency2", "description": "description description description description description", "updateDate": '2016-11-02' },
      // { "id": 3, "title": "sallency3", "description": "description description description description description", "updateDate": '2016-11-03' },
      // { "id": 4, "title": "sallency4", "description": "description description description description description", "updateDate": '2016-11-04' },
      // { "id": 5, "title": "sallency5", "description": "description description description description description", "updateDate": '2016-11-05' }],
      columns: [
        //{
        //  field: 'title',
        //  title: '标题',
        //  width: 300
        //},  {
        //    field: 'updateDate',
        //    title: '更新时间',
        //    width: 100
        //},  {
        //         title: 'View',
        //          field: 'id',
        //          align: 'center',
        //          width: 100,
        //         formatter:function(value,row,index){  
        //           var e = '<a href="/saic/itinfo/index/'+row.id+'">View</a> '; 
        //           return e;  
        //         }
        //    } 
        /*{
          formatter: function (value, row, index) {
            var src = row.src;
            if (src == "" || "undefined") {
              src = "http://img71.nipic.com/file/20160128/13455437_164800102197_1.jpg";
            }
            var detail = '/saic/itinfo/index/' + row.id;
            var e = '<div class="media">' +
              '<a class="pull-left" href="' + detail + '">' +
              '<img class="media-object" src="' + src + '" ' +
              'alt="Media Object"></a>' +
              '<div class="media-body">' +
              '<a href="' + detail + '">' +
              '<h4 class="media-heading">' +
              row.title +
              '</h4></a>' +
              row.description +
              '<br/><label>update:' + row.updateDate + '</label>' +
              '</div></div>';
            return e;
          }
        } */
        {
          formatter: function (value, row, index) {
  
            var detail = '/saic/itinfo/index/' + row.id;
            var e =
              '<div><h4 class="media-heading">' +
              row.title +
              '</h4></div>';
            return e;
          }
        },
        {
          field: 'updateDate',
          title: '更新时间',
          width: 160
        }
      ]
    });
  

 


   var ctx = document.getElementById("myChart").getContext("2d");

  var data = [
    {
      value: 30,
      color: "#F7464A",
      highlight: "#FF5A5E",
      label: "处理中"
    },
    {
      value: 50,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "已答复"
    },
    {
      value: 100,
      color: "#FDB45C",
      highlight: "#FFC870",
      label: "已完成"
    }];


  var defaults = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke: true,

    //String - The colour of each segment stroke
    segmentStrokeColor: "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth: 2,

    //Boolean - Whether we should animate the chart	
    animation: true,

    //Number - Amount of animation steps
    animationSteps: 100,

    //String - Animation easing effect
    animationEasing: "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Pie
    animateRotate: true,

    //Boolean - Whether we animate scaling the Pie from the centre
    animateScale: false,

    //Function - Will fire on animation completion.
    onAnimationComplete: null

  };

  var myChart = new Chart(ctx).Pie(data, defaults);
  //alert(myChart.generateLegend());

  $("#myChart").click( 
    function(evt){
        var activePoints = myChart.getSegmentsAtEvent(evt);  
        alert(activePoints[0]["label"] + ":"+ activePoints[0]["value"]);      
        //FlowRouter.go('task-edit', { _id: this._id });
        /* do something */
    }
);  

  //$('#chartLegend').append(mychart.generateLegend());



});
Template.itinfoindex.onDestroyed(function () {
  $('.main-content .content').empty();
});

Template.itinfodetail.onRendered(function () {
  var getAttributes = {
    id: FlowRouter.getParam('_id')
  };


  Meteor.call("getitinfobyid", getAttributes, function (error, result) {
    // 向用户显示错误信息并终止
    if (error) {
      console.log(error);
      return alert(error.reason);
    }

    //输出
    //$('.page-title').html(item.title);
    $('#itinfodetail').html(result.description);
    $('#itinfotitle').html(result.title);

    if (result.attachment != undefined && result.attachment != "") {
      var link = '<a href="' + result.attachmentlink + '" target="_blank">' + result.attachment + '</a>';
      $('#itAttachment').html(link);
    }

    $('.main-content .fixed-title').css("height", "0px");
    $('.main-content .content').css("margin-top", "0px");

  });
});

Template.itinfodetail.onDestroyed(function () {
  $('.main-content .content').empty();
  $('.main-content .content').css("margin-top", "60px");
  $('.main-content .fixed-title').css("height", "");
  //$('.main-content .page-title').empty();
});

