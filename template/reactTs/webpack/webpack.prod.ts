import * as path from "path";
import * as webpack from "webpack";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.common";
import TerserPlugin from "terser-webpack-plugin";

const config: webpack.Configuration = merge(baseConfig, {
  mode: "production",
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name]_[hash:64].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".css"],
  },
  plugins: [new webpack.AutomaticPrefetchPlugin()],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ]
  },
});

export default config;
