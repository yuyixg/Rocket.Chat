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
    }
)
