<script setup>
import { homeProduct } from '@/api';
import { LayoutStore } from '@/stores/layoutStore/LayoutLei';
import PanelPage from './PanelPage.vue';
import GoodItem from './GoodItem.vue';
const LayoutStore000 = LayoutStore()
homeProduct().then((a) => {
    console.log("首页很多商品");
    console.log(a);
    LayoutStore000.Product = a.data.result
}).catch((e) => {
    console.log(e);
})
</script>

<template>
    <PanelPage :title="it.name + '馆'" v-for="it in LayoutStore000.Product" :key="it.id">
        <div class="cc">
            <img src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/home_goods_cover.jpg" class="img1"
                alt="">
            <div class="d1">
                <GoodItem :good="it.goods"></GoodItem>
            </div>
        </div>
    </PanelPage>
</template>

<style scoped>
.d2:hover {
    outline: 1px solid #eaeaea;
    /* transform: translateY(-5px);
    box-shadow: 5px 5px 5px #eee; */
}

.ss2 {
    text-align: center;
    color: red;
}

.ss1 {
    margin-left: 10%;
    margin-right: 10%;
    white-space: nowrap;
    /* 强制不换行 */
    overflow: hidden;
    /* 超出部分隐藏 */
    text-overflow: ellipsis;
    flex-shrink: 1;
    font-size: 13px;
}

.im6 {
    display: block;
    width: 80%;
    margin: auto;
    margin-top: 5px;
}

.d2 {
    outline: 1px solid #fff;
    width: 166px;
    height: 192px;
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    transition: all 0.2s;
}

.d1 {
    width: 687.62px;
    height: 390px;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: space-between;
}

.cc {
    width: 100%;
    height: 400px;
    /* background-color: antiquewhite; */
    display: flex;
}

.img1 {
    /* width: 150px; */
    height: 100%;
}
</style>