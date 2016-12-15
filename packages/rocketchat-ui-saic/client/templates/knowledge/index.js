Template.knowledgeindex.onRendered(function () {
    var self = this;
    saicRendered(self);
    var id;
    Meteor.call("getcategorybyuserid",
        function (error, result) {
            // 向用户显示错误信息并终止
            if (error) {
                return alert(error.reason);
            }

            $.each(result,
                function (idx, item) {
                    $('#mylist').append("<li><a id=" + item.id + " >" + item.name + "</a></li>");
                });
            $("a").on("click",
                function () {
                    $(this).parent("#mylist li").attr('class', 'active');
                    $(this).parent("li").siblings().attr('class', '');
                    $("#KMtable").bootstrapTable('refresh');
                });
        });

    //查询
    $("#search").click(function () {
        $('#KMtable').bootstrapTable('refresh');
    });
    $('#KMtable').bootstrapTable({
        url: 'getknowledgeList',
        method: 'meteor',
        striped: true,
        //是否显示行间隔色
        cache: false,
        //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,
        //是否显示分页（*）
        sortable: true,
        //是否启用排序
        sortOrder: "asc",
        //排序方式
        queryParams: queryParams,
        //传递参数（*）
        sidePagination: "server",
        //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,
        //初始化加载第一页，默认第一页
        pageSize: 8,
        //每页的记录行数（*）
        pageList: [10, 25, 50, 100],
        //可供选择的每页的行数（*）
        //search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,
        //是否显示所有的列
        showRefresh: false,
        //是否显示刷新按钮
        minimumCountColumns: 2,
        //最少允许的列数
        clickToSelect: true,
        //是否启用点击选中行
        //height: 200,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",
        //每一行的唯一标识pagination，一般为主键列
        showToggle: false,
        //是否显示详细视图和列表视图的切换按钮
        cardView: false,
        //是否显示详细视图
        detailView: false,
        //是否显示父子表
        showHeader: false,
        search: false,
        //是否显示父子表  
        columns: [{
            field: 'id',
            formatter: function (value, row, index) {
                var e = '<a href="/saic/knowledge/index/' + row.id + '">' + row.title + '</a>';
                return e;
            }
        },
        {
            formatter: function (value, row, index) {
                var e = '<i id="up" style="color:red" class="fa fa-thumbs-up" aria-hidden="true"><span style="font-size:7pt">(10)</span></i><i id="down" style="color:green;padding-left:15px" class="fa fa-thumbs-down" aria-hidden="true"><span style="font-size:7pt">(5)</span></i>';
                return e;
            }

        }],
        formatLoadingMessage: function () {
            return "请稍等，正在加载中...";
        }
    });


    Meteor.call("getallcategory",
        function (error, result) {
            // 向用户显示错误信息并终止
            if (error) {
                return alert(error.reason);
            }

            $.each(result,
                function (idx, Pitem) {
                    var html = "";
                    $('#knowledgeList').append("<label style='margin-right:12px;color:#54b4dd' > " + Pitem.name + "</label><ul class='nav nav-pills' id=" + Pitem.id + ">");
                    $.each(Pitem.children,
                        function (idx, item) {
                            $('#' + Pitem.id).append("<li><a id=" + item.id + " >" + item.name + "</a></li>");

                        });

                    $('#knowledgeList').append("</ul>");
                    $("a").on("click",
                        function () {
                            // alert(Pitem.id);
                            // alert($(this).parent("#knowledgeList #" + Pitem.id + " li").attr("class"));
                            if ($(this).parent("#knowledgeList #" + Pitem.id + " li").attr('class') === 'active')
                                $(this).parent("#knowledgeList #" + Pitem.id + " li").removeClass();
                            else
                                $(this).parent("#knowledgeList #" + Pitem.id + " li").attr('class', 'active');
                        })
                });
            $('#knowledgeList').append("<br/><div class='submit'><button id='save' class='button save'><i class='icon-floppy'></i><span>保存</span></button>&nbsp<button id='remove' class='button remove'><i class='glyphicon glyphicon-remove'></i><span>删除</span></button></div>");
            $("#save").click(function (e) {
                var arrChk = $("#knowledgeList  li.active a");
                var list = new Array();
                $(arrChk).each(function () {
                    list.push($(this).attr('id'));
                });
                Meteor.call("addToFavorite", list,
                    function (error, result) {
                        if (error) {
                            return alert(error.reason);
                        }
                        refresh_li();
                        //location.reload();
                    });
            });

            $("#remove").click(function (e) {
                var arrChk = $("#knowledgeList  li.active a");
                var list = new Array();
                $(arrChk).each(function () {
                    list.push($(this).attr('id'));
                });
                Meteor.call("removeFromFavorite", list,
                    function (error, result) {
                        if (error) {
                            return alert(error.reason);
                        }
                        refresh_li();
                        // location.reload();
                    });
            });



        });

});
//局部刷新
function refresh_li() {
    $("#mylist").find("li").remove();
    Meteor.call("getcategorybyuserid",
        function (error, result) {
            $('#mylist').append("<li class='active'><a id=''>全部</a></li>");
            $.each(result,
                function (idx, item) {
                    $('#mylist').append("<li><a id=" + item.id + " >" + item.name + "</a></li>");
                });
            $("a").on("click",
                function () {
                    $(this).parent("#mylist li").attr('class', 'active');
                    $(this).parent("li").siblings().attr('class', '');
                    $("#KMtable").bootstrapTable('refresh');
                });
            //$("#knowledgeList  li").attr('class', '');
        });
    $("#knowledgeList").empty();
    Meteor.call("getallcategory",
        function (error, result) {
            // 向用户显示错误信息并终止
            if (error) {
                return alert(error.reason);
            }

            $.each(result,
                function (idx, Pitem) {
                    var html = "";
                    $('#knowledgeList').append("<label style='margin-right:12px;color:#54b4dd' > " + Pitem.name + "</label><ul class='nav nav-pills' id=" + Pitem.id + ">");
                    $.each(Pitem.children,
                        function (idx, item) {
                            $('#' + Pitem.id).append("<li><a id=" + item.id + " >" + item.name + "</a></li>");

                        });

                    $('#knowledgeList').append("</ul>");

                    $("a").on("click",
                        function () {
                            // alert(Pitem.id);
                            // alert($(this).parent("#knowledgeList #" + Pitem.id + " li").attr("class"));
                            if ($(this).parent("#knowledgeList #" + Pitem.id + " li").attr('class') === 'active')
                                $(this).parent("#knowledgeList #" + Pitem.id + " li").removeClass();
                            else
                                $(this).parent("#knowledgeList #" + Pitem.id + " li").attr('class', 'active');
                        })
                });
            $('#knowledgeList').append("<br/><div class='submit'>" +
                "<button id='save' class='button save'><i class='icon-floppy'></i><span>保存</span></button>" +
                "&nbsp<button id='remove' class='button remove'><i class='glyphicon glyphicon-remove'></i><span>删除</span></button></div>");
            $("#save").click(function (e) {
                var arrChk = $("#knowledgeList  li.active a");
                var list = new Array();
                $(arrChk).each(function () {
                    list.push($(this).attr('id'));
                });
                Meteor.call("addToFavorite", list,
                    function (error, result) {
                        if (error) {
                            return alert(error.reason);
                        }
                        refresh_li();
                    });
            });

            $("#remove").click(function (e) {
                var arrChk = $("#knowledgeList  li.active a");
                var list = new Array();
                $(arrChk).each(function () {
                    list.push($(this).attr('id'));
                });
                Meteor.call("removeFromFavorite", list,
                    function (error, result) {
                        if (error) {
                            return alert(error.reason);
                        }
                        refresh_li();
                        // location.reload();
                    });
            });

        });

}
Template.knowledgeindex.onDestroyed(function () {
    $('.main-content .content').empty();
    $('.flex-tab-bar').css("width", "40px");
    $('.main-content').css("right", "40px");
});

