Meteor.methods(
  {
    'issueInsert': function (Attributes) {
      console.log(Attributes);

      var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestion/saveMmtQuestion",
        {
          data: postdata
        });

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
    }
  }
)