const path = require("path");

module.exports = {
  entry: "./client/index.js", // assumes your entry point is the index.js in the root of your project folder
  mode: "development",
  output: {
    path: path.join(__dirname, "public/"), // assumes your bundle.js will also be in the root of your project folder
    filename: "bundle.js"
  },
  devServer: {
    publicPath: "/",
    contentBase: "./public", // we determined this is the only part we need in here
    hot: true
  },
  devtool: "source-maps",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,

        loader: "babel-loader",
        options: {
          presets: ["@babel/react"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
