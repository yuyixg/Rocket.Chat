Meteor.methods(
  {
    'getitinfobyid': function (data) {
      //  console.log(data);
        var postdata={
              id: data.id
              };

        //var result = HTTP.call('GET', "http://10.90.224.229:8080/mmt-web/a/mm/itinfo/getitinfobyid",
         // {
         //   data: postdata
         // });


           var resultdata = [
            {"id":3,"title":"custome title", "description":"sallency1sallency1sallency1sallency1<br />24ffsdf", "updateDate": 2016-11-01}];
console.log(resultdata);

        console.log(resultdata);
        return resultdata;
      },
    'getitinfoList': {
      post: function (data) {
       console.log(data);
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

        var result = HTTP.call('POST', "http://10.90.224.229:8080/mmt-web/a/mm/itinfo/getitinfolist",
        {
            data: postdata
        });

        console.log(result);
        
        return result.data;
      }
    }
  }
)