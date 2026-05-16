<script setup>
import { LoginP } from '@/stores/Login';
import { Avatar } from '@element-plus/icons-vue';
import { ShopStore } from '@/stores/ShopCar';
import { deletecar } from '@/api';

const shopi = ShopStore()
const LoginStore = LoginP()
const tuichu = () => {

  const g = []
  shopi.goodcar.forEach((m) => {
    g.push(m.skuId)
  })
  deletecar(g).then((z) => {
    LoginStore.token = ''
    LoginStore.Lxx = ''
    console.log('删除了所有购物车');
    shopi.goodcar = []
  }).catch((iop) => {
    console.log(iop);
  })
}
</script>

<template>
  <div class="nav">
    <div class="nav1" v-if="LoginStore.token === ''">
      <span @click="$router.push('/login')">请先登录</span>
      <strong>|</strong>
      <span>帮助中心</span>
      <strong>|</strong>
      <span>关于我们</span>
    </div>
    <div class="nav1" v-else>
      <el-icon style="color: white;">
        <Avatar />
      </el-icon>
      <span style="transform: translateY(-4px);">{{ LoginStore.Lxx?.nickname }}</span>
      <strong>|</strong>
      <span @click="tuichu">退出登录</span>
      <strong>|</strong>
      <span @click="$router.push('/order')">我的订单</span>
      <strong>|</strong>
      <span @click="$router.push('/member')">会员中心</span>
    </div>
  </div>
</template>

<style scoped>
.nav {
  width: 100%;
  height: 50px;
  background-color: rgb(71, 71, 71);
  line-height: 50px;
}

.nav1 {
  width: 500px;
  height: 100%;
  margin-left: auto;
  margin-right: 40px;
  text-align: right;

  & strong {
    color: white;
    margin-right: 10px;
  }
}

.nav span {
  /* display: inline-block; */
  max-width: 64px;
  color: white;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    color: aquamarine;
  }
}
</style>
