const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cssnext  = require('postcss-cssnext');
const nested   = require('postcss-nested');
const atImport = require('postcss-import');

const colors = require('colors');

const isProd = (process.env.NODE_ENV === 'production');

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
                test  : /\.css$/,
                loader: ExtractTextPlugin.extract('css?minimize&-url!postcss'),
            },
            {
                test   : /\.js$/,
                include: /src/,
                loader : 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
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

if (isProd) {
    console.log('[Production build loaded]');

    module.exports.devtool = null;

    module.exports.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));

    module.exports.plugins.push(new webpack.optimize.DedupePlugin());

    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: false }));
}
