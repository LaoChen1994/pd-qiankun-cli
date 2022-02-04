import * as webpack from "webpack";
import * as path from "path";

const config: webpack.Configuration = {
  module: {
    rules: [
      {
        test: /.(m?js|jsx?)$/,
        exclude: /node_modules/,
        use: [
          "thread-loader",
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /.tsx?/,
        exclude: /node_modules/,
        use: [
          "thread-loader",
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
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
      {
        test: /\.css/,
        use: ["thread-loader", "style-loader", "css-loader"],
      },
      {
        test: /\.s(a|c)ss/,
        use: ["thread-loader", "style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  cache: true,
  {{#if isQianKun}}
  output: {
    path: path.resolve(__dirname, "../dist"),
    library: "{{ name }}",
    libraryTarget: "umd",
  },
  {{/if}}
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 35,
    }),
    //设定最小分片条件
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 100,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        commons: {
          name: "common",
        },
      },
    },
  },
};

export default config;
