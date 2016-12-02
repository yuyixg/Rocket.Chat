Package.describe({
  name: 'rocketchat:rocketchat-ui-dlm',
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
  api.versionsFrom('1.4.2');
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

  api.addFiles('client/templates/includes/saicDLM.html', 'client');
  api.addFiles('client/templates/includes/saicDLM.js', 'client');

  api.addFiles('client/router.js', 'client');

  api.addFiles('client/templates/positionchoice/index.html', 'client');
  api.addFiles('client/templates/positionchoice/index.js', 'client');
  api.addFiles('client/templates/proxy/index.html', 'client');
  api.addFiles('client/templates/proxy/index.js', 'client');
  api.addFiles('client/templates/staffcheck/index.html', 'client');
  api.addFiles('client/templates/staffcheck/index.js', 'client');
  api.addFiles('client/templates/salecheck/index.html', 'client');
  api.addFiles('client/templates/salecheck/index.js', 'client');
  api.addFiles('client/templates/report/index.html', 'client');
  api.addFiles('client/templates/report/index.js', 'client');
});


