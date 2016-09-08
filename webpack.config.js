const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cssnext  = require('postcss-cssnext');
const nested   = require('postcss-nested');
const atImport = require('postcss-import');

const colors = require('colors');

module.exports = {
    entry: [
        './src/js/app.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css?minimize&-url!postcss'),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public')
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ],
    postcss: webpack => [
        atImport({
            paths: [
                path.join(__dirname, 'src', 'css'),
                path.join(__dirname, 'node_modules')
            ],
            addDependencyTo: webpack
        }),
        nested,
        cssnext()
    ]
};
