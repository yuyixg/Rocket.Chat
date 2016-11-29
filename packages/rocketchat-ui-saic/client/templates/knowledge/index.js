Template.knowledgeindex.onRendered(function () {   
 var id;   
 $('.flex-tab-bar').css("width","0px");
  $('.main-content').css("right","0px");


Meteor.call("getcategorybyuserid", function (error, result) {
    // 向用户显示错误信息并终止
      if (error) {
        return alert(error.reason);
      }   

       $.each(result,function(idx,item){ 
          $('#mylist').append("<li><a id="+item.id+" >"+item.name+"</a></li>");          
     }    
     );
     $("#mylist li:first-child").attr('class','active');
      $("a").on("click", function() {  
   $(this).parent("#mylist li").attr('class','active'); 
   $(this).parent("li").siblings().attr('class','');
   $("#KMtable").bootstrapTable('refresh');
    });  
});
  
   
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
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 5,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识pagination，一般为主键列
            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false, 
             showHeader: false,                   //是否显示详细视图
            detailView: false,                   //是否显示父子表            
            columns: [                
            {
                 field: 'id',
                formatter:function(value,row,index){  
               var e = '<a href="/saic/knowledge/index/'+row.id+'">'+row.title+'</a>'; 
                return e;  
              }
            }
            ],      
             formatLoadingMessage: function () {
		     return "请稍等，正在加载中...";
            }
        });
  
   

      Meteor.call("getallcategory", function (error, result) {
      // 向用户显示错误信息并终止
      if (error) {
        return alert(error.reason);
      }   

       $.each(result,function(idx,item){ 
          $('#knowledgeList').append("<div>");
          $('#knowledgeList').append("<label style='margin-right:12px;color:#54b4dd' id="+item.id+"> "+item.name+"</label>");
           $.each(item.children,function(idx,item){ 
          $('#knowledgeList').append("<label style='margin-right:12px'>  <input type='checkbox' id="+item.id+"> "+item.name+"</label>");
        
     }    
     );
     $('#knowledgeList').append("</div>"); 


 })
     $('#knowledgeList').append("<br/><div class='submit'><button id='save' class='button save'><i class='icon-floppy'></i><span>Save</span></button></div>");
     $('#knowledgeList').append("<div class='submit'><button id='delete' class='button delete'><i class='icon-floppy'></i><span>Delete</span></button></div>");
  $("#save").click( 
    function(e){
    var arrChk=$("input[type='checkbox']:checked");
    var list=  new Array();
    $(arrChk).each(function(){ 
        list.push($(this).attr('id'));       
        //alert(list.length);             
    });
     Meteor.call("addToFavorite",list, function (error, result) {
        if (error) {
        return alert(error.reason);
        //$(".tab-content").load("index.html");
        //$("#mylist").listview('refresh');
       // $("a[data-role=content] ul li").listview("refresh");
        Meteor.call("getcategorybyuserid", function (error, result) {
          $.each(result,function(idx,item){ 
          $('#mylist').append("<li><a id="+item.id+" >"+item.name+"</a></li>");          
          });
          $("#mylist li:first-child").attr('class','active');
         });  
      }   
     });
});

  $("#delete").click( 
    function(e){
    var arrChk=$("input[type='checkbox']:checked");
    var list=  new Array();
    $(arrChk).each(function(){ 
        list.push($(this).attr('id'));       
        //alert(list.length);             
    });
   
     Meteor.call("removeFromFavorite",list, function (error, result) {
        if (error) {
        return alert(error.reason);
        $("#mylist").load(a());
        //$("#mylist").listview('refresh');
         function a(){
        Meteor.call("getcategorybyuserid", function (error, result) {
          $.each(result,function(idx,item){ 
          $('#mylist').append("<li><a id="+item.id+" >"+item.name+"</a></li>");          
          });
          $("#mylist li:first-child").attr('class','active');
         }); 
         }
      }   
     });
});
    });


});
        
Template.knowledgeindex.onDestroyed(function () {
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


