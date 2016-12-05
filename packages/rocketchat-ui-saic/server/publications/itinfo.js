Meteor.methods(
    {
        'getitinfobyid': function (data) {
            //console.log(data);
            var postdata = {
                id: data.id
            };

            var result = HTTP.call('GET', mmtServerURL + "mmt-web/f/mm/mmtAnnounce/getMmtAnnounce?id=" + data.id, {});

            //console.log(result.data);
            return result.data;
        },
        'getQuestionCount': function (userId) {

            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestion/getQuestionCount",
                {
                    data: {
                        userId: userId
                    }
                });

            //console.log(result.data);
            return result.data;
        },
        'getlist': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtAnnounce/queryMmtAnnounce",
                {
                    data: data
                });
            //if (result.data.total == 0) {
            //    result.data.rows = [];
            //}
            //console.log(result.data);
            return result.data;
        }
    }
)


HTTP.methods(
    {
        '/itinfo/getlist': {
            post: function (data) {
                console.log(data);
                /*
                                var postdata = {
                                    title: data.search,
                                    page: {
                                        "pageNo": ,
                                        "pageSize": data.limit
                                        //"orderBy": data.orderBy
                                    }
                                };
                
                                // console.log(postdata);
                */

                var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtAnnounce/queryMmtAnnounce",
                    {
                        data: data
                    });

                //var  data = [
                //{ "id": 1, "title": "sallency1", "description": "description description description description description", "updateDate": '2016-11-01' },
                //{ "id": 2, "title": "sallency2", "description": "description description description description description", "updateDate": '2016-11-02' },
                //{ "id": 3, "title": "sallency3", "description": "description description description description description", "updateDate": '2016-11-03' },
                //{ "id": 4, "title": "sallency4", "description": "description description description description description", "updateDate": '2016-11-04' },
                //{ "id": 5, "title": "sallency5", "description": "description description description description description", "updateDate": '2016-11-05' }];

                //console.log(result);
                console.log(result.data);
                return result.data;
            }
        }
    }
)