
HTTP.methods(
  {  
 '/getknowledgeList': {
      post: function (data) {
        var result = HTTP.call('POST', mmtServerURL+"mmt-web/f/mm/mmtKnowledge/queryMmtKnowledge",
        {
            data: data
        });
         return result.data.rows;       
      }
    }
  }
)


Meteor.methods(
  {

    'getallcategory': function (data) {   
        var result = HTTP.call('GET', mmtServerURL+"mmt-web/f/mm/mmtCategory/getAllMmtCategory");
        return result.data;      
      },

    'getcategorybyuserid': function (data) {   
       var postdata={
              id: data
        };
        var result = HTTP.call('POST', mmtServerURL+"mmt-web/f/mm/mmtCategory/queryMyMmtCategory",
          {
            data: postdata
          }); 
       console.log(result.data);
        return result.data;
      },

    'getknowledgedetailbyid': function (data) {
        var result = HTTP.call('GET', mmtServerURL+'mmt-web/f/mm/mmtKnowledge/getMmtKnowledge?id='+ data.id);
        return result;
      }  
}
)
