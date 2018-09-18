var webpack = require('webpack');
var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var HTMLPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.config.base.js');

var defaultPlugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_DEV: JSON.stringify('development'),
    },
  }),
  new HTMLPlugin({
    template: path.join(__dirname, './index.html'),
  }),
];

var devServer = {
  port: '8001',
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  hot: true,
};

var config;

config = merge(baseConfig, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  entry: path.join(__dirname, '../practice/index.js'),
  module: {
    rules: [{
      test: /\.styl(us)?$/,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path]-[name]-[hash:base64:5]',
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        'stylus-loader',
      ],
    }],
  },
  devServer: devServer,
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js'),
    },
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]),
});

module.exports = config;
