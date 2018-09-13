var webpack = require('webpack');
var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var HTMLPlugin = require('html-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');


const isDev = process.env.NODE_DEV === 'development';

var config = {
  target: 'web',
  mode: 'production',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
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
  config.module.rules.push({
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
  });
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
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue'],
  };
  config.output.filename = '[name].[chunkhash:8].js';
  config.module.rules.push({
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
  });
  config.optimization = {
    splitChunks: {
      cacheGroups: {                  // 这里开始设置缓存的 chunks
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
  };
  config.plugins.push(
    new ExtractPlugin('styles.[chunkhash:8].css')
  );
}

module.exports = config;
