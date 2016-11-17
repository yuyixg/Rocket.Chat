HTTP.methods(
  {
    '/knowledge/getlist': {
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
        var result = HTTP.call('POST', "http://10.90.224.185:8080/mmt-web/a/mm/knowledge/queryKnowledge",
          {
            data: postdata
          });

        console.log(result);
        return result.data;
      }
    }
  }
)