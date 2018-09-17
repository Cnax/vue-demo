var path = require('path');
var createVueLoaderOptions = require('./vue-loader.config');

const isDev = process.env.NODE_DEV === 'development';

var config = {
  target: 'web',
  mode: 'production',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev),
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resource/[path][name].[ext]',
            },
          }
        ],
      },
    ],
  },
};

module.exports = config;
