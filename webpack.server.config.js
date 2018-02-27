DEV = 1;
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var fs = require('fs');
var config = require('./webpack.config');
var consoler = require('consoler');

//--progress --colors --hot --content-base assets --host=0.0.0.0 --port 9000'
var port = 9000;
var ip = '0.0.0.0';

function getHost() {
  var stat = fs.existsSync('./proxy.json');
  var config = stat ? JSON.parse(fs.readFileSync('./proxy.json')) : '';
  return config;
}

var host = getHost();
var nowHost = host ? 'http://' + host.host + ':' + host.port : '';

var server = new WebpackDevServer(webpack(config), {
  disableHostCheck: true
});


var http = require('http');
var bodyParser = require('body-parser');
var querystring = require('querystring');

server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({extended: true}));

server.app.post('/' + host.name + '/*', function (req, res) {
  var method = req.method.toUpperCase();
  var postData = querystring.stringify(req.body);
  consoler.success('http[s] ' + method + ' request ===> ' + nowHost + req.originalUrl + '?' + postData);
  var _req = http.request({
    hostname: host.host,
    path: req.originalUrl,
    method: method,
    headers: req.headers
  }, function (_res) {
    Object.keys(_res.headers).forEach(function (key) {
      if (_res.headers[key] != undefined) {
        res.setHeader(String(key).trim(), _res.headers[key]);
      }
    });
    _res.pipe(res)
  });
  _req.write(postData);
  _req.end();
});

server.app.get('/' + host.name + '/*', function (req, res) {
  var method = req.method.toUpperCase();
  consoler.success('http[s] ' + method + ' request ===> ' + nowHost + req.originalUrl);
  var _req = http.request({
    hostname: host.host,
    path: req.originalUrl,
    method: method,
    headers: req.headers
  }, function (_res) {
    Object.keys(_res.headers).forEach(function (key) {
      if (_res.headers[key] != undefined) {
        res.setHeader(String(key).trim(), _res.headers[key]);
      }
    });
    _res.pipe(res)
  });
  _req.end();
});

//获取当前转发 Host
server.app.get('/get/host', function (req, res) {
  consoler.info('request host ===> ' + getHost().host);
  res.send(getHost());
});

//切换 Host
server.app.get('/change/host*', function (req, res) {
  consoler.success('change host success ===> ' + req.query.host + ':' + req.query.port);
  nowHost = 'http://' + req.query.host + ':' + req.query.port;
  fs.writeFileSync('./proxy.json', JSON.stringify(req.query));
  res.send(req.query);
});

server.listen(port, ip, function (err) {
  if (err) {
    return console.log(err);
  }
  consoler.loading('Listening at ' + ip + ':' + port + ' loading...');
});
