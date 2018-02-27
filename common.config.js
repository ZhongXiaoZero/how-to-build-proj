var webpack = require('webpack');
var path = require('path');
var getEntryConfig = require('./getEntryConfig');
var htmlPaths = getEntryConfig.getHtmlPath();
var HtmlWebpackPlugin = require('html-webpack-plugin');
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(DEV)),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});
//扫描app下的html复制和加版本号
var htmlsOptions = htmlPaths.map(html => {
  return new HtmlWebpackPlugin({
    template: html.path,
    filename: html.name,
    inject: false,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
    },
    DEV: DEV
  })
})


//assets的index修改
if (DEV == 1) {
  var hwp = new HtmlWebpackPlugin({
    template: './app/_index.html',
    filename: 'index.html',
    inject: false,
    links: htmlPaths
  })
  var htmlsOptions = htmlsOptions.concat(hwp);
  console.log(htmlsOptions);
}

module.exports = {
  extensions: ['', '.js', '.json', '.scss', '.jsx'],//后缀名自动补全
  plugins: [definePlugin].concat(htmlsOptions),
  root: [path.join(__dirname, "/app/common/css"), path.join(__dirname, "/app/common/image"), path.join(__dirname, "/app/common/components"), path.join(__dirname, "/app/common/js"), path.join(__dirname, "/app/utils"), path.join(__dirname, '/app/utils/mod'), process.cwd() + '/node_modules']
};
