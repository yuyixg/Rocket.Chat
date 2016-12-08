Meteor.methods(
  {
    'issueInsert': function (Attributes) {
      var issue = _.extend(Attributes, {
        createDate: GetDateTime('yyyy-MM-dd hh:mm:ss'), updateDate: GetDateTime('yyyy-MM-dd hh:mm:ss'),
      });

      var result = HTTP.call('POST', mmtServerURL + 'mmt-web/f/mm/mmtQuestion/saveMmtQuestion',
        {
          data: issue,
          params: GetUser()
        });

      return result;
    },
    'issueList': function (data) {
      console.log(data);
      var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestion/queryMmtQuestion",
        {
          data: data,
          params: GetUser()
        });
      if (result.data.total == 0) {
        result.data = _.extend(result.data, {
          rows: []
        });
      }
      return result.data;

    },
    'issuegetcategory': function (query) {
      var data = {
        name: query.q,
        "parent": {
          "id": ""
        }
      };
      var category = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtCategory/queryMmtCategory",
        {
          data: data,
          params: GetUser()
        });
      var mycategory = new Array();
      for (cat in category.data) {
        var child = category.data[cat];
        if (child.parentId != '0') {
          mycategory.push(child);
        }
      }
      return mycategory;
    },
    'issuefindOne': function (id) {
      console.log(id);
      var issue = HTTP.call('GET', 'http://10.90.67.77:8081/mmt-web/f/mm/mmtQuestion/getMmtQuestion?id=' + id, {
        params: GetUser()
      });
      return issue.data;

    }
  }
);
