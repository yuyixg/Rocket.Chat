Meteor.methods(
    {
        'getitinfobyid': function (data) {
            //console.log(data);
            var postdata = {
                id: data.id
            };

            var result = HTTP.call('GET', "http://10.64.20.165:8080/mmt-web/f/mm/mmtAnnounce/getMmtAnnounce?id=" + data.id, {});

            //console.log(result.data);
            return result.data;
        }
    }
)

HTTP.methods(
    {
        '/itinfo/getlist': {
            post: function (data) {
                //console.log(data);

                var postdata = {
                    title: data.search,
                    page: {
                        "pageNo": 1,
                        "pageSize": data.limit
                        //"orderBy": data.orderBy
                    }
                };

                // console.log(postdata);


                var result = HTTP.call('POST', "http://10.64.20.165:8080/mmt-web/f/mm/mmtAnnounce/queryMmtAnnounce",
                    {
                        data: postdata
                    });

                //var  data = [
                //{ "id": 1, "title": "sallency1", "description": "description description description description description", "updateDate": '2016-11-01' },
                //{ "id": 2, "title": "sallency2", "description": "description description description description description", "updateDate": '2016-11-02' },
                //{ "id": 3, "title": "sallency3", "description": "description description description description description", "updateDate": '2016-11-03' },
                //{ "id": 4, "title": "sallency4", "description": "description description description description description", "updateDate": '2016-11-04' },
                //{ "id": 5, "title": "sallency5", "description": "description description description description description", "updateDate": '2016-11-05' }];

                //console.log(result);
                //console.log(result.data.rows);
                return result.data;
            }
        }
    }
)