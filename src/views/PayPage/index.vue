<script setup>
import { getorder, getcar } from '@/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const order = ref({})
const defaultManall = ref({})
const defaultMan = ref({})
getorder().then((a) => {
  console.log('生成订单');
  console.log(a);
  order.value = a.data.result
  defaultManall.value = a.data.result
  defaultManall.value.userAddresses.forEach(element => {
    element.iscc = false
    if (element.isDefault === 0) {
      defaultMan.value = element
      element.iscc = true
    }
  });
  gr.value = defaultManall.value.userAddresses.findIndex((b) => {
    return b.iscc === true
  })
  gr1.value = gr.value
}).catch((e) => {
  console.log(e);
})

getcar().then((a) => {
  console.log('获取购物车信息');
  console.log(a);

}).catch((e) => {
  console.log(e);
})

const dialogFormVisible = ref(false)
const updateaddr = () => {
  dialogFormVisible.value = true
}
const addaddr = () => {

}
const gr = ref(-1)
const gr1 = ref(-1)
const hhhhhhh = (a) => {
  gr1.value = a
}
const handleBeforeClose = (done) => {
  gr1.value = gr.value
  done()
}
const cl90 = () => {
  defaultManall.value.userAddresses.forEach((r) => {
    r.iscc = false
  })
  defaultManall.value.userAddresses[gr1.value].iscc = true
  gr.value = gr1.value
  defaultMan.value = defaultManall.value.userAddresses[gr1.value]
  console.log(defaultMan.value);

  dialogFormVisible.value = false
}

const pay = () => {
  if (defaultManall.value.goods.length > 0) {
    router.push(`/subpay?id=${defaultMan.value.id}`)
  }
}
</script>

<template>
  <div class="ttttop">
    <div class="zui">
      <div>
        <span>收货地址</span>
      </div>
      <div>
        <span>收 货 人：{{ defaultMan.receiver }}</span>
        <span>联系方式：{{ defaultMan.contact }}</span>
        <span>收货地址：{{ defaultMan.fullLocation }}-{{ defaultMan.address }}</span>
      </div>
      <el-button @click="updateaddr" style="position: absolute;top: 50%;right: 130px;">修改地址</el-button>
      <el-button @click="addaddr" style="position: absolute;top: 50%;right: 20px;">添加地址</el-button>
    </div>
    <div class="zho">
      <div>
        <span>商品信息</span>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <td>商品信息</td>
              <td>单价</td>
              <td>数量</td>
              <td>小计</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(it, ind) in defaultManall.goods" :key="ind">
              <td style="display: flex;align-items: center;">
                <img :src="it.picture" style="width: 80px;" alt="">
                <span>{{ it.name }}</span>
              </td>
              <td>
                <span style="color: red;">￥{{ it.price }}</span>
              </td>
              <td>
                <span>{{ it.count }}</span>
              </td>
              <td>
                <span style="color: red;">￥{{ it.price * it.count }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div style="width: 100%;display: flex;margin-top: 20px;">
          <span style="margin-left: auto;display: block;">总共:</span>
          <span style="color: red;margin-right: 35px;">￥{{ defaultManall?.summary?.totalPrice }}</span>
        </div>
        <div style="width: 100%;margin-top: 30px;">
          <el-button style="display: block;margin-left: auto;margin-right: 37px;" @click="pay">支付!</el-button>
        </div>
      </div>
    </div>

  </div>

  <el-dialog v-model="dialogFormVisible" title="修改地址" width="500" :before-close="handleBeforeClose">
    <div class="bbbbvvvvvv">
      <div class="ajjsz" v-for="(its, ind) in defaultManall.userAddresses" :key="ind" @click="hhhhhhh(ind)"
        :class="{ greenb: ind === gr1 }">
        <span>收 货 人：{{ its.receiver }}</span>
        <span>联系电话：{{ its.contact }}</span>
        <span>收货地址：{{ its.fullLocation }}-{{ its.address }}</span>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cl90">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.bbbbvvvvvv {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ajjsz {
  width: 100%;

  & span {
    display: block;
  }

  &:hover {
    background-color: rgb(200, 255, 200);
  }

  &.greenb {
    outline: 1px solid green;
    background-color: rgb(200, 255, 200);
  }
}

.zho {
  width: 980px;

  & div:nth-child(1) {
    width: 100%;
    margin: 50px 0px 20px 0px;
    background-color: #eee;
  }

  & table {
    width: 100%;
    border-collapse: collapse;

    & tr {
      border-bottom: 1px solid #eee;
    }

  }
}

.ttttop {
  width: 980px;
  margin: auto;
}

.zui {
  width: 100%;
  position: relative;

  & div:nth-child(1) {
    width: 960px;
    padding: 0px 10px 0px 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #eee;
  }

  & div:nth-child(2) {
    position: relative;
    width: 960px;
    padding: 0px 10px 0px 10px;

    & span {
      display: block;
    }
  }
}
</style>
