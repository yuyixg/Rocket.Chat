Meteor.methods(
    {
        //认领
        'acceptbyid': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "/mmt-web/f/mm/mmtQuestion/claimQuestion",
                {
                    data: data,
                    params: GetUser()
                });
            return result;
        },
        //回复
        'replyquestion': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "/mmt-web/f/mm/mmtQuestionAnswer/saveAnswer",
                {
                    data: data,
                    params: GetUser()
                });

            return result;
        },
        //问题补充
        'questionadd': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "/mmt-web/f/mm/mmtQuestionAnswer/supplement",
                {
                    data: data,
                    params: GetUser()
                });
            return result;
        },
        'stafflist': function (data) {
      var result = HTTP.call('POST', mmtServerURL + "/mmt-web/f/sys/user/listUser",
        {
          data: data,
          params: GetUser()
        });
      if (result.data.total == 0) {
        result.data = _.extend(result.data, {
          rows: []
        });
      }
      console.log(result.data);
      return result.data;
    }
    }
)
