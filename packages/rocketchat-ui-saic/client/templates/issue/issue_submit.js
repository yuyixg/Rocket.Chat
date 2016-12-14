
Template.issueSubmit.onRendered(function () {

    var self = this;
  saicRendered(self);
  $('#boxselectcategory').hide();
  $('#select_category').bootstrapTable({
    url: 'categorylist',         //请求后台的URL（*）
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
    showHeader: false,
    columns: [{
      field: 'name',
      title: '标题'
    }
    ],
    onClickRow: function (value) {
      console.log(value);

      $('#selecttext_catgory').val(value.name);
      $('#txt_category').val(value.id);
      $('#boxselectcategory').hide();
    }
  });
  $('#closebox').click(function () {
    $('#boxselectcategory').hide();
  });
  $('#btn_query').click(function () {
    $('#select_category').bootstrapTable('refresh');
  });

  $('#selecttext_catgory').click(function () {
    $('#boxselectcategory').show();
  });

  /* 
   //设置下拉框系统
   Meteor.call("issuegetcategory", '', function (error, result) {
     // 向用户显示错误信息并终止
     if (error) {
       console.log(error);
     }
     else {
       $.each(result, function (index, value) {
         $("#txt_category").prepend("<option value='" + value.value + "'>" + value.label + "</option>");
       });
 
     }
   });
   */

  var _id = FlowRouter.getParam('_id');
  if (_id) {
    Meteor.call("issuefindOne", _id, function (error, result) {
      // 向用户显示错误信息并终止
      if (error) {
        console.log(error);
        return;
      }
      console.log(result);
      if (result.category.id) {
        $('#txt_category').val(result.category.id);
        $('#selecttext_catgory').val(result.category.name);
      }
      $('#issue-form').find('[name=title]').val(result.title);
      $('#issue-form').find('[name=description]').val(result.description);

      for (var att in result.attachUrlList) {
        var attach = result.attachUrlList[att];
        var file = { id: attach.id, name: attach.id, url: attach.attachUrl }
        $('#imagetable').bootstrapTable("append", file);
      }

      if (result.mmtQuestionAnswer) {
        var answer = [result.mmtQuestionAnswer];
        $('#answers').bootstrapTable({
          uniqueId: 'id',
          showHeader: true,
          columns: [
            {
              field: 'answer',
              title: '答复详情',
              width:'70%'
            },
            {
              field: 'createDate',
              title: '答复日期',
               width:'30%'
            }
          ],
          data: answer
        });
      }

    });
    //显示回答问题情况
  }
  else {
    $('#backbutton').hide();
    $('#closebutton').hide();
    $('#deletebutton').hide();

  }

  //当点击分类时候弹出
  $('.jqUploadclass').fileupload(
    'option',
    'redirect',
    'http://' + window.location.host + '/fileupoadresult?%s'
  );

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

      },
      {
        field: 'name',
        title: '操作', formatter: function (value, row, index) {
          return '<a href="javascript:void(0)"  class="glyphicon glyphicon-remove"  onclick="deleteissue(&quot;' + value + '&quot;)" >删除</a>';
        }
      }]
  });
})
Template.issueSubmit.helpers({
  imageuploadCallbacks: function () {
    return {
      finished: function (index, fileInfo, content) {
        if (!fileInfo.error) {
          console.log(fileInfo);
          var file = { name: fileInfo.name, url: fileInfo.path }
          $('#imagetable').bootstrapTable("append", file);
        }
        else {
          swal({
            title: "上传出错",
            type: 'error',
            text: fileInfo.error
          });
        }
        console.log(fileInfo);
      }
    }
  }
})
Template.issueSubmit.onDestroyed(function () {
  $('.main-content .content').empty();

  $('.flex-tab-bar').css("width", "40px");
  $('.main-content').css("right", "40px");
})

Template.issueSubmit.events({
  'click .rocket-form .mic': function (e, t) {
    AudioRecorder.start(function () {
      t.$('.stop-mic').removeClass('hidden');
      t.$('.mic').addClass('hidden');
    }
    )
  },
  'click .rocket-form .stop-mic': function (e, t) {
    AudioRecorder.stop(function (blob) {
      var text;
      var reader = new FileReader();

      reader.onload = function (e) {

        text = "<div class='upload-preview'>\n	<audio  style=\"width: 100%;\" controls=\"controls\">\n		<source id='audiosource' src=\"" + e.target.result + "\" type=\"audio/wav\">\n		Your browser does not support the audio element.\n	</audio>\n</div>";
        $("#micRecord").html(text);
      }
      reader.readAsDataURL(blob);
    });
    t.$('.stop-mic').addClass('hidden');
    return t.$('.mic').removeClass('hidden');
  },
  'click button.save': function (e) {
    e.preventDefault();
    var images = $('#imagetable').bootstrapTable("getData");

    var imagearray = [];
    for (i in images) {
      image = images[i];
      console.log(image);
      if (image.id) {
        imagearray.push({ attachUrl: image.url, id: image.id });
      }
      else {
        imagearray.push({ attachUrl: image.url });
      }

    }
    var issueAttributes = {
      category: { id: $('#txt_category').val() },
      title: $('#issue-form').find('[name=title]').val(),
      description: $('#issue-form').find('[name=description]').val(),
      processFlag: "0",
      attachUrlList: imagearray,
      "remarks": ""
    };
    console.log(issueAttributes);
    var _id = FlowRouter.getParam('_id');
    if (_id) {
      _.extend(issueAttributes, { id: _id });
    }

    Meteor.call("issueInsert", issueAttributes, function (error, result) {
      // 向用户显示错误信息并终止
      if (error) {
        swal({
          title: "提交失败",
          type: 'error',
          text: error.reason
        });
      }
      else {
        if (result.flag === 1) {
          swal({
            title: "提交失败",
            type: 'error',
            text: result.errorMsg
          });
          return;
        }
        FlowRouter.go('issue-index');
      }

    });

  },
  'click #gotobackbutton'(e/*, instance*/) {
    e.preventDefault();
    FlowRouter.go('issue-index');
  },

  'click #deletebutton'(e/*, instance*/) {
    e.preventDefault();
    Meteor.call("issuedelete", FlowRouter.getParam('_id'), function (error, result) {
      // 向用户显示错误信息并终止
      if (error) {
        swal({
          title: "删除",
          type: 'error',
          text: error.reason
        });
      }
      else {
        if (result.flag === 1) {
          swal({
            title: "删除错误",
            type: 'error',
            text: result.errorMsg
          });
          return;
        }
        FlowRouter.go('issue-index');
      }

    });
  },
  'click #closebutton'(e/*, instance*/) {
    e.preventDefault();
    Meteor.call("issueclose", FlowRouter.getParam('_id'), function (error, result) {
      // 向用户显示错误信息并终止
      if (error) {
        swal({
          title: "关闭失败",
          type: 'error',
          text: error.reason
        });
      }

      else {
        if (result.flag === 1) {
          swal({
            title: "关闭失败",
            type: 'error',
            text: result.errorMsg
          });
          return;
        }
        FlowRouter.go('issue-index');
      }
    });
  },

});
