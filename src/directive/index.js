import { useIntersectionObserver } from '@vueuse/core'

export const ImgLazy = {
  install(app) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        // 1. 定义监听，解构 stop 方法
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              // 赋值真实图片地址
              el.src = binding.value
              // 加载失败容错
              el.onerror = () => {
                el.src = 'https://picsum.photos/200/300' // 占位图
              }
              // ✅ 核心：加载后立即停止监听，防止内存泄漏
              stop()
            }
          },
          // 配置：提前加载，体验更流畅
          { threshold: 0.1 }
        )
        // ✅ 关键修复：把 stop 挂载到 el 上，让 unmounted 能访问到
        el._stopObserver = stop
      },
      // 组件销毁时，清理监听（双重保险）
      unmounted(el) {
        el._stopObserver && el._stopObserver()
      }
    })
  }
}
