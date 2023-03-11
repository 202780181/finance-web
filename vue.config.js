const path = require('path')
const publicPath = ''          // 满足部署时，按任意目录放置
// const host = '192.168.70.147'  // devServer 配置，npm run serve 前，改写为本机当前 ip
const host = '0.0.0.0' //localhost和 http://192.168.70.139都能访问
const port = 9530 // dev port

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  publicPath, outputDir: "dist",  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)
  assetsDir: "static",  // 放置生成的静态资源 (js、css、img、fonts) 的目录。覆写 filename 或 chunkFilename 时，assetsDir 会被忽略。 static 表示都放到 dist 下的 static 目录下
  indexPath: "index.html",  // 生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  filenameHashing: true,  // 要求 index 的 HTML 是被 Vue CLI 自动生成的
  pages: undefined,  // 在 multi-page（多页）模式下构建应用
  // devServer 配置，所有 webpack-dev-server 的选项都支持。有些值像 host、port 和 https 可能会被命令行参数覆写。
  // Css相关配置
  css: {
    requireModuleExtension: false,  // 将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    extract: process.env.NODE_ENV === 'development' ? false : false,  // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    sourceMap: false, // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
    // loaderOptions: {  // 向 CSS 相关的 loader 传递选项。支持的loader： css-loader、postcss-loader、sass-loader、less-loader、stylus-loader
    //   sass: {
    //     // 根据自己样式文件的位置调整，
    //     prependData: `@import "@/assets/index.scss";`
    //   }
    // }
  }, devServer: {
    disableHostCheck: true,
    clientLogLevel: 'warning',
    historyApiFallback: true,
    compress: false,
    hot: true,
    hotOnly: true,
    publicPath,
    host,
    port,
    open: true,
    quiet: true,
  },
  configureWebpack: config => {
    config.optimization.minimizer = []
    if (process.env.NODE_ENV === "development") {  // 开发环境，带上 scource-map，不然错误不好找
      config.devtool = 'cheap-source-map'
    } else if (process.env.NODE_ENV === 'production') {
      config.optimization.runtimeChunk = 'single', config.optimization.splitChunks = {
        chunks: 'all', cacheGroups: {
          frame: {
            name: 'chunk-frames', test: /[\\/]node_modules[\\/]mars-ui-frame[\\/]/, priority: 40,
          }, comps: {
            name: 'chunk-comps', test: /[\\/]node_modules[\\/]mars-comps-lib[\\/]/, priority: 45,
          }, css: {
            name: 'chunk-css-lib', test: /[\\/]node_modules[\\/]mars-css-lib[\\/]/, priority: 50,
          }, mmDict: {
            name: 'chunk-mm-dicts', test: /[\\/]node_modules[\\/]mm-dicts-manage[\\/]/, priority: 28,
          }, mmStus: {
            name: 'chunk-mm-stus', test: /[\\/]node_modules[\\/]mm-students-manage[\\/]/, priority: 28,
          }, libs: {
            name: 'chunk-libs', test: /[\\/]node_modules[\\/]/, priority: 10, chunks: 'initial' // 只打包初始时依赖的第三方
          }, elementUI: {
            name: 'chunk-elementUI', // 单独将 elementUI 拆包
            test: /[\\/]node_modules[\\/]element-ui[\\/]/, priority: 20 // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          }, echarts: {
            name: 'chunk-echarts', // 单独将 echarts 拆包
            test: /[\\/]node_modules[\\/]echarts[\\/]/, priority: 15 // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          }, vueEcharts: {
            name: 'chunk-vue-echarts', // 单独将 echarts 拆包
            test: /[\\/]node_modules[\\/]vue-echarts[\\/]/, priority: 21 // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          }, pdfjs: {
            name: 'chunk-pdfjs', test: /[\\/]node_modules[\\/]pdfjs-dist[\\/]/, priority: 22
          }, hlsjs: {
            name: 'chunk-hlsjs', test: /[\\/]node_modules[\\/]hls.js[\\/]/, priority: 23
          }, fullcalendar: {
            name: 'chunk-fullcalendar', test: /[\\/]node_modules[\\/]fullcalendar[\\/]/, priority: 24
          }, videojs: {
            name: 'chunk-videojs', test: /[\\/]node_modules[\\/]video.js[\\/]/, priority: 25
          }, pinyin4js: {
            name: 'chunk-pinyin4js', test: /[\\/]node_modules[\\/]pinyin4js[\\/]/, priority: 26
          }, bpmnjs: {
            name: 'chunk-bpmnjs', test: /[\\/]node_modules[\\/]bpmn-js[\\/]/, priority: 27
          }, diagramjs: {
            name: 'chunk-diagramjs', test: /[\\/]node_modules[\\/]diagram-js[\\/]/, priority: 28
          }, codemirror: {
            name: 'chunk-codemirror', test: /[\\/]node_modules[\\/]codemirror[\\/]/, priority: 29
          }, highlightjs: {
            name: 'chunk-highlightjs', test: /[\\/]node_modules[\\/]highlightjs[\\/]/, priority: 30
          }, commons: {
            name: 'chunk-comomns', test: resolve('src/components'), // 可自定义拓展你的规则
            minChunks: 3, // 最小公用次数
            priority: 5, reuseExistingChunk: true
          }
        }
      }
    }
  },
}
