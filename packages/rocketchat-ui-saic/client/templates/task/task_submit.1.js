Template.taskSubmit.events({
  'submit form': function (e) {
    e.preventDefault();
    var postAttributes = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };
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
  },
  'click button.back'(e/*, instance*/) {
    e.preventDefault();
    FlowRouter.go('task-list');
  },
});
Template.taskSubmit.onCreated(function () {
  this.subscribe('task:tasklist', {
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

    var id = FlowRouter.getParam('_id');
    Meteor.call("taskfindOne", id, function (error, result) {
      // 向用户显示错误信息并终止
      if (error) {
        console.log(error);
        return alert(error.reason);
      }
      console.log(result);
      // 显示结果，跳转页面
      $('#title').val(result.title);
       $('#url').val(result.url);
      return result;
    });

  },

});