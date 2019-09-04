module.exports = {
  //Default: '/' 
  //部署应用包时的基本 URL， 用法和 webpack 本身的 output.publicPath 一致。
  //这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径。
  publicPath: './',
  //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "./src/assets/style/main.scss";`
      }
    }
  },
  //配置api接口代理  解决cors跨域请求, 接口地址是(去哪儿网)YApi提供的mock接口
  devServer: {
    proxy: {
      '/api': {
        target: 'http://yapi.demo.qunar.com',
        ws: true, //websocket
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/mock/84467/api'
        }
      },
      '/test': {
        target: 'http://yapi.demo.qunar.com/mock/84467',
        ws: true, //websocket
        changeOrigin: true
      }
    }
  }
};