Template.tasks11List.helpers({
  tasks: function () {
   // var task = Tasks.find();
   // console.log(task);
    console.log(ShiraPagination.data());


    var result=  Meteor.call('taskgetAll', function (error, result) {
      if (error) {
        return handleError(error);
      }
      var tr=$("cloneTr");
      $.each(result,function(index,item)
      {
        var clonetr=tr.clone();
        clonetr.children("td").each(function(inner_index)
        {
          switch(inner_index)
          {
            case(0):
            {
              $(this).html(index+1);
              break;
            }
               case(1):
            {
              $(this).html(item.title);
              break;
            }
            case(2):
            {
              $(this).html(item.url);
              break;
            }
          }
          clonetr.insertAfter(tr);
        });
        $("cloneTr").hide();
      });
      
      return result;
    });
    //  return task;    
  },
  options: {
    count: 1000,
    limit: 20
  }
});
Template.tasks1List.events({
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
