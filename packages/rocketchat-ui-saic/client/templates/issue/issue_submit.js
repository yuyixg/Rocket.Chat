
Template.issueSubmit.onRendered(function () {
$('.dept_select').chosen();
  $('.flex-tab-bar').css("width", "0px");
  $('.main-content').css("right", "0px");
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
              title: '答复详情'
            },
            {
              field: 'createDate',
              title: '答复日期'
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
