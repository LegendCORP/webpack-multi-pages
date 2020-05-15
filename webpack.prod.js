const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

const {PROJECT_ROOT} = require('./config.js');

module.exports = merge.smart(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: 'js/[name].js',
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                exclude: [/\/node_modules/, /\/CodeLibrary/],
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true,
                    module: false,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                },
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(path.resolve(PROJECT_ROOT, 'dist'), {
            root: PROJECT_ROOT,
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                map: {
                    inline: false,
                },
                discardComments: {
                    removeAll: true,
                },
            },
            canPrint: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(config.PROJECT_ROOT, 'src/images/'),
                to: path.resolve(config.PROJECT_ROOT, 'images/'),
            },
        ]),
        new ImageminPlugin({
            cacheFolder: path.resolve(config.PROJECT_ROOT, 'node_modules/.cache'),
            pngquant: {
                quality: '70-80',
            },
            plugins: [
                imageminMozjpeg({
                    quality: 70,
                    progressive: true,
                }),
            ],
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
    ],
});