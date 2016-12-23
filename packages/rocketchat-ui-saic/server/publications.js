
mmtServerURL = 'http://10.64.20.165:8080/';
//mmtServerURL = 'http://10.90.67.77:8081/';
GetDateTime = function (format) {
  var d = new Date();
  var date = {
    "M+": d.getMonth() + 1,
    "d+": d.getDate(),
    "h+": d.getHours(),
    "m+": d.getMinutes(),
    "s+": d.getSeconds(),
    "q+": Math.floor((d.getMonth() + 3) / 3),
    "S+": d.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}
GetUser = function () {
  var user = Meteor.user(); 
  return { userid: user.username }
}
GetRoles = function () {
  try {


      var result = HTTP.call('GET', mmtServerURL + 'mmt-web/f/sys/user/listMenu',
        {
          params: GetUser()
        });
    console.log(result);
      return result;

  }
  catch (ex) {
    console.log(ex);
  }
}





