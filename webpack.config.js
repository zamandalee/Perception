const path = require('path');

module.exports = {
  context: __dirname,
  entry: "./js/perception.js",
  output: {
    path: "./",
    filename: "./js/bundle.js"
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devtool: 'source-maps'
};
