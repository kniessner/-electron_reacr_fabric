const webpack = require("webpack");
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: "./app/index.js"
  },
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/"
  },
  //devtool: "eval-source-map",
  module: {
    rules: [
      { test: /bootstrap\/dist\/js\/umd\//, loader: "imports?jQuery=jquery" },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          // plugins: ['lodash'],
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        loader: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // ?importLoaders=1translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "file-loader?limit=8192&name=assets/[name].[ext]?[hash]"
      }
    ]
  },
  externals: ["child_process", "anychart", "d3"],
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.ejs"
    }),
    new CopyWebpackPlugin([
      { from: "./app/favicon.ico" },
      { from: "./app/assets", to: "assets" }
    ]),
    new webpack.ExternalsPlugin("commonjs", ["electron"]),
    new webpack.ProvidePlugin({
      $: "jquery",
      d3: "d3",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"],
      Tether: "tether"
    })
  ]
};
