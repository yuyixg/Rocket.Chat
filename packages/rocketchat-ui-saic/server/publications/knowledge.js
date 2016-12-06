Meteor.methods(
  {
    'getknowledgeList': function (data) {
      var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtKnowledge/queryMmtKnowledge",
        {
          data: data
        });
      if (result.data.total === 0) {
             result.data = _.extend( result.data, { rows:[]});
          } 
        return result.data;
    },

        'getallcategory': function(data) {
            var result = HTTP.call('GET', mmtServerURL + "mmt-web/f/mm/mmtCategory/getAllMmtCategory");
            return result.data;
        },

        'getcategorybyuserid': function(data) {
            //var postdata={
            //       id: data
            //  };
            var result = HTTP.call('GET', mmtServerURL + "mmt-web/f/mm/mmtCategory/queryMyMmtCategory");
            //    {
            //     data: postdata
            //   }); 
            //  console.log(result.data);
            return result.data;
        },

        'getknowledgedetailbyid': function(data) {
            var result = HTTP.call('GET', mmtServerURL + 'mmt-web/f/mm/mmtKnowledge/getMmtKnowledge?id=' + data.id);
            return result;
        },
        'addToFavorite': function(data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtCategory/addToFavorite",
                {
                    data: data
                });
            return result;
        },

        'removeFromFavorite': function(data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtCategory/removeFromFavorite",
                {
                    data: data
                });
            return result;
        }
    }
)