Template.knowledgedetail.onRendered(function () {
    // $('.main-content .content').css("margin-top", "0px");
    // $('.main-content .fixed-title').css("height", "0px");
    $('.flex-tab-bar').hide();
    $('.main-content').css("right", "0px");

    var getAttributes = {
        id: FlowRouter.getParam('_id')
    };

    $("#back").click(function (e) {
        e.preventDefault();
        FlowRouter.go('knowledge-index');
    });


    //顶
    $("#up").click(function () {
        if ($("#up i").attr("class") == "fa fa-thumbs-o-up")
            $("#up i").removeClass().addClass("fa fa-thumbs-up");
        else
            $("#up i").removeClass().addClass("fa fa-thumbs-o-up");
    });
    //踩
    $("#down").click(function () {
        if ($("#down i").attr("class") == "fa fa-thumbs-o-down")
            $("#down i").removeClass().addClass("fa fa-thumbs-down");
        else
            $("#down i").removeClass().addClass("fa fa-thumbs-o-down");
    });

    Meteor.call("getknowledgedetailbyid", getAttributes,
        function (error, result) {
            // 向用户显示错误信息并终止
            if (error) {
                console.log(error);
                return alert(error.reason);
            }

            $.each(result,
                function (idx, item) {
                    $('#detail').html(item.description);
                    $('#title').text(item.title);
                })

        });

});

Template.knowledgedetail.onDestroyed(function () {
    $('.main-content .content').empty();
    // $('.main-content .content').css("margin-top", "60px");
    //$('.main-content .fixed-title').css("height", "");
    $('.flex-tab-bar').show();
    $('.main-content').css("right", "40px");
});