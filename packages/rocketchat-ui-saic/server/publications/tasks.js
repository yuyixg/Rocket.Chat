Tasks = new Mongo.Collection('tasks');
//Future = Meteor.npmRequire('fibers/future');
//Soap = Meteor.npmRequire('soap')
Meteor.publish('task:tasklist', function (_id) {
  var result = HTTP.call('POST', "http://mp.openapi.sit.chexiang.com/services/DLMAppService/requestHandling", {
    data: {
      appRequestVO: {
        requestCode: "1001",
        requestParams: {
          account: "DealerAmyTest01_TUIGUANG2",
          password: "123456"
        }
      }
    },
    headers:
    {
      server: 'Tengine',
      date: gettime('yyyyMMddhhmmss'),
      'signatureMethod': 'md5',
      'format': 'json',
      'version': 1,
      'appKey': "DLM_SCW_APP_REQUEST_HANDLING"
    }
  });
  console.log(result);
  console.log(Tasks.find().count());
  if (s.trim(_id)) {
    return Tasks.find({ _id: _id });
  }
  else {
    return Tasks.find();
  }
});

HTTP.methods(
  {
    '/test/test': {
      post: function (data) {
      //  console.log(data);
        var postdata={
              title: "",
              page: {
                "pageNo": "1",
                "pageSize": "10",
                "orderBy": "update_date"
        }};
        postdata.title=data.search;
        postdata.page.pageNo=data.offset+1;
        postdata.page.pageSize=data.limit;
       // console.log(postdata);
        var rdata = { rows: [{ id: 1, name: "11" }], total: 1 };
        var result = HTTP.call('POST', "http://10.90.224.229:8080/mmt-web/a/mm/knowledge/queryKnowledge",
          {
            data: postdata
          });

        console.log(result);
        return result.data;
      }
    }
  }
)

function gettime(format) {
  var d = new Date();
  var date = {
    "M+": d.getMonth() + 1,
    "d+": d.getDate(),
    "h+": d.getHours(),
    "m+": d.getMinutes(),
    "s+": d.getSeconds(),
    "q+": Math.floor((d.getMonth() + 3) / 3),
    "S+": d.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}

Tasks.allow(
  {
    update: function (userId, task) {
      return true;
    }
  }
);
Meteor.methods(
  {
    'taskInsert': function (taskAttributes) {
      console.log(taskAttributes);
      var user = Meteor.user();
      console.log(user);
      var task = _.extend(taskAttributes, { userId: user._id, submitted: new Date() });
      console.log(task);
      var taskid = Tasks.insert(task);
      console.log(taskid);
      return { _id: taskid };
    },
    'taskUpdate': function (taskAttributes) {
      console.log(taskAttributes);
      var user = Meteor.user();
      console.log(user);
      var task = _.extend(taskAttributes, { userId: user._id, submitted: new Date() });
      console.log(task);
      var taskid = Tasks.insert(task);
      console.log(taskid);
      return { _id: taskid };
    },
    'taskDelete': function (id) {
      Tasks.remove(id);
    },
    'taskfindOne': function (id) {
      console.log(id);
      var task = Tasks.findOne({ _id: id });
      console.log(task);
      return task;
    },
    'taskgetAll': function () {

      var task = Tasks.find().fetch();
      console.log(task);
      return task;
    }

  }
);