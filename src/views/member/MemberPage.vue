<script setup>
// 👇 逻辑代码完全不动，无任何修改
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const r = ref(0)
watch(() => route.fullPath,
  (k) => {
    if (k === '/myself') {
      r.value = 0
    }
    else {
      r.value = 1
    }
  }, { immediate: true })
</script>

<template>
  <div class="user-container">
    <!-- 侧边导航栏 -->
    <div class="sidebar">
      <h2 class="menu-title">我的账户</h2>
      <span @click="$router.push('/myself')" :class="{ active: r === 0 }">
        个人中心
      </span>

      <h2 class="menu-title">交易管理</h2>
      <span @click="$router.push('/order')" :class="{ active: r === 1 }">
        我的订单
      </span>
    </div>

    <!-- 内容展示区 -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
/* 全局容器优化 */
.user-container {
  max-width: 1000px;
  margin: 30px auto;
  display: flex;
  height: 500px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* 侧边栏样式 */
.sidebar {
  width: 180px;
  height: 100%;
  background-color: #fafbfc;
  border-right: 1px solid #f2f3f5;
  padding: 24px 16px;
  box-sizing: border-box;
}

/* 菜单标题样式 */
.menu-title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 16px 0;
  line-height: 1.2;
}

/* 导航项基础样式 */
.sidebar span {
  display: block;
  cursor: pointer;
  font-size: 14px;
  color: #666666;
  padding: 10px 12px;
  margin-bottom: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

/* 导航项hover效果 */
.sidebar span:hover {
  background-color: #f0fdf4;
  color: #009463;
}

/* 高亮样式（保留你原有的类名逻辑，仅美化样式） */
.sidebar span.active {
  background-color: #d1fae5;
  color: #009463;
  font-weight: 500;
}

/* 内容区域样式 */
.content {
  flex: 1;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
