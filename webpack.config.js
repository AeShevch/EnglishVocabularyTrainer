const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

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
    // Public path for the GitHub Pages
    publicPath: process.env.DEPLOY ? "/EnglishVocabularyTrainer" : "/",
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    // HACK: Swapping 404 page for GitHub Pages to enable routing via History API
    process.env.DEPLOY &&
      new htmlWebpackPlugin({
        filename: "404.html",
        template: path.resolve(__dirname, "public", "index.html"),
      }),
  ],
  devServer: {
    watchFiles: "public/*.html",
    hot: false,
    historyApiFallback: true,
  },
};
