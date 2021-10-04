/*
指令 事件名称    描述
v-tap  点击事件
v-swipe    滑动事件
v-swipeleft    左滑事件
v-swiperight   右滑事件
v-swipedown    下滑事件
v-swipeup  上滑事件
v-longtap  长按事件
*/

import TouchCls from './touch-cls'
// 点击事件
const install = (app) => {
  app.directive('tap', {
    mounted(el, binding) {
      const touch = new TouchCls(el, binding, 'tap')
      touch.initialize()
    }
  })

  // 长按事件
  app.directive('swipe', {
    mounted(el, binding) {
      const touch = new TouchCls(el, binding, 'swipe')
      touch.initialize()
    }
  })
  // 左滑
  app.directive('swipeleft', {
    mounted(el, binding) {
      const touch = new TouchCls(el, binding, 'swipeleft')
      touch.initialize()
    }
  })
  // 右滑
  app.directive('swiperight', {
    mounted(el, binding) {
      const touch = new TouchCls(el, binding, 'swiperight')
      touch.initialize()
    }
  })
  // 下滑
  app.directive('swipedown', {
    mounted(el, binding) {
      const touch = new TouchCls(el, binding, 'swipedown')
      touch.initialize()
    }
  })
  // 上滑
  app.directive('swipeup', {
    mounted(el, binding) {
      const touch = new TouchCls(el, binding, 'swipeup')
      touch.initialize()
    }
  })
  // 长按事件
  app.directive('longtap', {
    mounted(el, binding) {
      const touch = new TouchCls(el, binding, 'longtap')
      touch.initialize()
    }
  })

}

export default {
  install
}


