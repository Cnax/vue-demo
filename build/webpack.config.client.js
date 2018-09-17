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
    }
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
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          'stylus-loader',
        ],
      }]
    },
    devServer: devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]),
  });
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue'],
    },
    output: {
      filename: '[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                }
              },
              'stylus-loader'
            ],
          })
        }
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {              // 这里开始设置缓存的chunks
          commons: {
            chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            minSize: 0,             // 最小尺寸，默认0,
            minChunks: 2,           // 最小 chunk ，默认1
            maxInitialRequests: 5   // 最大初始化请求书，默认1
          },
          vendor: {
            test: /node_modules/,   // 正则规则验证，如果符合就提取 chunk
            chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            name: 'vendor',         // 要缓存的 分隔出来的 chunk 名称
            priority: 10,           // 缓存组优先级
            enforce: true
          }
        }
      },
      runtimeChunk: true
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[chunkhash:8].css')
    ]),
  });
}

module.exports = config;
