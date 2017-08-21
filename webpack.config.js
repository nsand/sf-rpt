const path = require('path');

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src', 'app.js'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'bundles'),
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'stage-1', 'react'],
				},
			},
		],
	},
	devtool: 'cheap-module-source-map',
};
