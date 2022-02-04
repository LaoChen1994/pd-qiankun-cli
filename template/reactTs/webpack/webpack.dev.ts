import * as path from "path";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.common";
import HtmlWebpackPlugin from "html-webpack-plugin";

import "webpack-dev-server";
import webpack from "webpack";

const config = merge(baseConfig, {
  mode: "development",
  entry: path.resolve(__dirname, "../src/index.tsx"),
  devtool: "source-map",
  // @ts-ignore
  devServer: {
    port: 9000,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    open: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".scss", "css"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});

export default config;
