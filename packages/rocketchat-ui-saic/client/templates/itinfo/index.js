Template.itinfoindex.onRendered(function () {
  saicRendered();
  $('#itinfotable').bootstrapTable({
    url: 'getlist',         //请求后台的URL（*）
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
    pageSize: 3,                       //每页的记录行数（*）
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

          var detail = '/saic/itinfo/index/' + row.id;
          var e =
            '<div><h4 class="media-heading">' +
            row.title +
            '</h4></div>';
          return e;
        }
      },
      {
        //field:'update_date'
        formatter: function (value, row, index) {
          return row.createDate.substr(0, 10);//;
        }
      }
    ]
  });


  var ctx = document.getElementById("myChart").getContext("2d");
  Meteor.call("getQuestionCount", "", function (error, result) {
    // 向用户显示错误信息并终止
    if (error) {
      console.log(error);
      return alert(error.reason);
    }
    console.log(result);
    //myCount: 3, inProcessCount: 1, finishedCount
    var data = [
      {
        value: result.inProcessCount,
        color: "#F7464A",
        highlight: "#FF5A5E",
        label: "处理中"
      },
      {
        value: result.myCount,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "已答复"
      },
      {
        value: result.finishedCount,
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
      //onAnimationComplete: null
    };

    var myChart = new Chart(ctx).Pie(data, defaults);
    $("#chartLegend").append(myChart.generateLegend());

    $("#myChart").click(
      function (evt) {
        var activePoints = myChart.getSegmentsAtEvent(evt);
        //alert(activePoints[0]["label"] + ":"+ activePoints[0]["value"]); 
        var typeName = activePoints[0]["label"];
        var typeid = 0;
        if (typeName == "处理中")
          typeid = 1;
        else if (typeName == "已答复")
          typeid = 2;
        else if (typeName == "已完成")
          typeid = 3;

        FlowRouter.go('issue-indextype', { _type: typeid });
      });

  });

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

