Meteor.methods(
    {
        'getRolesDLM': function(userId) {
            //var result = HTTP.call('POST', mmtServerURL + "getRoles",
            //    {
            //        data: {
            //            userId: userId
            //       }
            //    });

            //console.log(result.data);
            //return result.data;

            var data = {
                pageNo: 1,
                pageSize: -1,
                total: 0,
                rows: [
                    { "id": 1, "name": "ZJJ", "position": '小区经理' }]
            };

            //console.log(data);
            return data;
        },
        'getSalesCompanyDLM': function(data) {
            //var result = HTTP.call('POST', mmtServerURL + "getSalesCompany",
            //    {
            //        data: {
            //            userId: userId
            //       }
            //    });

            //console.log(result.data);
            //return result.data;

            var data = {
                pageNo: 1,
                pageSize: -1,
                total: 0,
                rows: [
                    { "id": 1, "companyname": "请选择......" },
                    { "id": 2, "companyname": "江苏花海和成汽车销售有限公司" }]
            };

            //console.log(data);
            return data;
        },
        'getUsersbyCompanyDLM': function(data) {
            //var result = HTTP.call('POST', mmtServerURL + "getUsersbyCompanyDLM",
            //    {
            //        data: {
            //            userId: userId
            //       }
            //    });

            //console.log(result.data);
            //return result.data;

            var dataResult = {
                pageNo: 1,
                pageSize: -1,
                total: 0,
                rows: []
            };

            if (data.companyid == 2) {
                dataResult = {
                    pageNo: 1,
                    pageSize: -1,
                    total: 0,
                    rows: [
                        { "id": 1, "name": "黄琳", "position": "销售经理", unit: "展厅销售", sis: "否" },
                        { "id": 2, "name": "傅瑶", "position": "前台", unit: "展厅销售", sis: "否" },
                        { "id": 3, "name": "林晨桦", "position": "展厅销售顾问", unit: "展厅销售", sis: "否" }]
                };
            }

            return dataResult;
        },
        'getUsersCheckbyUseridDLM': function(data) {
            //var result = HTTP.call('POST', mmtServerURL + "getUsersbyCompanyDLM",
            //    {
            //        data: {
            //            userId: userId
            //       }
            //    });

            //console.log(result.data);
            //return result.data;
            //console.log('getUsersCheckbyUseridDLM');

            dataResult = {
                pageNo: 1,
                pageSize: -1,
                total: 0,
                rows: [
                    { "id": 1, company: "台州荣威汽车销售有限公司", userno: "SQ5709XXX", "name": "张继", "status": "新增", submitdate: "2016-8-29", sis: "" },
                    { "id": 2, company: "台州荣威汽车销售有限公司", userno: "SQ5709YYY", "name": "吴刚", "status": "修改", submitdate: "2016-8-27", sis: "新增" },
                    { "id": 3, company: "台州荣威汽车销售有限公司", userno: "SQ5709ZZZ", "name": "赵斌", "status": "失效", submitdate: "2016-8-20", sis: "" },
                    { "id": 4, company: "台州荣威汽车销售有限公司", userno: "SQ2028XXX", "name": "徐倩", "status": "修改", submitdate: "2016-8-27", sis: "变更" }]
            };

            return dataResult;
        },
        'getStaffDetailbybyUseridDLM': function(data) {

            var postdata = {
                id: data.id
            };

            //var result = HTTP.call('POST', mmtServerURL + "getUsersbyCompanyDLM",
            //    {
            //        data: {
            //            userId: userId
            //       }
            //    });

            //console.log(result.data);
            //return result.data;

            dataResult = {
                pageNo: 1,
                pageSize: -1,
                total: 0,
                rows: [
                    {
                        "id": 1, companyno: "SQ5709", company: "台州荣威汽车销售有限公司", 
                        userno: "SQ5709ZZZ", "name": "赵斌", usercard:"310110198202231023", 
                        joindate: "2016-6-20", sis: "否",
                        position: [
                            { "position": "展厅销售顾问", unit: "展厅销售" },
                            { "position": "前台", unit: "展厅销售" }]
                    },
                ]
            };

            return dataResult;
        },

 'getinvoicechangelist': function(data) {
            //var result = HTTP.call('POST', mmtServerURL + "getUsersbyCompanyDLM",
            //    {
            //        data: {
            //            userId: userId
            //       }
            //    });

            //console.log(result.data);
            //return result.data;
            //console.log('getUsersCheckbyUseridDLM');

            dataResult = {
                pageNo: 1,
                pageSize: -1,
                total: 0,
                rows: [
                    { "id": 1, carno: "LSJA24U65GS069252", carbrand: "荣威RX5",vehicleconfiguration: "RX5-1.5T-A-5-16-C-2驱-手动尾门-阿里OS-深-约克白", "ownname": "张继", "deliverydate": "2016-8-18", submitdate: "2016-8-19", invoiceno: "0613452", billingdate: "2016-8-29", changereason: "XXXXXXXX" },
                    { "id": 2, carno: "LSJA24U65GS069253", carbrand: "荣威360",vehicleconfiguration: "360-1.5T-A-5-16-C-2驱-手动尾门-阿里OS-深-约克白", "ownname": "吴刚", "deliverydate": "2016-8-29", submitdate: "2016-8-27", invoiceno: "0613453", billingdate: "2016-8-29", changereason: "XXXXXXXX"  },
                    { "id": 3, carno: "LSJA24U65GS069254", carbrand: "荣威RX5",vehicleconfiguration: "RX5-1.5T-A-5-16-C-2驱-手动尾门-阿里OS-深-约克白", "ownname": "赵斌", "deliverydate": "2016-8-29", submitdate: "2016-8-20", invoiceno: "0613454", billingdate: "2016-8-29", changereason: "XXXXXXXX"  },
                    { "id": 4, carno: "LSJA24U65GS069255", carbrand: "荣威360",vehicleconfiguration: "360-1.5T-A-5-16-C-2驱-手动尾门-阿里OS-深-约克白", "ownname": "徐倩", "deliverydate": "2016-8-29", submitdate: "2016-8-27", invoiceno: "0613455", billingdate: "2016-8-29", changereason: "XXXXXXXX"  }]
            };

            return dataResult;
        },
        'getthreechangelist': function(data) {
            //var result = HTTP.call('POST', mmtServerURL + "getUsersbyCompanyDLM",
            //    {
            //        data: {
            //            userId: userId
            //       }
            //    });

            //console.log(result.data);
            //return result.data;
            //console.log('getUsersCheckbyUseridDLM');

            dataResult = {
                pageNo: 1,
                pageSize: -1,
                total: 0,
                rows: [
                    { "id": 1, carno: "LSJA24U65GS069252", carbrand: "荣威RX5",vehicleconfiguration: "RX5-1.5T-A-5-16-C-2驱-手动尾门-阿里OS-深-约克白", "ownname": "张继", "deliverydate": "2016-8-18", submitdate: "2016-8-19", invoiceno: "0613452", billingdate: "2016-8-29",status:"是",applydate:"2016-8-29", changereason: "XXXXXXXX" },
                    { "id": 2, carno: "LSJA24U65GS069253", carbrand: "荣威360",vehicleconfiguration: "360-1.5T-A-5-16-C-2驱-手动尾门-阿里OS-深-约克白", "ownname": "吴刚", "deliverydate": "2016-8-29", submitdate: "2016-8-27", invoiceno: "0613453", billingdate: "2016-8-29",status:"是",applydate:"2016-8-29", changereason: "XXXXXXXX"  },
                    { "id": 3, carno: "LSJA24U65GS069254", carbrand: "荣威RX5",vehicleconfiguration: "RX5-1.5T-A-5-16-C-2驱-手动尾门-阿里OS-深-约克白", "ownname": "赵斌", "deliverydate": "2016-8-29", submitdate: "2016-8-20", invoiceno: "0613454", billingdate: "2016-8-29",status:"是",applydate:"2016-8-29", changereason: "XXXXXXXX"  },
                    { "id": 4, carno: "LSJA24U65GS069255", carbrand: "荣威360",vehicleconfiguration: "360-1.5T-A-5-16-C-2驱-手动尾门-阿里OS-深-约克白", "ownname": "徐倩", "deliverydate": "2016-8-29", submitdate: "2016-8-27", invoiceno: "0613455", billingdate: "2016-8-29",status:"是",applydate:"2016-8-29", changereason: "XXXXXXXX"  }]
            };

            return dataResult;
        },
    }
)