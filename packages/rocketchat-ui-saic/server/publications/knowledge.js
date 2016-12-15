Meteor.methods(
    {
        //获取所有知识库数据
        'getknowledgeList': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtKnowledge/queryMmtKnowledge",
                {
                    data: data,
                    params: GetUser()
                });
            if (result.data.total === 0) {
                result.data = _.extend(result.data, { rows: [] });
            }
            return result.data;
        },
        //获取所有类别信息
        'getallcategory': function (data) {
            var result = HTTP.call('GET', mmtServerURL + "mmt-web/f/mm/mmtCategory/getAllMmtCategory");
            return result.data;
        },
        //根据类别获取对应知识库
        'getcategorybyuserid': function (data) {
            var result = HTTP.call('GET', mmtServerURL + "mmt-web/f/mm/mmtCategory/queryMyMmtCategory", {
                params: GetUser()
            });
            return result.data;
        },
        //获取知识详情
        'getknowledgedetailbyid': function (data) {
            var result = HTTP.call('GET', mmtServerURL + 'mmt-web/f/mm/mmtKnowledge/getMmtKnowledge?id=' + data.id);
            return result;
        },
        //添加个人定制应用系统
        'addToFavorite': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtCategory/addToFavorite",
                {
                    data: data,
                    params: GetUser()
                });
            return result;
        },
        //移除个人定制应用系统
        'removeFromFavorite': function (data) {
            var result = HTTP.call('POST', mmtServerURL + "mmt-web/f/mm/mmtCategory/removeFromFavorite",
                {
                    data: data,
                    params: GetUser()
                });
            return result;
        }
    }
)
