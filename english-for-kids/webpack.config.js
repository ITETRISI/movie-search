const path = require('path');

module.exports = {
    entry: ["@babel/polyfill","./src/js/script.js"],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.js',
        publicPath: '/dist'
    },
    devServer:{
        overlay: true
    },
    module: {
        rules: [
			{ test: /\.js$/, exclude: '/node_modules/', loader: "babel-loader" },
			{
				        test: /\.css$/,
				         use: [
				           'style-loader',
				           'css-loader',
				         ],
				       },
			{ test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']}
        ]
    }
}