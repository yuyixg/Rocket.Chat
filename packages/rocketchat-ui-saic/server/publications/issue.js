Meteor.methods(
  {
    'issueInsert': function (Attributes) {
      console.log(Attributes);
      var issue = _.extend(Attributes, {
        createDate: new Date(), updateDate: new Date(), createBy: {
          "id": "290704bc7e344d4aa67ebb1846cde567"
        },
        updateBy: {
          "id": "290704bc7e344d4aa67ebb1846cde567"
        }
      });
      console.log(issue);
      var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestion/saveMmtQuestion",
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
      var issue = HTTP.call('GET', 'mmt-web/f/mm/mmtQuestion/getMmtQuestion?id=' + id);
      return issue;

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
        var category = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtCategory/queryMmtCategory",
          {
            data: data
          });
        var mycategory = new Array();
        for (cat in category.data) {
          var child = category.data[cat];
          if (child.parentId != '0') {
            mycategory.push(child);
          }
        }
        return mycategory;
      }
    }
  }
)