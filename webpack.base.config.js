const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './source'),
  build: path.join(__dirname, './build'),
  assets: './assets'
};

module.exports = {

  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src + '/pages/index/index.js'
  },
  output: {
    filename: `${PATHS.assets}/js/[name].js`,
    path: PATHS.build
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: ['babel-loader', 'eslint-loader'],
      exclude: '/node_modules/'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: PATHS.assets + '/img/',
        publicPath: '../img/'
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: './postcss.config.js'
            }
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: false,
            config: {
              path: './postcss.config.js'
            }
          }
        }
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}/css/[name].css`,
      publicPath: '../'
    }),
    new HtmlWebpackPlugin({
      template: PATHS.src + '/pages/index/index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/assets/img`, to: `${PATHS.build}/assets/img` }
    ])
  ]
};
