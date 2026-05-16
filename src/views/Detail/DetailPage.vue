<script setup>
import { goodDetail, hotgoods } from '@/api';
import { useRoute } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, onMounted, watch } from 'vue';
import { User, ChatLineSquare, Star, Monitor } from '@element-plus/icons-vue';
import GoodItem from '@/components/GoodItem.vue';
import { useMouseInElement } from '@vueuse/core'
import XtxSku from '@/components/XtxSku/index.vue'
import { ShopStore } from '@/stores/ShopCar';
import { LoginP } from '@/stores/Login';
// import Sku from '@/components/Sku.vue';
const shopS = ShopStore()
const route = useRoute()
const login = LoginP()
const detail1 = (s) => {
  goodDetail(s).then((a) => {
    console.log('商品详情');
    console.log(a);
    goods.value = a.data.result
    ImgA.value = a.data.result.mainPictures
    Img1.value = a.data.result.mainPictures[0]
  }).catch((e) => {
    console.log(e);

  })
}
const hotlist = ref([])
const hot = (a, b) => {
  hotgoods(a, b).then((a) => {
    console.log('不重要');
    console.log(a);
    hotlist.value = [...hotlist.value, ...a.data.result]
  }).catch((e) => {
    console.log(e);

  })
}
const goods = ref({})

const ImgA = ref([])
const Img1 = ref('')
const clickA = (ind) => {
  Img1.value = ImgA.value[ind]
}
const AAA = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(AAA)
const le = ref(0)
const to = ref(0)

onMounted(() => {
  detail1(route.params.id)
  hot(route.params.id, 1)
  hot(route.params.id, 2)
})

const loading = ref(true)
watch(() => goods.value.salesCount,
  (g) => {
    loading.value = false
  }
)

watch(
  [elementX, elementY],
  ([na, nb]) => {
    if (!isOutside.value) {
      if (na > 75 && na < 295) {
        le.value = na - 75
      }
      if (nb > 75 && nb < 295) {
        to.value = nb - 75
      }
      if (na < 75) {
        le.value = 0
      }
      if (na > 295) {
        le.value = 220
      }
      if (nb < 75) {
        to.value = 0
      }
      if (nb > 295) {
        to.value = 220
      }
    }
  }
)
const gxxvgzgzbzvv = ref(false)
// const changeCheck = (a, b) => {
//     if (goods.value.specs[a].values[b].ischecked) {
//         goods.value.specs[a].values[b].ischecked = false
//     }
//     else {
//         goods.value.specs[a].values.forEach(i => {
//             i.ischecked = false
//         })
//         goods.value.specs[a].values[b].ischecked = true
//     }
// }
const subSku = ref({})
const changeAs = (a) => {
  console.log('sku');
  console.log(a);
  subSku.value = a
  if (Object.keys(a).length !== 0) {
    ischeck.value = true
  }
  else {
    ischeck.value = false
  }
}
const ischeck = ref(false)
const submit = () => {
  if (!ischeck.value) {
    ElMessage({
      message: '请选择规格',
      type: 'warning',
      plain: true,
    })
  }
  else {
    shopS.add1({
      id: goods.value.id,
      name: goods.value.name,
      picture: goods.value.mainPictures[0],
      price: goods.value.price,
      count: num.value,
      skuId: subSku.value.skuId,
      attrsText: subSku.value.specsText,
      selected: true
    })

  }
}
const num = ref(1)
const handleChange = (n) => {

}
</script>

