import * as webpack from "webpack";
import * as path from "path";

const config: webpack.Configuration = {
  module: {
    rules: [
      {
        test: /.(m?js|jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /.tsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                [
                  "@babel/preset-typescript",
                  {
                    isTsx: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  cache: true,
  output: {
    path: path.resolve(__dirname, "../dist"),
    library: "ReactMicroApp",
    libraryTarget: "umd",
  },
};

export default config;
