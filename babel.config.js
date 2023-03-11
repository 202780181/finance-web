module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",       // 即调用的是，babel-plugin-component 插件
      {
        "libraryName": 'mars-comps-lib',  // 指定按需引入库的名称
        "style": false,  // 是否按需引入 mars-comps-lib 的样式文件，此处是 false。因为 mars-comps-lib 的样式，未做可按需引入的处理
        "libDir": "lib"  // 库引入时的入口文件名，此处必须是 lib。因为 mars-comps-lib 的入口定义就是在 /lib 下
      },
      "mars-comps-lib",  // 因为可能会按需引入多个库，所以需在此处标记每个库的名称
    ]
  ]
}
