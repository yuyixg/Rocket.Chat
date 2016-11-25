Template.knowledgemanage.onRendered(function () {     
 $('.flex-tab-bar').css("width","0px");
  $('.main-content').css("right","0px");
   var id; 
 $("#mylist li:first-child").attr('class','active');
    $('#KMtable').bootstrapTable({
            url:'/getknowledgeList',
            method:'post',
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: true, 
            sort:'title',                    //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams:queryParams,
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 8,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: false,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 5,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识pagination，一般为主键列
            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false, 
             showHeader: false,                   //是否显示详细视图
            detailView: false,                   //是否显示父子表            
            columns: [ 
                /*{
                field: 'title',
                title: '知识标题'
            },  
            {
                field:'categoryNames',
                title:'所属类别'
            },
            {
                field:'author',
                title:'作者'
            },
            {
                field:'publishFlagName',
                title:'发布状态'
            },
            {
                field: 'updateDate',
                title: '发布时间'
            },            
            {
                field: 'id',
                title: '操作',
                align: 'center',
                formatter:function(value,row,index){  
                var e = '<a href="/saic/knowledge/manager/index/'+row.id+'">查看</a>'; 
                return e;  
            }
            } */
            {
                 field: 'id',
                formatter:function(value,row,index){  
               var e = '<a href="/saic/knowledge/manager/index/'+row.id+'">'+row.title+'</a>'; 
                return e;  
              }
            }
            ],      
             formatLoadingMessage: function () {
		     return "请稍等，正在加载中...";
            }
        });
  
   $("a").on("click", function() {  
   $(this).parent("#mylist li").attr('class','active'); 
   $(this).parent("li").siblings().attr('class','');
  $("#KMtable").bootstrapTable('refresh');
});   

      Meteor.call("getcategorybyid", null, function (error, result) {
      // 向用户显示错误信息并终止
      if (error) {
        console.log(error);
        return alert(error.reason);
      }   

       $.each(result,function(idx,item){ 
          $('#demo').append("<div>");
          $('#demo').append("<label style='margin-right:12px;color:#54b4dd' id="+item.parentid+"> "+item.name+"</label>");
           $.each(item.child,function(idx,item){ 
          $('#demo').append("<label style='margin-right:12px'>  <input type='checkbox' id="+item.id+"> "+item.title+"</label>");
        
     }    
     );
     $('#demo').append("</div>"); 


 })
          $('#demo').append("<br/><div class='submit'><button class='button save'><i class='icon-floppy'></i><span>Save</span></button></div>");

    });

});
        
Template.knowledgemanage.onDestroyed(function () {
   $('.main-content .content').empty();
    $('.flex-tab-bar').css("width","40px");
  $('.main-content').css("right","40px");
});

Template.knowledgedetail.onRendered(function () {   
      $('.main-content .content').css("margin-top","0px");
       $('.main-content .fixed-title').css("height","0px");
    var getAttributes = {
      id: FlowRouter.getParam('_id')
    };
    Meteor.call("getknowledgedetailbyid", getAttributes, function (error, result) {
      // 向用户显示错误信息并终止
      if (error) {
        console.log(error);
        return alert(error.reason);
      }
     
       $.each(result,function(idx,item){    
        $('#detail').html(item.description);
        $('#title').text(item.title);  
    })

    });


});

Template.knowledgedetail.onDestroyed(function () {
   $('.main-content .content').empty();
     $('.main-content .content').css("margin-top","60px");
       $('.main-content .fixed-title').css("height","");
});

