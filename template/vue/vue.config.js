const path = require("path");

module.exports = {
  devServer: {
    port: 8080,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
      output: {
          // 需要和主应用中注册的library名称一致
          library: "{{ name }}",
          // umd打包
          libraryTarget: "umd",
          jsonpFunction: `webpackJsonp_VueMicroApp`
      }
  }
};