<template>

  <div class="nav">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/cate/${goods.categories?.[1].id}` }">
        {{ goods.categories?.[1].name }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/cate/sub/${goods.categories?.[0].id}` }">
        {{ goods.categories?.[0].name }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ goods.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    {{ elementX }}|{{ elementY }} |{{ isOutside }}
  </div>
  <div class="xx" v-loading="loading">
    <div class="god">
      <div class="god3">
        <div class="godA" @mouseenter="gxxvgzgzbzvv = true" @mouseleave="gxxvgzgzbzvv = false" ref="AAA"
          :style="{ backgroundImage: `url(${Img1})` }">
          <div class="BBB" :style="{ top: `${to}px`, left: `${le}px` }"></div>
          <div class="CCC" v-show="gxxvgzgzbzvv"
            :style="{ backgroundImage: `url(${Img1})`, backgroundPositionX: `${le * (-2.4)}px`, backgroundPositionY: `${to * (-2.4)}px` }">
          </div>
        </div>
        <div class="godB">
          <img :src="it" v-for="(it, ind) in ImgA" @click="clickA(ind)" :class="{ 'Co': it === Img1 }" :key="it" alt="">
        </div>
      </div>
      <div class="god2">
        <h2>{{ goods.name }}</h2>
        <span style="font-size: 13px;color: #878787;display: block;margin-bottom: 10px;">{{ goods.desc }}</span>
        <span style="margin-right: 5px;color: red;">￥{{ goods.price }}</span>
        <span>￥{{ goods.oldPrice }}</span>
        <!-- <Sku :goodGS="goods.specs" @changeCheck="changeCheck"></Sku> -->
        <XtxSku :goods="goods" @change="changeAs"></XtxSku>
        <el-input-number v-model="num" :min="0" @change="handleChange" />
        <el-button style="display: block;margin-top: 10px;" @click="submit">加入购物车</el-button>
      </div>
    </div>

    <div class="aaaa">
      <ul>
        <li>
          <span>销量人气</span>
          <span>{{ goods.salesCount }}</span>
          <span>
            <el-icon color="green">
              <User />
            </el-icon>
            销量人气
          </span>
        </li>
        <li>
          <span>商品评价</span>
          <span>{{ goods.commentCount }}</span>
          <span>
            <el-icon color="green">
              <ChatLineSquare />
            </el-icon>
            查看评价
          </span>
        </li>
        <li>
          <span>收藏人气</span>
          <span>{{ goods.collectCount }}</span>
          <span>
            <el-icon color="green">
              <Star />
            </el-icon>
            收藏商品
          </span>
        </li>
        <li>
          <span>品牌信息</span>
          <span v-if="goods.brand?.name">{{ goods.brand.name }}</span>
          <span v-else>暂无信息</span>
          <span>
            <el-icon color="green">
              <Monitor />
            </el-icon>
            品牌主页
          </span>
        </li>
      </ul>
    </div>
    <div class="bbbb"></div>

    <div class="cccc">
      <ul>
        <li v-for="it in goods?.details?.properties">
          <span>{{ it.name }}:</span>
          <span>{{ it.value }}</span>
        </li>
      </ul>
    </div>

    <div class="dddd">
      <div v-for="it1 in goods?.details?.pictures.slice(0, 7)" :key="it1">
        <img :src="it1" alt="">
      </div>

    </div>
    <div class="eeee">
      <div class="e1">
        <span>24小时热榜</span>
      </div>
      <GoodItem :good="hotlist.slice(0, 3)"></GoodItem>
      <div class="e1">
        <span>周热榜</span>
      </div>
      <GoodItem :good="hotlist.slice(3, 6)"></GoodItem>
    </div>
  </div>
</template>

<style scoped>
.CCC {
  position: absolute;
  left: 380px;
  width: 370px;
  height: 370px;
  background-size: 915px 915px;
  z-index: 10;
  background-repeat: no-repeat;

}

.BBB {
  width: 150px;
  height: 150px;
  background-color: black;
  opacity: 0.5;
  position: absolute;
}

.god3 {
  width: 490px;
  height: 100%;
  display: flex;

  & .godA {
    width: 370px;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    position: relative;
  }

  & .godB {
    flex: 1;
    height: 368px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #eee;
    border-left: none;

    & img {
      width: 65px;
      height: 65px;

      &.Co {
        outline: 1px solid green;
      }
    }
  }
}

.god2 {
  width: 420px;
  margin-left: auto;
  height: 100%;
  padding-left: 70px;

  & span:nth-child(4) {
    color: #afafaf;
    text-decoration: line-through;
    font-size: 11px;
  }
}

.god {
  display: flex;
  width: 980px;
  height: 370px;
  margin-bottom: 30px;
}

.eeee {
  width: 285px;
  padding-left: 15px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  & .e1 {
    width: 200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: coral;
    margin-bottom: 3px;

    & span {
      font-size: 17px;
      color: white;
    }
  }
}

.dddd {
  width: 680px;
  margin-top: 30px;
  text-align: center;

  & img {
    margin-bottom: 0;
    margin-top: 0;
    width: 100%;
  }
}

.cccc {
  width: 700px;
  margin-top: 30px;
  display: flex;

  & ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    flex: 1;
    overflow: hidden;

    & li {
      position: relative;
      margin-bottom: 5px;

      width: 100%;

      & span:nth-child(2) {
        position: absolute;
        left: 100px;
        right: 0;
        overflow: hidden;
        white-space: nowrap;
        /* 强制不换行 */
        text-overflow: ellipsis;
        /* 隐藏超出部分 */
        /* 显示省略号 */
      }
    }

    & li span:nth-child(1) {
      color: coral;
    }
  }
}

.bbbb {
  width: 490px;
  border-bottom: 1px solid #eee;
}

.nav {
  width: 980px;
  margin: auto;
  margin-bottom: 30px;
}

.xx {
  width: 980px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;

  & .aaaa {
    width: 490px;
    border-bottom: 1px solid #eee;

    & ul {
      display: flex;
      padding: 0;
      margin: 0;
      list-style-type: none;

      & li {
        flex: 1;
        text-align: center;

        & span {
          display: block;
        }

        & span:nth-child(2) {
          color: red;
        }
      }
    }
  }
}
</style>
