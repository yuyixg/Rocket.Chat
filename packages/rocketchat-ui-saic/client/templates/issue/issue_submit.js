
Template.issueSubmit.onRendered(function () {
  var _id = FlowRouter.getParam('_id');
  

  $('#imagetable').bootstrapTable({
    uniqueId: 'id',
    columns: [ {
      field: 'name',
      title: '名称'
    },
    {
      field:'url',
      title: '预览',
       formatter: function (value, row, index) {
        return '<img style="width:100px;height:60px" src="http://www.runoob.com/wp-content/uploads/2013/12/icon-default-screenshot.png">';
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
      price: '$1'
    }, {
      id: 2,
      name: 'Item 2',
      price: '$2'
    }]
  });
})
Template.issueSubmit.helpers({
  imageuploadCallbacks: function () {
    return {
      finished: function (index, fileInfo, content) {
        console.log(fileInfo);
      }
    }
  }
})
Template.issueSubmit.onDestroyed(function () {
  $('.main-content .content').empty();
})



Template.issueSubmit.events({
  'submit form': function (e) {
    e.preventDefault();
    console.log( $('#imagetable').bootstrapTable("getData")) ;
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
