var webpack = require('webpack');
var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var HTMLPlugin = require('html-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.config.base.js');

var isDev = process.env.NODE_DEV === 'development';

var defaultPlugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_DEV: isDev ? '"development"' : '"production"',
    },
  }),
  new HTMLPlugin(),
];

var devServer = {
  port: '8000',
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  hot: true,
};

var config;

if (isDev) {
  config = merge(baseConfig, {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
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
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      // new webpack.NoEmitOnErrorsPlugin(),
    ]),
  });
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
    },
    output: {
      filename: '[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
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
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: true,
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[chunkhash:8].css'),
    ]),
  });
}

module.exports = config;
