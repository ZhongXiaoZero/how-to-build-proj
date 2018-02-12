const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	entry: __dirname + "/app/main.js",
	output: {
		path: __dirname + "/build",
		filename: "bundle.js"
	},
	devServer: {
		contentBase: "./public",	//本地服务器所加载额度页面所在的目录
		historyApiFallback: true,	//不跳转
		port: 9000,
		inline:true,	//实时刷新
		hot: true
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader"
				},
				exclude: /node_modules/
			},
			{
				test: /\.css?$/,
				loader: 'style-loader!css-loader!postcss-loader'
			},
		]
	},
	plugins: [
		new webpack.BannerPlugin('有空一起学习呀'),
		new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin()	//热加载插件
	]
}
