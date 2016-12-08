Meteor.methods(
    {
        'acceptbyid': function(data) {
            var result = HTTP.call('POST', mmtServerURL + "/mmt-web/f/mm/mmtQuestion/claimQuestion",
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
