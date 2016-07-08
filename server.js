var express = require('express'),
    url = require('url'),
    proxy = require('proxy-middleware'),
    session = require('express-session'),
    request = require('request');

function sfproxy(req, res, next) {
  var oauth = req.session && req.session.oauth;

  var instance_url = oauth && oauth.instance_url;

  var subpath = ~req.originalUrl.indexOf('/services/') ? '/services' : '/soap';
  console.log('requested:', req.originalUrl);
  console.log('forwarding:', url.format(url.parse(instance_url + subpath)));
  var proxied = proxy(url.parse(instance_url + subpath));

  var auth = 'Bearer ' + (oauth && oauth.access_token);

  req.headers.authorization = auth;
  proxied.call(this, req, res, next);
}

exports.startServer = function(config, callback) {
  var port = config.server.port;
  var app = express();

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

  app.use('/', express.static(__dirname + '/views'));
  app.use(express.static(config.watch.compiledDir));

  var server = app.listen(port, function() {
    console.error("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
  });

  app.set('port', port);

  app.use('/soap', sfproxy);
  app.use('/services', sfproxy);


  app.post('/login', function(req, res, next) {
    var loginData = {
        grant_type: 'password',
        client_id: '3MVG9A2kN3Bn17ht6vakZ0GQvyF08kKNujly9Ab8N5e_J8aCTF2d8j3IXoVoKOcewrlIgM6LkgEMZbg2dIAHZ',
        client_secret: '1043662831369274221',
        username: 'dpitre@mobileteam.com',
        password: 'computer47G7V4qSGMzEnA9daEMcg38fXB'
      };
    request({
        uri: 'https://login.salesforce.com/services/oauth2/token',
        method: 'POST',
        form: loginData
      }, function(err, httpResponse, body){
        if (err) {
          res.json(500, err);
          return;
        }
        console.log(body);
        req.session.oauth = JSON.parse(body);
        res.json(req.session.oauth);
      });
  });
  callback(server);
};