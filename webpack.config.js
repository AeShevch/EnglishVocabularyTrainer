const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

const pathToPublic = path.join(__dirname, `public`);

module.exports = {
  entry: "./src/app.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      services: path.resolve(__dirname, "src/services"),
      utils: path.resolve(__dirname, "src/utils"),
      view: path.resolve(__dirname, "src/view"),
      controller: path.resolve(__dirname, "src/controller"),
      model: path.resolve(__dirname, "src/model"),
      router: path.resolve(__dirname, "src/router"),
    },
  },
  output: {
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    watchFiles: "public/*.html",
    hot: false,
    historyApiFallback: true,
  },
};
