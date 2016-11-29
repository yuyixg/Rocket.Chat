Meteor.methods(
  {
    'issueInsert': function (Attributes) {
      console.log(Attributes);
      var issue = _.extend(Attributes, {
        createDate: '2016-11-24 16:08:17', updateDate: '2016-11-24 16:08:17', createBy: {
          "id": "290704bc7e344d4aa67ebb1846cde567"
        },
        updateBy: {
          "id": "290704bc7e344d4aa67ebb1846cde567"
        }
      });
      console.log(issue);
      var result = HTTP.call('POST', 'http://10.90.67.77:8081/mmt-web/f/mm/mmtQuestion/saveMmtQuestion',
        {
          data: issue
        });
      console.log(result);
      return result;
    },
    'issueUpdate': function (Attributes) {
      console.log(Attributes);

    },
    'issueDelete': function (id) {

    },
    'issuefindOne': function (id) {
      console.log(id);
      var issue = HTTP.call('GET', 'http://10.90.67.77:8081/mmt-web/f/mm/mmtQuestion/getMmtQuestion?id=' + id);
      return issue.data;

    }
  }
);

HTTP.methods(
  {
    '/issue/getlist': {
      post: function (data) {
        var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestion/queryMmtQuestion",
          {
            data: data
          });

        console.log(result);
        return result.data;
      }
    },
    '/issue/getcategory': {
      post: function (q) {
        var str = q.toString("utf-8");
        var name = decodeURI(str).replace('q=', '');
        var data = {
          name: name,
          "parent": {
            "id": ""
          }
        };
        console.log(data);
        var category = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtCategory/queryMmtCategory",
          {
            data: data
          });
        var mycategory = new Array();
        console.log(category);
        for (cat in category.data) {
          var child = category.data[cat];
          if (child.parentId != '0') {
            mycategory.push(child);
          }
        }
        console.log(mycategory);
        return mycategory;
      }
    }
  }
)