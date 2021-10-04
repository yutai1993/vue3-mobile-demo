module.exports = {
  // 忽略单个属性的最简单方法是在像素单位声明中使用大写字母，将px写为Px。
  plugins: {
    "postcss-pxtorem": { // 把px单位换算成rem单位
      // 设计稿 375: 37.5
      // 设计稿 750: 75
      // Vant 是基于375
      rootValue: 37.5,
      unitPrecision: 5, //允许REM单位增长到的十进制数字,小数点后保留的位数。
      propList: ['*']

    },
    'autoprefixer': {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
        //'last 2 versions', // 所有主流浏览器最近2个版本
      ],

    }
  }
}
