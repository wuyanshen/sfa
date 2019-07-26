module.exports = {
  presets: ["@vue/app"], //babel7  @vue/app包含了babel.env的映射，删除.babelrc文件使用这个文件
  "plugins": [
    [
      "component",
      {
        "libraryName": "mint-ui",
        "style": true
      }
    ]
  ]
};