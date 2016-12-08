Meteor.methods(
    {
        'acceptbyid': function (data) {
            var result = HTTP.call('POST',  "http://10.90.67.77:8081/mmt-web/f/mm/mmtQuestion/claimQuestion",
                {
                    data: data,
                    params: GetUser()
                });
            if (result.data.total === 0) {
                result.data = _.extend(result.data, { rows: [] });
            }

            return result.data;
        }    
    }
)
