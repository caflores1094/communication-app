'use strict';
const webpack = require('webpack');
const path = require('path');
const rules = require('./webpack.rules');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

rules.push({
    test: /\.css$/,
    exclude: /[\/\\]src[\/\\]/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            sourceMap: true,
        },
    }, {
        loader: 'css-loader',
    }, {
        loader: 'resolve-url-loader',
    }],
});

rules.push({
    test: /\.scss$/,
    exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            sourceMap: true,
        },
    }, {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
        },
    }, {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
        },
    }, {
        loader: 'resolve-url-loader',
    }, {
        loader: 'sass-loader',
    }],
});

module.exports = {
    entry: [
        './src/index.jsx',
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[chunkhash].js',
    },
    resolve: {
        alias: {
            actions: path.resolve(__dirname, 'src', 'actions'),
            components: path.resolve(__dirname, 'src', 'components'),
            static: path.resolve(__dirname, 'src', 'static'),
            css: path.resolve(__dirname, 'src', 'static', 'css'),
            containers: path.resolve(__dirname, 'src', 'containers'),
            reducers: path.resolve(__dirname, 'src', 'reducers'),
            utils: path.resolve(__dirname, 'src', 'utils'),
            img: path.resolve(__dirname, 'src', 'static', 'img'),
            libs: path.resolve(__dirname, 'src', 'static', 'libs'),
        },
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/template.html',
        }),
    ],
};
