var webpack = require("webpack");
var path = require('path');

module.exports = {
    entry: "./app/main.js",
    output: {
        filename : "public/bundle.js"
    },
   resolve: {
        alias: {
            jquery: path.resolve(__dirname, 'vendor', 'js', 'jquery.min.js'),
            bootstrap: path.resolve(__dirname, 'vendor', 'js', 'bootstrap.min.js')
        }
    }, 
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }

        ]
    }
}