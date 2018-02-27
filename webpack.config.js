var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./common.config.js');
var entryConfig = require('./getEntryConfig').entryPath(true);
entryConfig.vendors = ['react', 'react-dom'];
module.exports = {
  entry: entryConfig,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].build.js',
    publicPath: ''
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        // activate source maps via loader query
        'css?sourceMap!autoprefixer-loader!' +
        'sass?sourceMap'
      )
    }, {
      loader: "babel-loader",

      // Skip any files outside of your project's `src` directory
      include: [
        path.resolve(__dirname, "app"),
      ],

      // Only run `.js` and `.jsx` files through Babel
      test: /\.jsx?$/,

      // Options to configure babel with
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react'],
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        // activate source maps via loader query
        'css?sourceMap!autoprefixer-loader'
      )
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'url?limit=250000'
    }],
    noParse: [pathToReact]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('venders', 'venders.js'),
    new ExtractTextPlugin('css/[name].styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"dev"',
      '__DEV__':true
    }),
  ].concat(commonConfig.plugins),
  resolve: {
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    extensions: commonConfig.extensions,//后缀名自动补全
    //        //后续直接 require('bb') 即可
    //  alias: {react:pathToReact}
    root: commonConfig.root
  }
};
