
Template.pendingreply.onRendered(function () {

      $('.flex-tab-bar').css("width", "0px");
    $('.main-content').css("right", "0px");

  var _id = FlowRouter.getParam('_id');
  if (_id) {
    Meteor.call("issuefindOne", _id, function (error, result) {
      // 向用户显示错误信息并终止
      if (error) {
        swal({
          title: "加载失败",
          type: 'error',
          text: error.reason
        });
      }
      console.log(result);
      if (result.category.id) {
        $('#category').tokenInput("add", { id: result.category.id, name: result.category.name });
      }
      $('#pending-form').find('[name=title]').val(result.title);
      $('#pending-form').find('[name=description]').val(result.description);

      for (var att in result.attachUrlList) {
        var attach = result.attachUrlList[att];
        var file = { id: attach.id, name: attach.id, url: attach.attachUrl }
        $('#imagetable').bootstrapTable("append", file);
      }


    });
  }


  //当点击分类时候弹出
  $('#category').tokenInput('pendinggetcategory', {
    hintText: "请输入需要填写的系统。",//中文字时候需要输入空格。  
    noResultsText: "没有结果。",
    searchingText: "查询中...",
    tokenLimit: 1,
    method: 'meteor',
    theme:'facebook'
  });




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
          return '<a href="javascript:void(0)"  class="glyphicon glyphicon-remove"  onclick="deletepending(&quot;' + value + '&quot;)" >删除</a>';
        }
      }]
  });
})
Template.pendingreply.helpers({
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
Template.pendingreply.onDestroyed(function () {
    $('.main-content .content').empty();

    $('.flex-tab-bar').css("width", "40px");
    $('.main-content').css("right", "40px");
})

Template.pendingreply.events({
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
    var pendingAttributes = {
      category: { id: $('#category').val() },
      title: $('#pending-form').find('[name=title]').val(),
      description: $('#pending-form').find('[name=description]').val(),
      processFlag: "0",
      attachUrlList: imagearray,
      "remarks": ""
    };
    var _id = FlowRouter.getParam('_id');
    if (_id) {
      _.extend(pendingAttributes, { id: _id });
    }

    Meteor.call("pendingInsert", pendingAttributes, function (error, result) {
      // 向用户显示错误信息并终止
      if (error) {
        swal({
          title: "提交失败",
          type: 'error',
          text: error.reason
        });
      }
      else {
        FlowRouter.go('pending-index');
      }

    });

  },
  'click button.back'(e/*, instance*/) {
    e.preventDefault();
    FlowRouter.go('pending-index');
  },
});
