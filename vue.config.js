// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 基础路径 注意发布之前要先修改这里
// let baseUrl = process.env.NODE_ENV === 'production' ? '/d2-admin-pm/' : '/'

module.exports = {
  baseUrl: '/', // 根据你的实际情况更改这里
    outputDir: 'dist', // 默认dist
    indexPath: 'index.html', // Default: 'index.html'
  //   filenameHashing: true,
  //   pages: undefined,
  //   runtimeCompiler: false,
  //   transpileDependencies: [],
  //   productionSourceMap: false,
  // lintOnSave: false,
    devServer: {
        host: '0.0.0.0',
        port: "8081",//代理端口
        https: false,
        open: true,//项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
        hotOnly: false,
        proxy: {
            '/': {//代理api
                target: 'https://easy-mock.com/mock/5b7a3879c474816c61856f3b/index/',//服务器api地址
                // target: 'http://localhost:3000',//服务器api地址
                changeOrigin: true,//是否跨域
                ws: false,
                pathRewrite: {//重写路径
                    "^/": ''
                }
            }
        }
    },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: `@import '~@/assets/style/public.scss';`
      }
    }
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
    // markdown
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
    // 重新设置 alias
    config.resolve.alias
      .set('@', resolve('src'))
    // babel-polyfill 加入 entry
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
  }
}
