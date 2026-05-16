
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ImgLazy } from './directive'
import App from './App.vue'
import router from './router'
import "@/assets/global.css"

// 1. 创建 Pinia 实例并保存到变量
const pinia = createPinia()
// 2. 安装持久化插件
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
// 3. 注册 Pinia 实例
app.use(pinia)
app.use(router)
app.use(ImgLazy)
app.mount('#app')

// 4. 导出 Pinia 实例，供 axios 配置文件使用
export default pinia