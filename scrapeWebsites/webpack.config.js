var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: null,
  entry: "./public/js/app.js",
  output: {
    path: __dirname + "/public/jsbin",
    filename: "appPack.js"
  }
};