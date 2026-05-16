<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { getorder, submitorder, getaddress, getcar, getorderresult } from '@/api';
import { useRoute } from 'vue-router';
import { ShopStore } from '@/stores/ShopCar';

const route = useRoute()
const ShopS = ShopStore()
const id1 = ref('')

const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net/";
const backURL = "http://localhost:5173/backjj"
const redirectUrl = encodeURIComponent(backURL);
const payUrl = ref('');

// ========== 15分钟假倒计时 仅展示无实际业务作用 ==========
const totalSecond = 900 // 15分钟
const surplusTime = ref(totalSecond)
let timer = null
// 格式化时分秒
const formatTime = (time) => {
  let m = Math.floor(time / 60)
  let s = time % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}
const countDownText = computed(() => formatTime(surplusTime.value))

// 启动倒计时
const startCountDown = () => {
  timer = setInterval(() => {
    if (surplusTime.value > 0) {
      surplusTime.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)
}
onMounted(() => {
  startCountDown()
}),
  // 原有订单逻辑 完全保留未改动
  getorder().then((a) => {
    console.log('生成订单');
    console.log(a);

    const g = []
    a.data.result.goods.forEach((s) => {
      const { skuId, count } = s
      g.push({ skuId, count })
    })
    submitorder(g, route.query.id).then((f) => {
      console.log('提交订单信息');
      console.log(f);
      id1.value = f?.data?.result?.id
      payUrl.value = `${baseURL}pay/aliPay?orderId=${id1?.value}&redirect=${redirectUrl}`
      // 订单生成成功后开启倒计时

      getcar().then((kkk) => {
        console.log('购物车信息');
        console.log(kkk);
        ShopS.goodcar = kkk.data.result
      })

      getorderresult(id1?.value).then((zzzx) => {
        console.log('获取支付（渲染）');
        console.log(zzzx);
      }).catch((e) => {
        console.log(e);
      })
    }).catch((e) => {
      console.log(e);
    })
  }).catch((e) => {
    console.log(e);
  })

getaddress().then((a) => {
  console.log('获取地址');
  console.log(a);
})

// 销毁清除定时器
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="pay-container">
    <!-- 支付卡片 -->
    <div class="pay-card">
      <h2 class="pay-title">订单支付中心</h2>
      <div class="order-info">
        <p><span>订单编号：</span>{{ id1 || '订单生成中...' }}</p>
      </div>

      <!-- 倒计时区域 -->
      <div class="count-down-box">
        <p class="tip-text">请在规定时间内完成支付，超时订单将自动取消</p>
        <div class="time-show">
          剩余支付时间：<span class="time-num">{{ countDownText }}</span>
        </div>
      </div>

      <!-- 支付方式选择 -->
      <div class="pay-way">
        <h3>选择支付方式</h3>
        <div class="way-item active">
          <i class="alipay-icon"></i>
          <span>支付宝支付</span>
        </div>
      </div>

      <!-- 支付按钮区域 -->
      <div class="pay-btn-box">
        <a href="/backjj" class="btn cancel-btn">取消支付</a>
        <a href="/backjj" class="btn pay-btn" v-if="id1">立即跳转支付宝付款</a>
        <div class="loading-text" v-else>正在生成订单，请稍候...</div>
      </div>

      <p class="remind">温馨提示：此为模拟支付页面，倒计时仅视觉展示，无真实过期失效效果</p>
    </div>
  </div>
</template>

<style scoped>
.pay-container {
  width: 100%;
  /* background-color: #f5f7fa; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.pay-card {
  width: 520px;
  background: #fff;
  border-radius: 12px;
  padding: 35px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

.pay-title {
  text-align: center;
  color: #333;
  font-size: 24px;
  margin: 0 0 25px;
}

.order-info p {
  font-size: 15px;
  color: #666;
  margin: 8px 0;
}

.order-info span {
  color: #222;
  font-weight: 500;
}

/* 倒计时样式 */
.count-down-box {
  margin: 30px 0;
  padding: 20px;
  background: #fff5f5;
  border-radius: 8px;
  text-align: center;
}

.tip-text {
  color: #f56c6c;
  margin: 0 0 12px;
  font-size: 14px;
}

.time-show {
  font-size: 18px;
  color: #333;
}

.time-num {
  font-size: 26px;
  color: #e53935;
  font-weight: bold;
  margin-left: 8px;
}

/* 支付方式 */
.pay-way h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
}

.way-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  cursor: pointer;
}

.way-item.active {
  border-color: #1677ff;
  background: #f0f7ff;
}

.way-item span {
  margin-left: 12px;
  font-size: 15px;
}

/* 按钮区域 */
.pay-btn-box {
  display: flex;
  gap: 15px;
  margin-top: 35px;
}

.btn {
  flex: 1;
  height: 46px;
  line-height: 46px;
  text-align: center;
  border-radius: 8px;
  text-decoration: none;
  font-size: 15px;
}

.cancel-btn {
  border: 1px solid #ccc;
  color: #666;
}

.pay-btn {
  background: #1677ff;
  color: #fff;
}

.loading-text {
  width: 100%;
  text-align: center;
  line-height: 46px;
  color: #999;
}

.remind {
  text-align: center;
  margin-top: 25px;
  font-size: 13px;
  color: #999;
}
</style>
