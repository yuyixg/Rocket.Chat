Meteor.methods(
  {
    'issueInsert': function (Attributes) {
      var issue = _.extend(Attributes, {
        createDate: GetDateTime('yyyy-MM-dd hh:mm:ss'), updateDate: GetDateTime('yyyy-MM-dd hh:mm:ss'),
      });
      console.log(issue);
      var result = HTTP.call('POST', mmtServerURL + 'mmt-web/f/mm/mmtQuestion/saveMmtQuestion',
        {
          data: issue,
          params: GetUser()
        });
      console.log(result);
      return result;
    },
    'issueList': function (data) {
<<<<<<< HEAD
      var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestion/queryMyQuestion",
=======
      console.log(data);
      var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestion/queryMmtQuestion",
>>>>>>> 5d2e56c896419c301bc69ab60b6d59e8d43643ef
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
    'issuegetcategory': function (options) {
      var data = {
        name: options,
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
          mycategory.push({ label: child.name, value: child.id });
        }
      }

      return mycategory;
    },
    'issuefindOne': function (id) {
      console.log(id);
      var issue = HTTP.call('GET', mmtServerURL + 'mmt-web/f/mm/mmtQuestion/getMmtQuestion?id=' + id, {

        params: GetUser()
      });
      return issue.data;
    },
    'issuedelete': function (id) {
      var result = HTTP.call('POST', mmtServerURL + 'mmt-web/f/mm/mmtQuestion/deleteMmtQuestion', {
        data: { id: id },
        params: GetUser()
      });
   
      return result.data;

    },
    'issueclose': function (id) {
      console.log(id);
      var result = HTTP.call('POST', mmtServerURL + 'mmt-web/f/mm/mmtQuestion/closeMmtQuestion', {
        data: { id: id },
        params: GetUser()
      });

      return result.data;

    }


  }
);
