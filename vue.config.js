module.exports = {
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
  //配置cors跨域请求, 接口地址是(去哪儿网)YApi提供的mock接口
  devServer: {
    proxy: 'http://yapi.demo.qunar.com/mock/84467'
  }
};