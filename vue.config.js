// eslint-disable-next-line no-global-assign
require = require('esm')(module);

const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

//빌드시 제외할 폴더 목록
const IGNORE_DIRS = ['**/mock/**']

/** Vue Build 옵션 */
module.exports = {
  // Bundle 파일 경로 설정
  outputDir: `dist/${process.env.VUE_APP_MODE + (process.env.COUNTRY ? "/" + process.env.COUNTRY : "")}/contents/`,

  // 파일명 해싱 설정
  filenameHashing: false,

  // .map 파일 생성 여부 설정
  productionSourceMap: process.env.VUE_APP_MODE === 'development',

  // 웹용 배포시 rootPath 설정시 public 경로 지정
  publicPath: process.env.BASE_URL,

  // CSS 관련 옵션 설정
  css: {
    sourceMap: process.env.VUE_APP_MODE === 'development', // 개발모드인 경우 CSS 소스맵 On
    loaderOptions: {
      sass: {
        implementation: require('sass'), // This line must in sass option
      },
    },
  },

  // 개발용 Proxy 서버 설정
  devServer: {
    // 경고 overlay false
    client: {
      overlay: {
        warnings: false,
        errors: true
      },
    },
    // Client dev server https 셋팅 -- true인 경우 key와 cert를 셋팅해야 함
    https: false,
    // sock-js 오류로 인한 설정
    host: '0.0.0.0',
    // POST 통신을 위한 프록시 서버 설정
    proxy: {
      '/proxy.server': {
        target: process.env.VUE_APP_SERVER_URL,
        pathRewrite: { '^/proxy.server' : process.env.VUE_APP_SERVER_CONTEXT },
        changeOrigin: true,
      }
    }
  },

  // 웹팩 체이닝 설정
  chainWebpack: (config) => {
    // 웹팩 추가 옵션 설정
    config.plugins.store.delete('prefetch');

    // Copy 옵션 수정
    config.plugin('copy').tap(([ options ]) => {
      // 빌드시 무시항 public 폴더
      IGNORE_DIRS.forEach(path => {
        options.patterns[0].globOptions.ignore.push(path);
      });

      // 수정된 option 반환
      return [ options ];
    });
  },

  // 웹팩 설정
  configureWebpack: {
    // 웹팩 플러그인 설정
    plugins: [
      new PreloadWebpackPlugin(
        {
          rel: 'preload',
          include: 'asyncChunks',
          as(entry) {
            if (/\.css$/.test(entry)) return 'style';
            if (/\.woff$/.test(entry)) return 'font';
            if (/\.png$/.test(entry)) return 'image';
            return 'script';
          },
          fileBlacklist: [/\.map/]
        }
      )
    ]
  },

  pluginOptions: {
    i18n: {
      locale: process.env.VUE_APP_I18N_LOCALE,
      fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  }
}
