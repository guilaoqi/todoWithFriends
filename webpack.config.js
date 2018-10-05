const path=require('path');
const htmlWebpackPlugin=require('html-webpack-plugin');
const vueLoaderPlugin=require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css文件

const webpack=require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //压缩混淆代码

module.exports={
	entry:{
		main:'./src/main.js',
		vendors:['vue','vue-router','moment','axios','vue-preview'] //打包公共模块
	},
	output:{
		publicPath:'/',//注意分目录的话设置请求
		path:path.join(__dirname,'dist'),
		filename:'js/[name][hash].js'    //唯一标示
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				 // use:['style-loader','css-loader']
				 use: [
				 	MiniCssExtractPlugin.loader,
					"css-loader"
				]
			},
			{
			 test:/\.less$/,
			 use:['style-loader','css-loader','less-loader']
			},
			{
			 test:/\.(jpg|png|gif|bmp|jpeg|svg|ttf|woff|woff2|eot)$/,
			 use:{
					loader:'url-loader',
					options:{
						limit:4096,
						name:'assets/[name].[ext]'
					}
				}
			},
			{
			 test:/\.vue$/,
			 use:['vue-loader']
			},
			{
				test:/vue-preview.src.*?js$/,
				use:['babel-loader']
			},
			{
			 test:/\.js$/,
			 exclude:/node_modules/,
			 use:{
			 		loader:'babel-loader'
			 }
			}        
		]
	},
	plugins:[
		new htmlWebpackPlugin({
			template:path.join(__dirname,'src/index.html'),
			filename:'index.html'
		}),
		new vueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename:"css/[name][contenthash].css" //contenthash唯一标示
		}),
		new  UglifyJsPlugin()

	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true
				},
				vendors: {
					name: 'vendors',
					chunks: 'initial',
					minChunks: 2
				}
			}
		}
	},
}