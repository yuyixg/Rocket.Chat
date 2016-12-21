Meteor.methods(
    {
        //获取待处理问题
        'issueallList': function (data) {
            var result = HTTP.call('POST', "http://10.90.67.77:8081/mmt-web/f/mm/mmtQuestion/queryMmtQuestion",
                {
                    data: data,
                    params: GetUser()
                });
            if (result.data.total == 0) {
                result.data = _.extend(result.data, {
                    rows: []
                });
            }
            return result.data;

        },
        //认领
        'acceptbyid': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestion/claimQuestion",
                {
                    data: data,
                    params: GetUser()
                });
            return result;
        },
        //回复
        'replyquestion': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestionAnswer/saveAnswer",
                {
                    data: data,
                    params: GetUser()
                });

            return result;
        },
        //问题补充
        'questionadd': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestionAnswer/supplement",
                {
                    data: data,
                    params: GetUser()
                });
            return result;
        },
        //获取员工信息
        'stafflist': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/sys/user/listUser",
                {
                    data: data,
                    params: GetUser()
                });
            if (result.data.total == 0) {
                result.data = _.extend(result.data, {
                    rows: []
                });
            }
            return result.data;
        }
    }
)
