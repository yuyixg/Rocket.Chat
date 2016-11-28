
Template.issueSubmit.onRendered(function () {

  $('.main-content').css("right", "0px");

  var _id = FlowRouter.getParam('_id');
  //当点击分类时候弹出
  $('#category').tokenInput('/issue/getcategory',{  
        theme: "facebook",  
        hintText: "请输入需要填写的系统。",//中文字时候需要输入空格。  
        noResultsText: "没有结果。",  
        searchingText: "查询中..." ,
        tokenLimit:1  ,
        method:'POST'     
    });


  var hosturl = 'http://' + window.location.host;
  console.log(hosturl);
  $('.jqUploadclass').fileupload(
    'option',
    'redirect',
    hosturl + '/fileupoadresult?%s'
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
      }],
    data: [{
      name: 'Item 1',
      url: 'http://lokeshdhakar.com/projects/lightbox2/images/image-2.jpg'
    }, {
      name: 'Item 2',
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
  'click button.save': function (e) {
    e.preventDefault();
    console.log($('#imagetable').bootstrapTable("getData"));
    var issueAttributes = {
      category: { id: $('#category').val() },
      title: $(e.target).find('[name=title]').val(),
      description:$(e.target).find('[name=description]').val(),
      processFlag: "0",
      "remarks": ""
    };
    var _id = FlowRouter.getParam('_id');
    if (_id) {
      FlowRouter.go('task-list');
    }
    else {
      Meteor.call("issueInsert", issueAttributes, function (error, result) {
        // 向用户显示错误信息并终止
        if (error) {
          console.log(error);
          return alert(error.reason);
        }
        FlowRouter.go('task-list');
      });
    }
  },
  'click button.back'(e/*, instance*/) {
    e.preventDefault();
    FlowRouter.go('issue-index');
  },
});
