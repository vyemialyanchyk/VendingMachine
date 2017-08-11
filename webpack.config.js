var path = require('path'),
	webpack = require('webpack'),
	ExtendedDefinePlugin = require('extended-define-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ChunkManifestPlugin = require('chunk-manifest-webpack-plugin'),
	nodeEnv = process.env.NODE_ENV;

var sourcePath = path.join(__dirname, 'src');
var DEBUG = nodeEnv.startsWith('dev');
var basename = '';

console.log('Configuring for: ' + nodeEnv + ', DEBUG: ' + DEBUG);


var config = {
	context: sourcePath,
	entry: {
		'vending_machine_application': './app/vending-machine.js',
		// vendor: [
		// 	'babel-polyfill',
		// 	'debug',
		// 	'react',
		// 	'react-dom',
		// 	'react-router',
		// 	'mobx',
		// 	'mobx-react'
		// ]
	},

	devtool: 'source-map',

	output: {
		path: path.join(__dirname, 'build'),
		publicPath: basename + '/',
		filename: '[name].bundle.[hash].js'
	},

	devServer: {
		contentBase: path.join(__dirname, 'build'),
		historyApiFallback: true
	},

	module: {
		noParse: /path.join(__dirname, 'node_modules')/,
		rules: [{
			test: /\.(jpg|ico)$/,
			include: /src/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '/images/[name].[ext]'
				}
			}]
		}, {
			test: /\.js$/,
			enforce: 'pre',
			loader: 'source-map-loader'
		}, {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: [{
				loader: 'react-hot-loader'
			}, {
				loader: 'babel-loader'
			}]
		}, {
			test: /\.jsx$/,
			exclude: /(node_modules|bower_components)/,
			use: DEBUG ? [{
				loader: 'jsx-loader',
				options: {
					insertPragma: 'React.DOM',
					harmony: true
				}
			}, {
				loader: 'react-hot-loader'
			}, {
				loader: 'babel-loader'
			}] : [{
				loader: 'babel-loader'
			}]
		}, {
			test: /\.tsx?$/,
			exclude: /(node_modules|bower_components)/,
			use: DEBUG ? [{
				loader: 'jsx-loader',
				options: {
					insertPragma: 'React.DOM',
					harmony: true
				}
			}, {
				loader: 'react-hot-loader'
			}, {
				loader: 'babel-loader'
			}, {
				loader: 'ts-loader'
			}] : [{
				loader: 'babel-loader'
			}, {
				loader: 'ts-loader'
			}]
		}]
	},

	resolve: {
		modules: [
			sourcePath,
			'node_modules',
		],
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},

	plugins: [
		new HtmlWebpackPlugin({
			favicon: 'favicons/favicon.ico',
			filename: 'index.html',
			title: 'Vending Machine',
			//chunks: ['vendor', 'vending_machine_application'],
			chunks: ['vending_machine_application'],
			template: 'index.html',
		}),

		new ExtendedDefinePlugin({
			__DEBUG__: DEBUG,
			__BASENAME__: basename,
		}),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': `'${nodeEnv}'`,
		}),

		// new webpack.optimize.CommonsChunkPlugin({
		// 	filename: 'vendor.bundle.[hash].js',
		// 	name: 'vendor',
		// }),

		new ChunkManifestPlugin({
			filename: 'manifest.json',
			manifestVariable: 'webpackManifest',
			inlineManifest: false,
		}),
	]
};

module.exports = config;