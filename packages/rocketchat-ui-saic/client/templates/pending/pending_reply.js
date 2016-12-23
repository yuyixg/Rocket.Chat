
Template.pendingreply.onRendered(function () {

    $('.flex-tab-bar').css("width", "0px");
    $('.main-content').css("right", "0px");
    var _id = FlowRouter.getParam('_id');
    var _status = FlowRouter.getParam('_status');
    if (_id) {
        Meteor.call("issuefindOne", _id, function (error, result) {
            // 向用户显示错误信息并终止
            if (error) {
                console.log(error);
                return;
            }
            console.log(result);
            if (result.category.id) {
                $('#category').text(result.category.name);
            }
            $('#pending-form').find('[name=name]').text(result.createBy.name);
            $('#pending-form').find('[name=loginName]').text(result.createBy.loginName);
            $('#pending-form').find('[name=no]').text(result.createBy.no);
            $('#pending-form').find('[name=dept]').text(result.createBy.officeName);
            $('#pending-form').find('[name=email]').text(result.createBy.email);
            $('#pending-form').find('[name=title]').text(result.title);
            $('#pending-form').find('[name=description]').text(result.description);
            $('#pending-form').find('[name=createdate]').text(result.createDate.substr(0, 16));
            for (var att in result.attachUrlList) {
                var attach = result.attachUrlList[att];
                var file = { id: attach.id, name: attach.id, url: attach.attachUrl }
                $('#imagetable').bootstrapTable("append", file);
            }
            console.log(result);
            if (result.processFlag === 0) {
                $('#reply').hide();
                $('#pull').show();
                if (checkPermission('mm:mmtQuestion:assignment'))
                    $('#assign').show();
                $('#replyadd').hide();
            } else if (result.processFlag === 5) {
                $('#reply').hide();
                $('#pull').hide();
                $('#assign').hide();
                $('#replyadd').hide();
                $.each(result.mmtQuestionAnswerList,
                    function (idx, item) {
                        if (item.answer != undefined) {
                            $("#replyContent").append("<div><span>回复人：</span><label style='font-weight:normal'  id='other" + item.id + "' /></div>" +
                                "<div><textarea  class='form-control' placeholder='回复内容' id='replyText" + item.id + "' rows='5'></textarea></div><br/>");
                            $('#other' + item.id).val(item.createBy.name);
                            $('#replyText' + item.id).val(item.answer);
                            $('#other' + item.id).attr("readonly", "readonly");
                            $('#replyText' + item.id).attr("readonly", "readonly");
                            // replycontrol();
                        }
                    });
            } else if (result.processFlag === 3 || result.processFlag === 4) {
                $('#reply').show();
                $('#pull').hide();
                $('#assign').hide();
                $('#replyadd').show();
                $.each(result.mmtQuestionAnswerList,
                    function (idx, item) {
                        if (item.answer != undefined) {
                            $("#replyContent").append("<div><span>回复人：</span><label style='font-weight:normal'  id='other" + item.id + "' /></div>" +
                                "<div><textarea  class='form-control' placeholder='回复内容' id='replyText" + item.id + "' rows='5'></textarea></div><br/>");
                            $('#other' + item.id).val(item.createBy.name);
                            $('#replyText' + item.id).val(item.answer);
                            $('#other' + item.id).attr("readonly", "readonly");
                            $('#replyText' + item.id).attr("readonly", "readonly");
                            // replycontrol();
                        }
                    });
                replycontrol();
            }
            else {
                $('#reply').show();
                $('#pull').hide();
                $('#replyadd').show();
                $('#assign').hide();
                if (result.mmtQuestionAnswerList.length === 2) {
                    replycontrol();

                } else {
                    $.each(result.mmtQuestionAnswerList,
                        function (idx, item) {
                            if (item.answer != undefined) {
                                $("#replyContent").append("<div><span>回复人：</span><label style='font-weight:normal'  id='other" + item.id + "' /></div>" +
                                    "<div><textarea  class='form-control' placeholder='回复内容' id='replyText" + item.id + "' rows='5'></textarea></div><br/>");
                                $('#other' + item.id).val(item.createBy.name);
                                $('#replyText' + item.id).val(item.answer);
                                $('#other' + item.id).attr("readonly", "readonly");
                                $('#replyText' + item.id).attr("readonly", "readonly");
                                replycontrol();
                            }
                        });

                }
            }
        });
        $("#pull").click(function (e) {
            Meteor.call("acceptbyid", _id,
                function (error, result) {
                    if (error) {
                        return alert(error.reason);
                    }
                    else {
                        console.log(result);
                        $('#reply').show();
                        $('#pull').hide();
                        $('#assign').hide();
                        replycontrol();
                    };

                });
        });

        $("#reply").click(function (e) {
            if ($('#replyText').val() == "") {
                toastr.warning('请填写回复内容!');
                return;

            } else {

                var queryParams = {
                    id: _id,
                    mmtQuestionAnswer: { forwardUser: $("#txt_other").val(), answer: $('#replyText').val() }

                };
                console.log(queryParams);
                Meteor.call("replyquestion", queryParams,
                    function (error, result) {
                        if (error) {
                            return alert(error.reason);
                        } else
                        { FlowRouter.go('pending-index'); }
                    });

            }
        });

        $("#assign").click(function (e) {
            var str = "<div class='input-line'><div><div style='display:none'><input type='text'  id='txt_other'>" +
                "</div><input class='input-medium search-query' readonly='false' placeholder='指定分配人员' id='selectother' type='text' />" +
                "<div class='box' id='boxselectother'><div class='box-header with-border'>" +
                "<h3 class='box-title'  style='font-size:14px'>请指定人员</h3>" +
                "</div><div class='box-body'><div class=input-group input-group-sm'>" +
                "<input type='text' class='form-control' id='txt_search' placeholder='输入姓名'>" +
                "<span class='input-group-btn'>" +
                "<button type='button' id='btn_query' class='btn btn-info btn-flat'>Go!</button></span>" +
                "</div><table id='select_other'></table></div></div></div></div>";
            $("#replyContent").append(str);
            bind('assign');
            $('#submit').show();
            $('#reply').hide();
            $('#pull').hide();
            $('#assign').hide();
        });

        $("#submit").click(function (e) {
            if ($("#txt_other").val() == "") {
                toastr.warning('请选择分配人员!');
                return;
            } else {
                var queryParams = {
                    id: _id,
                    mmtQuestionAnswer: { forwardUser: $("#txt_other").val() }

                };
                Meteor.call("distribution", queryParams,
                    function (error, result) {
                        if (error) {
                            return alert(error.reason);
                        } else {
                            FlowRouter.go('pending-index', { _status: _status });
                        };

                    });
            }
        });

        $("#close").click(function (e) {
            e.preventDefault();
            FlowRouter.go('pending-index', { _status: _status });
        });


        $("#replyadd").click(function (e) {
            if ($('#replyText').val() == "") {
                toastr.warning('请填写补充内容!');
                return;

            } else {
                Meteor.call("questionadd", _id,
                    function (error, result) {
                        if (error) {
                            return alert(error.reason);
                        } else {
                            FlowRouter.go('pending-index');
                        };

                    });
            }
        });


    }

    var str = "<div class='input-line'><div><div style='display:none'><input type='text'  id='txt_other'>" +
        "</div><input class='input-medium search-query' readonly='false' placeholder='点击转给他人' id='selectother' type='text' />" +
        "<div class='box' id='boxselectother'><div class='box-header with-border'>" +
        "<h3 class='box-title'  style='font-size:14px'>请指定人员</h3><div class='box-tools pull-right'>" +
        "<span class='label label-primary' id='closebox'>关闭</span>&nbsp;<span class='label label-primary' id='clearbox'>清空</span></div>" +
        "</div><div class='box-body'><div class=input-group input-group-sm'>" +
        "<input type='text' class='form-control' id='txt_search' placeholder='输入姓名'>" +
        "<span class='input-group-btn'>" +
        "<button type='button' id='btn_query' class='btn btn-info btn-flat'>Go!</button></span>" +
        "</div><table id='select_other'></table></div></div></div></div>" +
        "<div><textarea  class='form-control' placeholder='回复内容' id='replyText' rows='5' required></textarea></div>";

    function replycontrol() {
        $("#replyContent").append(str);
        $('#boxselectother').hide();
        bind();
    };
    function bind(callname) {
        console.log(callname);
        var methodname = 'stafflist';
        var tid = 'id';
        if (callname === 'assign') {
            tid = 'userId';
            methodname = 'assignedlist';
        }
        $('#select_other').bootstrapTable({
            url: methodname,         //请求后台的URL（*）
            method: 'meteor',
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: false,
            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            // height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: tid,                     //每一行的唯一标识pagination，一般为主键列
            showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            showHeader: true,
            columns: [{
                field: 'name',
                title: '姓名'
            },
            {
                field: 'officeName',
                title: '部门', formatter(value, row, index) {
                    if (callname === 'assign')
                        return row.locationName + '-' + row.deptName;
                    else return value;
                }
            }
            ],
            onClickRow: function (value) {
                $('#selectother').val(value.name);
                if (value.userId) {
               
                    $('#txt_other').val(value.userId);
                }
                else
                    $('#txt_other').val(value.id);
                console.log($('#txt_other').val());
                $('#boxselectother').hide();
            }
        });
        $('#closebox').click(function () {
            $('#boxselectother').hide();
        });
        $('#clearbox').click(function () {
            $('#txt_other').val("");
            $('#selectother').val("");
        });
        $('#btn_query').click(function () {
            $('#select_other').bootstrapTable('refresh');
        });

        $('#selectother').click(function () {
            $('#boxselectother').show();

        });
    }

    $('#imagetable').bootstrapTable({
        uniqueId: 'name',
        showHeader: false,
        columns: [
            {
                field: 'url',
                title: '预览',
                formatter: function (value, row, index) {
                    var image = '<a href="' + value + '" data-lightbox="image1"><img style="width:100px;height:60px" src="' + value + '" /></a>';
                    return image;
                }

            }]
    });
})

Template.pendingreply.onDestroyed(function () {
    $('.main-content .content').empty();
    $('.flex-tab-bar').css("width", "40px");
    $('.main-content').css("right", "40px");
})


