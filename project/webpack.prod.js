
const common = require("./webpack.common");

var HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require("webpack-merge");

const path = require("path");


const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const MinifyPlugin = require("babel-minify-webpack-plugin");



module.exports = merge(common, {

	mode: "production",

	output: {

		filename: "[name].[contentHash].bundle.js",

		path: path.resolve(__dirname, 'dist')

	},

	plugins: [ 

		new MiniCssExtractPlugin({filename: "[name].[contentHash].css"}), 

		new CleanWebpackPlugin(),

		new HtmlWebpackPlugin({

			template: "./src/template.html",

			minify: {

				removeAttributeQuotes: true,

				collapseWhitespace: true,

				removeComments: true,

			},

		}), 

	],

	module: {

		rules: [

			{

	        	test: /\.scss$/i,

	        	use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],

	      	},      

		],

	},

	optimization: {

		minimizer: [new OptimizeCssAssetsPlugin(), new MinifyPlugin()],

	},

});