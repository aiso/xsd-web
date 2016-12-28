'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const _ = require('./utils')

module.exports = {
  entry: {
    client: './client/index.js'
  },
  output: {
    path: _.outputPath,
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.css', '.json'],
    alias: {
      root: path.join(__dirname, '../client'),
      components: path.join(__dirname, '../client/components')
    },
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loaders: ['vue']
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: [/node_modules/]
      },
      {
        test: /\.es6$/,
        loaders: ['babel']
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ],
    postLoaders: [
      { test: /vue-icons/, loader: "callback-loader"}
    ],
  },
  callbackLoader: require("vue-icons/icon-loader")([
    'material-home',
    'material-menu',
    'material-more_horiz',
    'material-more_vert',
    'material-extension',
    'material-info_outline',
    'material-wifi',
    'material-edit',
    'material-arrow_back',
    'material-chevron_right',
    'material-clear',
    'material-person',
    'material-person_add',
    'material-vpn_key',
    'material-add',
    'material-remove',
    'material-exit_to_app',
    'material-keyboard_backspace',
    'material-backspace',
    'material-done',
    'material-work',
    'material-local_offer',
    'material-build',
    'material-store',
    'material-store_mall_directory',
    'material-notifications',
    'material-delete_forever',
    'material-shopping_cart',
    'material-remove_shopping_cart',
    'material-favorite',
    'material-favorite_border',
    'material-check_box',
    'material-check_box_outline_blank',
    'material-local_shipping',
    'material-payment',
    'material-refresh',
    'material-import_export',
    'material-error_outline',
    'material-textsms',
    'material-backspace',
    'material-shopping_basket',
    'material-call',
    'material-local_mall',
    'material-hourglass_empty',
    'material-subscriptions'
  ]),
  babel: config.babel,
  postcss: config.postcss,
  vue: {
    loaders: {},
    postcss: config.postcss
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.title,
      template: __dirname + '/index.html',
      filename: _.outputIndexPath,
      favicon: path.join(__dirname, '../client/assets/favicon.ico')
    })
  ],
  target: _.target
}
