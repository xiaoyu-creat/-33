const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const cpns = resolve(__dirname, 'src/components')
const views = resolve(__dirname, 'src/views')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置路由
  configureWebpack: {
    devServer: {
      open: true,
      host: 'localhost',
      port: 8080
    },
    resolve: {
      alias: {
        cpns,
        views
      }
    }
  }
})
