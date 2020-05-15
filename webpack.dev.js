const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const config = require('./config.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {PROJECT_ROOT} = require('./config.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    watchOptions: {
        ignored: /node_modules/,
    },
    output: {
        filename: 'js/[name].js',
    },
    plugins: [
        new CleanWebpackPlugin(path.resolve(PROJECT_ROOT, 'dist'), {
            root: PROJECT_ROOT,
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                map: {
                    inline: true,
                },
                discardComments: {
                    removeAll: false,
                },
            },
            canPrint: true,
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(config.PROJECT_ROOT, 'src/images/'),
                to: path.resolve(config.PROJECT_ROOT, 'images/'),
            },
        ]),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
    ],
});
