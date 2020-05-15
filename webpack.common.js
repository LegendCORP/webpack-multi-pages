const webpack = require('webpack');
const path = require('path');
const config = require('./config.js');

// Plugins
const AssetsPlugin = require('assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: config.webpack.entrypoints,
    output: {
        path: path.resolve(config.PROJECT_ROOT, 'dist'),
    },
    resolve: {
        alias: {
            '@': path.resolve(config.PROJECT_ROOT, 'src'),
            helpers: path.resolve(config.PROJECT_ROOT, 'src/js/helpers/index'),
        },
        extensions: ['.js', '.vue', '.json'],
    },
    node: {
        fs: 'empty',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(swiper|dom7)\/).*/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /\.(scss|css|sass)$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        // translates CSS into CommonJS
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        // Runs compiled CSS through postcss for vendor prefixing
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        // compiles Sass to CSS
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            sourceMapContents: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new AssetsPlugin({
            filename: 'dist/assets.json',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
        }),
    ],
};