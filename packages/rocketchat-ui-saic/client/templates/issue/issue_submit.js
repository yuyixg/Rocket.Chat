
Template.issueSubmit.onRendered(function () {

  $('.main-content').css("right", "0px");

  var _id = FlowRouter.getParam('_id');
  //当点击分类时候弹出
  $('#category').click(function () {
    var texttree = $('#treecategory').prop('outerHTML');
    console.log(texttree)
    //处理代码 

  });



  $('.jqUploadclass').fileupload(
    'option',
    'redirect',
    'http://localhost:3000/fileupoadresult?%s'
  );

  $('#imagetable').bootstrapTable({
    uniqueId: 'id',
    columns: [{
      field: 'name',
      title: '名称'
    },
    {
      field: 'url',
      title: '预览',
      formatter: function (value, row, index) {
        var image = '<a href="' + value + '" data-lightbox="image1"><img style="width:100px;height:60px" src="' + value + '" /></a>';
        return image;
      }

    },
    {
      field: 'id',
      title: '操作', formatter: function (value, row, index) {
        return "<a class='delete'  onclick='deleteissue(" + value + ")'>删除</a>";
      }
    }],
    data: [{
      id: 1,
      name: 'Item 1',
      price: '$1',
      url: 'http://lokeshdhakar.com/projects/lightbox2/images/image-2.jpg'
    }, {
      id: 2,
      name: 'Item 2',
      price: '$2',
      url: 'http://lokeshdhakar.com/projects/lightbox2/images/image-1.jpg'
    }]
  });
})
Template.issueSubmit.helpers({
  imageuploadCallbacks: function () {
    return {
      finished: function (index, fileInfo, content) {
        if (!fileInfo.error) {
          var url = Uploader.uploadUrl + fileInfo.path + fileInfo.name;
          var file = { id: fileInfo.size, name: fileInfo.name, url: url }
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
  'submit form': function (e) {
    e.preventDefault();
    console.log($('#imagetable').bootstrapTable("getData"));
    console.log($('#audiosource')[0].src);
    return null;
    var postAttributes = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };
    var _id = FlowRouter.getParam('_id');
    if (_id) {
      Tasks.update(_id, { $set: postAttributes }, function (error) {
        if (error) {
          alert(error.reason);
        } else {
          FlowRouter.go('task-list');
        }
      })

    }
    else {
      Meteor.call("taskInsert", postAttributes, function (error, result) {
        // 向用户显示错误信息并终止
        if (error) {
          console.log(error);
          return alert(error.reason);
        }
        console.log(result);
        // 显示结果，跳转页面
        if (!result._id)
          alert('插入失败!');
        FlowRouter.go('task-list');
      });
    }
  },
  'click button.back'(e/*, instance*/) {
    e.preventDefault();
    FlowRouter.go('issue-index');
  },
});
