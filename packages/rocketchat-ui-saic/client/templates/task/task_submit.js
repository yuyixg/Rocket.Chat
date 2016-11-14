Template.taskSubmit.events({
  'submit form': function (e) {
    e.preventDefault();
    var postAttributes = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };
    var _id = FlowRouter.getParam('_id');
    if(_id)
    {
      Tasks.update(_id,{$set:postAttributes},function(error)
      {
        if(error)
        {
          alert(error.reason);
        }else
        {
             FlowRouter.go('task-list');
        }
      })
      
    }
    else{
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
    FlowRouter.go('task-list');
  },
});
Template.taskSubmit.onCreated(function () {
  var _id = FlowRouter.getParam('_id');
  this._id=_id;
  this.subscribe('task:tasklist', _id, {
    onReady: function () {
      console.log('ready post subscribe', arguments);
    },
    onError: function () {
      console.log('error post subscribe', arguments);
    }
  });
});
Template.taskSubmit.helpers({
  task: function () {
    var _id = FlowRouter.getParam('_id');
    console.log(_id);
    var task= Tasks.findOne({ _id,_id });
    console.log(task);
    return task;
  }

});