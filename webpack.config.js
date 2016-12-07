var path = require('path');
var webpack = require("webpack");

var widgetPath = '/src/widget';
var toolPath = '/src';

module.exports = {
    entry: {
        app:['./src/app.js'],
    },
    output: {
        path: './tmp',
        filename: '[name].bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: 'style!css!less',
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass',
            },
            { 
                test: /\.css$/, 
                loader: 'style!css'
            },
        ],
    },
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({
            React: "react",
            ReactDOM: "react-dom",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    cache: false,
    resolve: {
        alias:{
            Signal: path.join(__dirname, toolPath, "/signal.js"),
            Request: path.join(__dirname, toolPath, "/request.js"),
            API: path.join(__dirname, toolPath, "/api.js"),
            Util: path.join(__dirname, toolPath, "/util.js"),
            Input: path.join(__dirname, widgetPath, "/input/index.js")
        }
    }
};


