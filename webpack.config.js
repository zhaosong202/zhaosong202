const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: {
    app: ["@babel/polyfill", "./src/app.js"],
  },
  output: {
    publicPath: "./",
    path: path.resolve(__dirname, "build"),
    filename: "app.bundle.js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"],
        },
      },
      // Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["raw-loader"],
      },
    ],
  },
  plugins: [new CompressionPlugin()],
  devServer: {
    contentBase: path.join(__dirname, ""),
    compress: true,
    watchContentBase: true,
    port: 3003,
    host: "127.0.0.1", //your ip address
    disableHostCheck: true, //coment these out for prod
  },
  node: {
    fs: "empty",
  },
};
