var fs = require('fs');
var path = require('path');
var getConfig = function (build) {
  var href = 'app/www';
  var files = fs.readdirSync(href);
  var outputConfig = {};
  files.forEach((file) => {
    var src = path.join(href, file, 'main');
    var stat = fs.existsSync(src);
    if (!stat) return false;
    var scripts = fs.readdirSync(src);
    scripts.forEach(script => {
      var index = script.indexOf('.js') == -1 ? "" : script.indexOf('.js');
      var config = [];
      if (!index) return;
      var name = script.substring(0, index);
      if (outputConfig[name]) {
        var oldSrc = outputConfig[name][1];
        throw new Error(src + '这个文件名在' + oldSrc + '已经存在，请重命名');
      }
      config.unshift('babel-polyfill');
      config.push(path.join(path.resolve(__dirname, src), script));
      console.log(config);
      outputConfig[name] = config;
    });
  });
  return outputConfig;
};
var getHtmlPath = function () {
  var href = 'app/www';
  var files = fs.readdirSync(href);
  var htmlPathAry = [];
  files.forEach(file => {
    var src = path.join(href, file);
    var stat = fs.existsSync(src);
    var status = fs.statSync(src);
    if (!stat) return false;
    if (status.isFile()) return false;
    var htmls = fs.readdirSync(src);
    htmls.forEach(html => {
      var index = html.indexOf('.html') == -1 ? "" : html.indexOf('.js');
      var config = {};
      config.name = html;
      config.path = path.join(path.resolve(__dirname, src), html);
      if (!index) return;
      htmlPathAry.push(config);
    })
  });
  console.log(htmlPathAry);
  return htmlPathAry;
};
module.exports = {
  entryPath: function (build) {
    return getConfig(build);
  },
  getHtmlPath: getHtmlPath
};
