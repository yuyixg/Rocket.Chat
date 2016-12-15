
Template.pendingreply.onRendered(function () {

  $('.flex-tab-bar').css("width", "0px");
  $('.main-content').css("right", "0px");
  var _userid = FlowRouter.getParam('_userid');
  var _id = FlowRouter.getParam('_id');
  var _username = FlowRouter.getParam('_username');

  if (_id) {
    Meteor.call("issuefindOne", _id, function (error, result) {
      // 向用户显示错误信息并终止
      if (error) {
        console.log(error);
        return;
      }
      console.log(result);
      if (result.category.id) {
        $('#category').val(result.category.name);
      }

      $('#pending-form').find('[name=title]').val(result.title);
      $('#pending-form').find('[name=description]').val(result.description);

      for (var att in result.attachUrlList) {
        var attach = result.attachUrlList[att];
        var file = { id: attach.id, name: attach.id, url: attach.attachUrl }
        $('#imagetable').bootstrapTable("append", file);
      }


      if (result.processFlag == 0) {
        $('#reply').hide();
        $('#pull').show();
      } else {
        $('#reply').show();
        $('#pull').hide();
        //console.log(result.mmtQuestionAnswerList.length);
        if (result.mmtQuestionAnswerList.length === 2) {
          replycontrol();

        } else {
          $.each(result.mmtQuestionAnswerList,
            function (idx, item) {
              if (item.answer) {
                $("#replyContent").append("<div><span>回复人：</span><label style='font-weight:normal'  id='other" + item.id + "' /></div>" +
                  "<div><textarea  class='form-control' placeholder='回复内容' id='replyText" + item.id + "' rows='5'></textarea></div><br/>");
                $('#other' + item.id).val(item.createBy.name);
                $('#replyText' + item.id).val(item.answer);
                $('#other' + item.id).attr("readonly", "readonly");
                $('#replyText' + item.id).attr("readonly", "readonly");
              }
            });

        }
      }
    });
    $("#pull").click(function (e) {
      Meteor.call("acceptbyid", _id,
        function (error, result) {
          if (error) {
            return alert(error.reason);
          } else {
            $('#reply').show();
            $('#pull').hide();
            replycontrol();
          };

        });
    });

    $("#reply").click(function (e) {
      var queryParams = {
        id: _id,
        mmtQuestionAnswer: { "forwardUser": +$("txt_other").val(), "answer": +$('#replyText').val() }

      };
      console.log(queryParams.mmtQuestionAnswer.answer);
      Meteor.call("replyquestion", queryParams,
        function (error, result) {
          if (error) {
            return alert(error.reason);
          } else
          { FlowRouter.go('pending-index'); }
        });
    });
    $("#close").click(function (e) {
      e.preventDefault();
      FlowRouter.go('pending-index');
    });

/*
    $("#replyadd").click(function (e) {
      // replycontrol();
      Meteor.call("questionadd", _id,
        function (error, result) {
          if (error) {
            return alert(error.reason);
          } else {
            //$("[name='other']").click(function () {
            //FlowRouter.go('pending-staff', { _id: _id });
            //});
            FlowRouter.go('pending-index');
          };

        });
    });
    */

  }

  var str = "<div class='input-line'><div><div style='display:none'><input type='text'  id='txt_other'>" +
    "</div><input class='input-medium search-query' readonly='true' placeholder='转给他人处理' id='selectother' type='text' />" +
    "<div class='box' id='boxselectother'><div class='box-header with-border'>" +
    "<h3 class='box-title'  style='font-size:14px'>请指定人员</h3><div class='box-tools pull-right'>" +
    "<span class='label label-primary' id='closebox'>关闭</span></div>" +
    "</div><div class='box-body'><div class=input-group input-group-sm'>" +
    "<input type='text' class='form-control' id='txt_search' placeholder='输入姓名'>" +
    "<span class='input-group-btn'>" +
    "<button type='button' id='btn_query' class='btn btn-info btn-flat'>Go!</button></span>" +
    "</div><table id='select_other'></table></div></div></div></div>" +
    "<div><textarea  class='form-control' placeholder='回复内容' id='replyText' rows='5'></textarea></div>";

  function replycontrol() {
    //if (!_userid) {
    //$("#replyContent").append("<div><span>转给他人处理：</span><input type='text' name='other' id='' value=''/></div>" +
    //  "<div><textarea  class='form-control' placeholder='回复内容' id='replyText' rows='5'></textarea></div>");
    // $("#replyContent").append(str);
    //  $('#boxselectother').hide();
    //  bind();

    // } else {
    // $("#replyContent").append("<div><span>转给他人处理：</span><input type='text' name='other' id='" + _userid + "' value='" + _username + "'/></div>" +
    //   "<div><textarea  class='form-control' placeholder='回复内容' id='replyText' rows='5'></textarea></div>");
    $("#replyContent").append(str);
    $('#boxselectother').hide();
    bind();
    // }
  };
  function bind() {
    $('#select_other').bootstrapTable({
      url: 'stafflist',         //请求后台的URL（*）
      method: 'meteor',
      striped: true,                      //是否显示行间隔色
      cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
      pagination: true,                   //是否显示分页（*）
      sortable: false,                     //是否启用排序
      sortOrder: "asc",                   //排序方式
      queryParams: queryParams,//传递参数（*）
      sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
      pageNumber: 1,                       //初始化加载第一页，默认第一页
      pageSize: 10,                       //每页的记录行数（*）
      pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
      search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
      strictSearch: false,
      showColumns: false,                  //是否显示所有的列
      showRefresh: false,                  //是否显示刷新按钮
      minimumCountColumns: 2,             //最少允许的列数
      clickToSelect: true,                //是否启用点击选中行
      // height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
      uniqueId: "id",                     //每一行的唯一标识pagination，一般为主键列
      showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
      cardView: false,                    //是否显示详细视图
      detailView: false,                   //是否显示父子表
      showHeader: true,
      columns: [{
        field: 'name',
        title: '姓名'
      },
      {
        field: 'officeName',
        title: '部门'
      }
      ],
      onClickRow: function (value) {
        $('#selectother').val(value.name);
        $('#txt_other').val(value.id);
        $('#boxselectother').hide();
      }
    });
    $('#closebox').click(function () {
      $('#boxselectother').hide();
    });
    $('#btn_query').click(function () {
      $('#select_other').bootstrapTable('refresh');
    });

    $('#selectother').click(function () {
      $('#boxselectother').show();
    });
  }

  $('#imagetable').bootstrapTable({
    uniqueId: 'name',
    showHeader: false,
    columns: [
      {
        field: 'url',
        title: '预览',
        formatter: function (value, row, index) {
          var image = '<a href="' + value + '" data-lightbox="image1"><img style="width:100px;height:60px" src="' + value + '" /></a>';
          return image;
        }

      }]
  });
})

Template.pendingreply.onDestroyed(function () {
  $('.main-content .content').empty();
  $('.flex-tab-bar').css("width", "40px");
  $('.main-content').css("right", "40px");
})


