<script setup>
import { getorderlist } from '@/api/index'
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
// 引入 Element Plus 加载指令
import { ElLoading } from 'element-plus';

const route = useRoute()
const total = ref(0)
// 加载状态控制
const loading = ref(false)
const ind = ref(route.query?.ind ? Number(route.query.ind) : 0)
const params = ref({
  orderState: 0,
  page: 1,
  pageSize: 2
})
const orderlist = ref([])

onMounted(() => {
  getlist()
})

// 封装请求方法，增加加载状态
const getlist = () => {
  // 开启加载动画
  loading.value = true
  getorderlist(params.value)
    .then(a => {
      // 请求成功：赋值数据 + 缓存
      console.log(a);
      orderlist.value = a.data.result.items
      total.value = a.data.result.counts
    })
    .catch(e => {
      // 请求失败：打印错误
      console.log(e);
    })
    .finally(() => {
      // 无论成功/失败，关闭加载动画
      loading.value = false
    })
}

watch(
  () => ind.value,
  (s) => {
    params.value.orderState = s
    params.value.page = 1
    getlist()
  }
)

const change2 = (p) => {
  params.value.page = p
  getlist()
}
</script>

<template>
  <!-- 外层容器：绑定加载动画 -->
  <div class="order-container" v-loading="loading" element-loading-text="正在加载订单...">
    <!-- 订单筛选标签栏 -->
    <div class="order-tabs">
      <span @click="ind = 0" :class="{ active: ind === 0 }">全部订单</span>
      <span @click="ind = 1" :class="{ active: ind === 1 }">待付款</span>
      <span @click="ind = 2" :class="{ active: ind === 2 }">待发货</span>
      <span @click="ind = 3" :class="{ active: ind === 3 }">待收货</span>
      <span @click="ind = 4" :class="{ active: ind === 4 }">待评价</span>
      <span @click="ind = 5" :class="{ active: ind === 5 }">已完成</span>
      <span @click="ind = 6" :class="{ active: ind === 6 }">已取消</span>
    </div>

    <!-- 订单列表 -->
    <div class="order-list">
      <div class="order-card" v-for="it in orderlist" :key="it.id">
        <!-- 订单头部（只写一次！） -->
        <div style="background-color: #eee; padding:10px; margin-bottom:10px;">
          <span style="margin-right: 20px;">下单时间：{{ it.createTime }}</span>
          <span style="margin-right: 20px;">订单编号：{{ it.id }}</span>
          <span class="detail-btn">查看详情</span>
        </div>

        <!-- 订单商品列表（统一外层容器 + flex布局） -->
        <div v-for="it1 in it.skus" :key="it1.id"
          style="display: flex;align-items: center;margin-bottom: 20px;padding:0 10px;">
          <img :src="it1.image" alt="" style="width: 60px;height: 60px;margin-right: 10px;">
          <span style="margin-right: 10px;">{{ it1.name }}</span>
          <span style="margin-right: 10px;">￥{{ it1.realPay }}</span>
          <span style="margin-right: 10px;">数量{{ it1.quantity }}</span>
          <span>总:￥{{ it1.realPay * it1.quantity }}</span>
        </div>
      </div>
    </div>

    <!-- 分页组件 -->
    <div class="pagination-box">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="change2"
        :page-size="params.pageSize" :current-page="params.page" />
    </div>
  </div>
</template>

<style scoped>
/* 订单页面主容器 */
.order-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* 筛选标签栏 */
.order-tabs {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fafbfc;
  border-radius: 8px;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.order-tabs span {
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.2s ease;
}

/* 选中状态样式（主题绿色） */
.order-tabs span.active {
  background-color: #d1fae5;
  color: #009463;
  font-weight: 500;
}

.order-tabs span:hover:not(.active) {
  background-color: #f5f5f5;
  color: #333;
}

/* 订单列表容器 */
.order-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

/* 订单卡片样式 */
.order-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #f2f3f5;
  /* overflow: hidden; */
  transition: box-shadow 0.3s ease;
  max-height: 600px;
}

.order-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

/* 订单头部 */
.order-header {
  padding: 12px 20px;
  background-color: #fafbfc;
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 14px;
  color: #666;
}

.detail-btn {
  color: #009463;
  cursor: pointer;
  margin-left: auto;
}

/* 商品项布局 */
.order-goods {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #f8f9fa;
}

.order-goods:last-child {
  border-bottom: none;
}

/* 商品图片 */
.goods-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 12px;
}

/* 商品信息文字样式 */
.goods-info {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.goods-price,
.goods-num,
.goods-total {
  min-width: 80px;
  text-align: right;
  font-size: 14px;
  color: #666;
}

.goods-total {
  color: #009463;
  font-weight: 500;
}

/* 分页容器 */
.pagination-box {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  flex-shrink: 0;
}
</style>
