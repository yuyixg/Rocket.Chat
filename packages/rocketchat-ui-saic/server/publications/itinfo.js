Meteor.methods(
    {
        'getitinfobyid': function (data) {
            //console.log(data);
            var postdata = {
                id: data.id,
                params: GetUser()
            };

            var result = HTTP.call('GET', mmtServerURL + "mmt-web/f/mm/mmtAnnounce/getMmtAnnounce?id=" + data.id, {});

            //console.log(result.data);
            return result.data;
        },
        'getQuestionCount': function (userId) {

            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestion/getQuestionCount",
                {
                    data: {
                        userId: userId,
                        params: GetUser()
                    }
                });

            //console.log(result.data);
            return result.data;
        },
        'getlist': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtAnnounce/queryMmtAnnounce",
                {
                    data: data,
                    params: GetUser()
                });

            //console.log(result.data);

            //if (result.data.total == 0) {
            //    result.data = _.extend(result.data, {
            //        rows: []
            //    });
            //}
           
            return result.data;
        }
    }
)

