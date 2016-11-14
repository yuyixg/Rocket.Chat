Template.tasksList.helpers({
  tasks: function () {
    return Tasks.find();
  }
});
Template.tasksList.events({
  'click .remove-department'(e/*, instance*/) {
    e.preventDefault();
    e.stopPropagation();

    swal({
      title: t('Are_you_sure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: t('Yes'),
      cancelButtonText: t('Cancel'),
      closeOnConfirm: false,
      html: false
    }, () => {
      console.log(this._id);
      Meteor.call('taskDelete', this._id, function (error/*, result*/) {
        if (error) {
          return handleError(error);
        }
        swal({
          title: t('Removed'),
          text: t('任务已经被删除'),
          type: 'success',
          timer: 1000,
          showConfirmButton: false
        });
      });
    });
  }
  ,
  'click .task-info'(e/*, instance*/) {
    e.preventDefault();
    FlowRouter.go('task-edit', { _id: this._id });
  }
});
Template.tasksList.onCreated(function () {

  var limit = 1;

  var sub = this.subscribe('task:tasklist',
   '',
    {
      onReady: function () {
        console.log(Tasks.find().count());
        console.log('ready subscribe', arguments);
      },
      onError: function () {
        console.log('error subscribe', arguments);
      }
    });


  this.subscribe('posts', {
    onReady: function () {
      console.log(Posts.find().count());
      console.log('ready post subscribe', arguments);
    },
    onError: function () {
      console.log('error post subscribe', arguments);
    }
  });

});
