Meteor.methods(
  {
    'issueInsert': function (Attributes) {
      console.log(Attributes);

       var result = HTTP.call('POST', mmtServerURL+"mmt-web/f/mm/mmtQuestion/saveMmtQuestion",
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

    }
  }
);

HTTP.methods(
  {
    '/issue/getlist': {
      post: function (data) {
        console.log(data);
        var postdata={
              title: "",
              page: {
                "pageNo": "1",
                "pageSize": "10",
                "orderBy": "update_date"
        }};
        postdata.title=data.title;
        postdata.page.pageNo=data.offset+1;
        postdata.page.pageSize=data.limit;
        console.log(postdata);
        var rdata = { rows: [{ id: 1, name: "" }], total: 1 };
        var result = HTTP.call('POST', mmtServerURL+"mmt-web/f/mm/mmtQuestion/queryMmtQuestion",
          {
            data: postdata
          });

        console.log(result);
        return result.data;
      }
    }
  }
)