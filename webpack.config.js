const { HotModuleReplacementPlugin, DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const isProduction = process.NODE_ENV === "production";

const ports = [Math.random() * 3000, Math.random() * 3000];

module.exports = {
  mode: isProduction
    ? "production"
    : "development",

  devtool: isProduction
    ? false
    : "source-map",

  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    hot: true, // This is what allows to just replace a module (component)
    port: 3004,
    open: "Google Chrome",
    proxy: {
      "/": {
        target: "http://localhost:3005",
        bypass: function ({ headers }) {
          if (headers.accept.indexOf("html") !== -1) {
            return "/index.html";
          }
        },
      },
    },
  },

  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },

  resolve: {
    extensions: [".ts", ".js", ".tsx", ".scss"],
    plugins: [
      new TsconfigPathsPlugin({
        extensions: [".ts", ".js", ".tsx"],
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.ts(x|)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      }, {
        test: /\.scss$/,
        use: [
          isProduction
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          {
            loader: "css-loader",
            options: {
              minimize: isProduction,
              importLoaders: 1,
            },
          },
          {
            loader: path.resolve("./packages/replace-loader"),
            options: {
              matches: [{
                match: /\b([0-9\.]+)ux\b/g,
                reducer: (_a, b) => (Number(b) * 4) + "px"
              }]
            }
          },
          {
            loader: "postcss-loader",
            options: {}
          },
        ].concat("sass-loader"),
      }
    ],
  },

  plugins: process.env.NODE_ENV === "production"
    ? [
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),

      new UglifyJsPlugin(),

      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ]
    : [
      new HotModuleReplacementPlugin(),

      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),

      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],
}