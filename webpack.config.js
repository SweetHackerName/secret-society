'use strict';
var webpack = require('webpack');
var path = require('path');
console.log("webpack.config running")

// Builds bundle usable inside <script>.
module.exports = {
  context: __dirname,
  entry: {
    'hayride_app': './hayride_app.js'
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "hayride_app",
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  devServer: {
    contentBase: __dirname,
    publicPath: '/dist',
    compress: true,
    port: 8000,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  ],
  resolve: {
  }
};
