
HTTP.methods(
  {  
 '/getknowledgeList': {
      post: function (data) {
      // console.log(data);       
      var postdata={
              title: "",
              page: {
                "pageNo": "1",
                "pageSize": data.limit
        }};

        var result = HTTP.call('POST', "http://10.64.20.165:8080/mmt-web/f/mm/mmtKnowledge/queryMmtKnowledge",
        {
            data: postdata
        });
      console.log(result.data);
       var datalist;
       if (data.listid==1) {
          datalist=[
            {"id":1, "title":"test1","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":2, "title":"test2","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":3, "title":"test3","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":4, "title":"test4","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":5, "title":"test5","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":6, "title":"test6","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":7, "title":"test266","categoryNames":"EP","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":8, "title":"test36","categoryNames":"EP","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":9, "title":"test455","categoryNames":"EP","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":10, "title":"test55","categoryNames":"EP","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":11, "title":"test61","categoryNames":"EP","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":12, "title":"test52","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":13, "title":"test43","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":14, "title":"test34","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":15, "title":"test75","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 }];
       }else{
          datalist=[
            {"id":1, "title":"test221","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":2, "title":"test32","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":3, "title":"test323","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":4, "title":"test124","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 },
            {"id":5, "title":"test123125","categoryNames":"DMS","author":"me","publishFlagName":"审核", "updateDate": 2016-11-01 }];
       }
        
        return datalist;
      }
    }
  }
)


Meteor.methods(
  {
    'getcategorybyid': function (data) {
       // var postdata={
       //       id: data.id
        //      };
        //alert(postdata);
        //var result = HTTP.call('GET', "http://10.90.224.229:8080/mmt-web/a/mm/itinfo/getitinfobyid",
         // {
         //   data: postdata
         // });
           var resultdata = [
           {"parentid":1,"name":"服务应用系统","child":[{"id":122,"title":"FDAPP"},{"id":111,"title":"ETS"},{"id":122,"title":"同行"},{"id":122,"title":"EP"},{"id":122,"title":"SAP"},{"id":122,"title":"DMS"},{"id":122,"title":"Portal站点"}]},
           {"parentid":2,"name":"工程应用系统","child":[{"id":122,"title":"远程工作站"},{"id":111,"title":"TCE"},{"id":122,"title":"GBOM"},{"id":122,"title":"PQCP"},{"id":122,"title":"LLR"},{"id":122,"title":"EKB"},{"id":122,"title":"EVMS"},{"id":122,"title":"Datagates"},{"id":122,"title":"AIMS"},{"id":122,"title":"TDM"},{"id":122,"title":"HPC"}]},
           {"parentid":3,"name":"制造应用系统","child":[{"id":122,"title":"IMES"},{"id":111,"title":"PTMES"},{"id":122,"title":"工控系统"},{"id":122,"title":"QDAS"}]},
           {"parentid":4,"name":"OA服务","child":[{"id":122,"title":"邮件"},{"id":111,"title":"个人网盘"},{"id":122,"title":"共享文件夹"},{"id":122,"title":"信息资源申请"},{"id":122,"title":"打印机"},{"id":122,"title":"OA软件"},{"id":122,"title":"电脑硬件"},{"id":122,"title":"网络问题"}]},
           {"parentid":5,"name":"其它服务","child":[{"id":122,"title":"账号咨询"},{"id":111,"title":"应用权限申请"},{"id":122,"title":"License"}]}
           ];
        return resultdata;
      },

    'getknowledgedetailbyid': function (data) {
     
        var postdata={
              id: data.id
              };
        //var result = HTTP.call('GET', "http://10.90.224.229:8080/mmt-web/a/mm/itinfo/getitinfobyid",
         // {
         //   data: postdata
         // });


           var resultdata = [
            {"id":1,"title":"test1", "description":"this is a test", "updateDate": 2016-11-01}];
        console.log(resultdata);
        return resultdata;
      }  
}
)
