const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  return {
    entry: "./src/index.js",
    output: {
      filename: "index.js",
      clean: true,
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [["@babel/plugin-transform-runtime", { corejs: 3 }]],
            },
          },
        },
        {
          test: /\.css/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["autoprefixer"]],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new CopyPlugin({
        patterns: [{ from: "static" }],
      }),
    ],
  };
};
