Package.describe({
  name: 'rocketchat:ui-saic',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});
//Npm.depends({
//"soap" : "0.12.0",
//"fibers" : "1.0.15"
//});

function gettime(format) {
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
Package.onUse(function (api) {
  api.use(['webapp', 'autoupdate'], 'server');
  api.use('ecmascript');
  api.use('underscorestring:underscore.string');
  api.use('rocketchat:lib');
  api.use('rocketchat:authorization');
  api.use('rocketchat:logger');
  api.use('rocketchat:api');
  api.use('konecty:user-presence');
  api.use('rocketchat:ui');
  api.use('kadira:flow-router', 'client');
  api.use('templating', 'client');
  api.use('http');
  api.use('check');
  api.use('mongo');
  api.use('ddp-rate-limiter');
  api.use('rocketchat:sms');
  api.use('tracker');
  api.use('less');

  //clinet
  api.addFiles('client/templates/includes/saicFlex.html', 'client');
  api.addFiles('client/templates/includes/saicFlex.js', 'client');

  api.addFiles('client/router.js', 'client');
  api.addFiles('client/ui.js', 'client');

  api.addFiles('client/main.css', 'client');
  api.addFiles('client/templates/task/tasks_list.html', 'client');
  api.addFiles('client/templates/task/tasks_list.js', 'client');

  api.addFiles('client/templates/task/task_submit.html', 'client');
  api.addFiles('client/templates/task/task_submit.js', 'client');

  api.addFiles('client/templates/issue/index.html', 'client');
  api.addFiles('client/templates/issue/index.js', 'client');
  api.addFiles('client/templates/issue/issue_submit.html', 'client');
  api.addFiles('client/templates/issue/issue_submit.js', 'client');

  api.addFiles('client/templates/knowledge/index.html', 'client');
  api.addFiles('client/templates/knowledge/index.js', 'client');

  api.addFiles('client/templates/itinfo/index.html', 'client');
  api.addFiles('client/templates/itinfo/index.js', 'client');
  //server

  // api.addFiles('lib/router.js', 'server');
  //api.addFiles('server/main.js', 'server');
  api.addFiles('server/publications.js', 'server');
  api.addFiles('server/publications/tasks.js', 'server');
  api.addFiles('server/publications/knowledge.js', 'server');
  api.addFiles('server/publications/fileupload.js', 'server');
  api.addFiles('server/publications/itinfo.js', 'server');


});

