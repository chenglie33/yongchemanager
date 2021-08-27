// const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
// const fs = require('fs')
// const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

const publicConfig = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        dayjs: 'dayjs'
      })
      // new BundleAnalyzerPlugin({analyzerPort: 8889})
    ],
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
  },

  css: {
    extract: !!isProduction,
    sourceMap: !isProduction,
    loaderOptions: {
      sass: {
        prependData: '@import "@/define.scss";'
      },
      scss: {
        prependData: '@import "@/define.scss";'
      }
    }
  },
  chainWebpack: (config) => {
  }
}
const develop = {
  devServer: {
    https: false,
    hot: true,
    overlay: {
      warnings: false
    },
    proxy: {
      '/ht-api': {
        target: 'http://192.168.31.107:8880/'
        // pathRewrite: {
        //   '^/ht-api': ''
        // }
      }
      // '/common': {
      //   target: 'http://192.168.31.107:8880/'
      // },
      // '/real': {
      //   target: 'http://192.168.31.107:8880/'
      // },
      // history: {
      //   target: 'http://192.168.31.107:8880/'
      // }

    }
  },
  lintOnSave: false,
  configureWebpack: {
  }

}

const product = {
  productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: {
    // plugins: [
    //   new CompressionWebpackPlugin({
    //     algorithm: 'gzip',
    //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    //     threshold: 10240,
    //     minRatio: 0.8
    //   })
    // ]
  }
}

// if (process.env.VUE_APP_SINGLE) {
//   const mapEntry = { pages: {} }
//   walkSync(resolve(__dirname, 'src/page'), function (name) {
//     mapEntry.pages[name.substring(0, name.length - 3)] = `src/page/${name}`
//   })
//   product = merge(product, mapEntry)
// }

if (isProduction) {
  module.exports = merge(publicConfig, product)
} else {
  module.exports = merge(publicConfig, develop)
}
