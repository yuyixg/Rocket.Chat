Package.describe({
  name: 'rocketchat:rocketchat-ui-fdapp',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
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
  api.addFiles('client/router.js', 'client');
  api.addFiles('client/main.css', 'client');

  api.addFiles('client/Default/saicFDApp.html', 'client');
  api.addFiles('client/Default/saicFDApp.js', 'client');
  api.addFiles('client/Default/default.html', 'client');
  api.addFiles('client/Default/default.js', 'client');

  api.addFiles('client/Apply/ARRequest.html', 'client');
  api.addFiles('client/Apply/ARRequest.js', 'client');
  api.addFiles('client/Apply/ERRequest.html', 'client');
  api.addFiles('client/Apply/ERRequest.js', 'client');
  api.addFiles('client/Apply/GRRequest.html', 'client');
  api.addFiles('client/Apply/GRRequest.js', 'client');
  api.addFiles('client/Apply/PRRequest.html', 'client');
  api.addFiles('client/Apply/PRRequest.js', 'client');
  api.addFiles('client/Apply/TRRequest.html', 'client');
  api.addFiles('client/Apply/TRRequest.js', 'client');

  api.addFiles('client/View/AREdit.html', 'client');
  api.addFiles('client/View/AREdit.js', 'client');
  api.addFiles('client/View/EREdit.html', 'client');
  api.addFiles('client/View/EREdit.js', 'client');
  api.addFiles('client/View/GREdit.html', 'client');
  api.addFiles('client/View/GREdit.js', 'client');
  api.addFiles('client/View/PREdit.html', 'client');
  api.addFiles('client/View/PREdit.js', 'client');
  api.addFiles('client/View/TREdit.html', 'client');
  api.addFiles('client/View/TREdit.js', 'client');

});

