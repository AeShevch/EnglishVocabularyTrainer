const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");

const pathToPublic = path.join(__dirname, `public`);

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    watchFiles: "public/*.html",
    hot: false
  }
};
