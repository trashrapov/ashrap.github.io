const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webpack = require('webpack');

const path = require("path");



module.exports = {

	mode: "production",

	entry: {

		vendor: "./src/js/vendor.js",

		main: "./src/js/index.js",		

	},

	module: {

	    rules: [  

	    		{
			    
			        test: /\.vue$/,
			    
			        loader: 'vue-loader',
			    
			    }, 


		      	{

		        	test: /\.html$/i,

		        	use: ['html-loader'],

		      	},

		      	{

		        	test: /\.(jpg|jpeg|png|gif|svg)$/i,

		        	use: {

		        		loader: 'file-loader',

		        		options: {

		        			name: '[name].[hash].[ext]',

		        			outputPath: 'imgs',

		        		}

		        	},

		      	},


		    
		],
	  
	},

	plugins: [		

		new webpack.ProvidePlugin({
      		
      		$: 'jquery',
      
      		jQuery: 'jquery',
      		
      		'window.jQuery': 'jquery'
    
    	}),

    	new VueLoaderPlugin(),

	],

	resolve: {
	  	
	  	alias: {
	    
	    	vue: 'vue/dist/vue.js'
		
		}
	
	}

};