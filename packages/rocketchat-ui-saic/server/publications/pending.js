Meteor.methods(
    {
        //获取待处理问题
        'issueallList': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestion/queryMmtQuestion",
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
        //分配
        'distribution': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtQuestion/distributionQuestion",
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
        },
        //获取员工信息
        'assignedlist': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtUserLocationDept/queryULD",
                {
                    data: { user: data.name, page: data.page },
                    params: GetUser()
                });
                console.log({ user: data.name, page: data.page });
            if (result.data.total == 0) {
                result.data = _.extend(result.data, {
                    rows: []
                });
            }
            console.log(result);
            return result.data;
        },
        'getroles': function () {
            try {
                var result = HTTP.call('GET', mmtServerURL + 'mmt-web/f/sys/user/listMenu',
                    {
                        params: GetUser()
                    });
                console.log(result);
                return result.data;
            }
            catch (ex) {
                console.log(ex);
            }
        }
    }
)
