
const common = require("./webpack.common");

var HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require("webpack-merge");

const path = require("path");



module.exports = merge(common, {

	mode: "development",

	output: {

		filename: "[name].bundle.js",

		path: path.resolve(__dirname, 'dist')

	},

	module: {

		rules: [

			{

	        	test: /\.scss$/i,

	        	use: ['style-loader', 'css-loader', 'sass-loader'],

	      	},      

		]

	},

	plugins: [

		new HtmlWebpackPlugin({

			template: "./src/template.html"

		}),

	],   
	  	

});