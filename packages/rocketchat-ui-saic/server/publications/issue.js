Meteor.methods(
  {
    'issueInsert': function (Attributes) {
      console.log(Attributes);
      var issue = _.extend(Attributes, {
        createDate: GetDateTime('yyyy-MM-dd hh:mm:ss'), updateDate: GetDateTime('yyyy-MM-dd hh:mm:ss'), createBy: {
          "id": "290704bc7e344d4aa67ebb1846cde567"
        },
        updateBy: {
          "id": "290704bc7e344d4aa67ebb1846cde567"
        }
      });
      console.log(issue);
      var result = HTTP.call('POST', mmtServerURL + 'mmt-web/f/mm/mmtQuestion/saveMmtQuestion',
        {
          data: issue
        });
      console.log(result);
      return result;
    },
    'issueList': function (data) {
      console.log(data);
      var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestion/queryMmtQuestion",
        {
          data: data,
          headers:
          {
            server: 'test',
            'signatureMethod': 'md5',
            'format': 'json',
            'version': 1,
            'appKey': "DLM_SCW_APP_REQUEST_HANDLING"
          }
        });
      if (result.data.total == 0) {
        result.data.rows = [];
      }
      console.log(result);
      return result.data;

    },
    'issueDelete': function (id) {

    },
    'issuefindOne': function (id) {
      console.log(id);
      var issue = HTTP.call('GET', mmtServerURL + 'mmt-web/f/mm/mmtQuestion/getMmtQuestion?id=' + id);
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
            data: data,
            headers:
            {
              server: 'test',
              'signatureMethod': 'md5',
              'format': 'json',
              'version': 1,
              'appKey': "DLM_SCW_APP_REQUEST_HANDLING"
            }
          });
        if (result.data.total == 0) {
          result.data.rows = [];
        }
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