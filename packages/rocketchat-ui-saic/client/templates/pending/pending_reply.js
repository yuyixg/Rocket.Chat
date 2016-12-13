
Template.pendingreply.onRendered(function () {

  $('.flex-tab-bar').css("width", "0px");
  $('.main-content').css("right", "0px");
  var _userid = FlowRouter.getParam('_userid');
  var _id = FlowRouter.getParam('_id');
  var _username = FlowRouter.getParam('_username');

  if (_id) {
    Meteor.call("issuefindOne", _id, function (error, result) {
      // 向用户显示错误信息并终止
      if (error) {
        console.log(error);
        return;
      }
      console.log(result);
      if (result.category.id) {
        $('#category').val(result.category.name);
      }

      $('#pending-form').find('[name=title]').val(result.title);
      $('#pending-form').find('[name=description]').val(result.description);

      for (var att in result.attachUrlList) {
        var attach = result.attachUrlList[att];
        var file = { id: attach.id, name: attach.id, url: attach.attachUrl }
        $('#imagetable').bootstrapTable("append", file);
      }


      if (result.processFlag == 0) {
        $('#reply').hide();
        $('#replyadd').hide();
        $('#pull').show();
      } else {
        $('#reply').show();
        $('#replyadd').show();
        $('#pull').hide();
        if (result.mmtQuestionAnswerList.length === 2) {
          replycontrol();
          $("[name='other']").click(function () {
            FlowRouter.go('pending-staff', { _id: _id });
          });

        } else {
          $.each(result.mmtQuestionAnswerList,
            function (idx, item) {
              if (item.answer) {
                $("#replyContent").append("<div><span>回复人：</span><label style='font-weight:normal'  id='other" + item.id + "' /></div>" +
                  "<div><textarea  class='form-control' placeholder='回复内容' id='replyText" + item.id + "' rows='5'></textarea></div><br/>");
                $('#other' + item.id).val(item.createBy.name);
                // $('#other' + item.id).text("测试");
                $('#replyText' + item.id).val(item.answer);
                $('#other' + item.id).attr("readonly", "readonly");
                $('#replyText' + item.id).attr("readonly", "readonly");
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
          } else {
            $('#reply').show();
            $('#replyadd').show();
            $('#pull').hide();
            replycontrol();
            $("[name='other']").click(function () {
              FlowRouter.go('pending-staff', { _id: _id });
            });
          };

        });
    });

    $("#reply").click(function (e) {
      var queryParams = {
        id: _id,
        mmtQuestionAnswer: { "forwardUser": +$("[name='other']").val(), "answer": +$('#replyText').val() }

      };
      console.log(queryParams.mmtQuestionAnswer.answer);
      Meteor.call("replyquestion", queryParams,
        function (error, result) {
          if (error) {
            return alert(error.reason);
          } else
          { FlowRouter.go('pending-index'); }
        });
    });
    $("#close").click(function (e) {
      e.preventDefault();
      FlowRouter.go('pending-index');
    });

    $("#replyadd").click(function (e) {
      // replycontrol();
      Meteor.call("questionadd", _id,
        function (error, result) {
          if (error) {
            return alert(error.reason);
          } else {
            //$("[name='other']").click(function () {
            //FlowRouter.go('pending-staff', { _id: _id });
            //});
            FlowRouter.go('pending-index');
          };

        });
    });

  }

  function replycontrol() {
    if (!_userid) {
      $("#replyContent").append("<div><span>转给他人处理：</span><input type='text' name='other' id='' value=''/></div>" +
        "<div><textarea  class='form-control' placeholder='回复内容' id='replyText' rows='5'></textarea></div>");
    } else {
      $("#replyContent").append("<div><span>转给他人处理：</span><input type='text' name='other' id='" + _userid + "' value='" + _username + "'/></div>" +
        "<div><textarea  class='form-control' placeholder='回复内容' id='replyText' rows='5'></textarea></div>");
    }
  };


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


