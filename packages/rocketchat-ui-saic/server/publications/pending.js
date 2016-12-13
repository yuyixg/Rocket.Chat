Meteor.methods(
    {
        'acceptbyid': function (data) {
           
            var result = HTTP.call('POST', mmtServerURL + "/mmt-web/f/mm/mmtQuestion/claimQuestion",
                {
                    data: data,
                    params: GetUser()
                });
            console.log(result);
            return result;
        },

        'replyquestion': function (data) {
           
            var result = HTTP.call('POST', mmtServerURL + "/mmt-web/f/mm/mmtQuestionAnswer/saveAnswer",
                {
                    data: data,
                    params: GetUser()
                });
                
            return result;
        }
    }
)
