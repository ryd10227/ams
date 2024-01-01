// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

// eslint-disable-next-line no-global-assign
require = require("esm")(module);

const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

/** Vue Build 옵션 */
module.exports = {
  // 파일명 해싱 설정
  filenameHashing: false,

  // 웹용 배포시 rootPath 설정시 public 경로 지정
  publicPath: "/",

  // CSS 관련 옵션 설정
  css: {
    sourceMap: true, // CSS 소스맵 On
  },

  // 웹팩 설정
  configureWebpack: {
    // 웹팩 플러그인 설정
    plugins: [
      new PreloadWebpackPlugin({
        rel: "preload",
        include: "asyncChunks",
        as(entry) {
          if (/\.css$/.test(entry)) return "style";
          if (/\.woff$/.test(entry)) return "font";
          if (/\.png$/.test(entry)) return "image";
          return "script";
        },
        fileBlacklist: [/\.map/],
      }),
    ],
  }
};
