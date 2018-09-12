var webpack = require('webpack');
var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var HTMLPlugin = require('html-webpack-plugin');


const isDev = process.env.NODE_DEV === 'development';

var config = {
  target: 'web',
  mode: 'production',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_DEV: isDev ? '"development"' : '"production"',
        }
      }),
      new HTMLPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]',
            },
          }
        ],
      },
    ],
  },
};

if (isDev) {
  config.mode = 'development';
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    port: '8000',
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    hot: true,
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

module.exports = config;
