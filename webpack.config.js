/* eslint-disable */
var webpack = require('webpack');
var path = require('path');

var config = {
  target: 'web',
  entry: [
    path.resolve(__dirname, './src/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  externals: {
    'firebase': 'firebase',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'eslint',
      },
    ],
  },
  eslint: {
    formatter: require('eslint-friendly-formatter'),
    failOnError: false,
  },
};

module.exports = config;
