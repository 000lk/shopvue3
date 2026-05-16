<script setup>
import { ref } from 'vue';
import { Search, ShoppingCart } from '@element-plus/icons-vue'
// import { Search, ShoppingCart } from '@element-plus/icons-vue'
import { useScroll } from '@vueuse/core'
import { LayoutStore } from '@/stores/layoutStore/LayoutLei';
import { ShopStore } from '@/stores/ShopCar';
import { useRouter } from 'vue-router';

const router = useRouter()
const shopA = ShopStore()
const input1 = ref(null)
// const cate = ref([])
const { y } = useScroll(window)
const LayoutStore000 = LayoutStore()

const enter = ref(-1)
const dddd = (a) => {
    enter.value = a
}
const newshop = () => {
    router.push('/shop')
}
</script>

<template>
    <div class="header" :class="{ header1: y > 70 }">
        <ul class="headul">
            <li class="li00">
                <router-link to="/home">首页</router-link>
            </li>
            <li v-for="it in LayoutStore000.cate" :key="it.id" class="li00">
                <router-link :to="`/cate/${it.id}`">{{ it.name }}</router-link>
            </li>
        </ul>
        <div class="jkvhn">
            <el-input v-model="input1" style="width: 100px" placeholder="搜一搜" :prefix-icon="Search" />
            <!-- <el-col :span="8">
                <el-dropdown>
                    <el-icon size="25px" style="margin-left: 5px;outline: none;transform: translateY(110%);">
                        <ShoppingCart />
                    </el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="(it, ind) in shopA.goodcar" :key="ind"
                                v-if="shopA.goodcar.length > 0">
                                <div class="ghghgh" @mouseenter="dddd(ind)" @mouseleave="dddd(-1)">
                                    <img :src="it.picture" alt="">
                                    <div>
                                        <span>{{ it.name }}</span>
                                        <span>￥{{ it.price }}</span>
                                        <span>数量:{{ it.count }}</span>
                                    </div>
                                    <div>
                                        <span v-show="ind === enter" @click="deleteStore(ind)">X</span>
                                    </div>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item v-else>
                                <span>暂无数据</span>
                            </el-dropdown-item>

                            <div class="mmnnmmnn" v-if="shopA.goodcar.length > 0">
                                <span>共{{ shopA.allcount }}件商品</span>
                                <span>总价:</span>
                                <span>￥{{ shopA.allprice }}</span>
                                <el-button type="primary"
                                    style="position: absolute;right: 10px;top: 50%;transform: translateY(-50%);"
                                    @click='newshop'>
                                    去结算
                                </el-button>
                            </div>

                        </el-dropdown-menu>
                    </template>
</el-dropdown>
</el-col> -->
            <!-- <span
                style="color: white;user-select: none; background-color: red;position: absolute;display: block;top: 13px;right: 15px;border-radius: 20px;width: 15px;font-size: 11px; line-height: 15px;text-align: center; height: 15px;">
                {{ shopA.goodcar.length }}
            </span> -->
        </div>
    </div>
</template>

<style scoped>
.mmnnmmnn {
    height: 100%;
    width: 100%;
    position: relative;

    & span:nth-child(1) {
        display: block;
        font-size: 13px;
        color: #7e7e7e;
        margin-left: 16px;
    }

    & span:nth-child(2) {
        margin-left: 16px;
    }

    & span:nth-child(3) {
        color: red;
    }
}

.ghghgh {
    display: flex;
    width: 100%;
    align-items: center;

    & img {
        flex-shrink: 0;
        height: 60px;
    }

    & div {
        flex: 1;

        & span:nth-child(2) {
            color: red;
            display: block;
        }
    }
}

.li00 a:hover {
    color: aqua;
    text-decoration: underline;
}

.li00 a {
    color: black;
    text-decoration: none;
    outline: none;
    transition: all 0.1s;
}

.li00 {
    outline: none;
}

.jkvhn {
    width: 150px;
    height: 60px;
    display: flex;
    align-items: center;
    margin-right: 80px;
    position: relative;
}

.header {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    opacity: 0;
    transform: translateY(-100%);
    width: 100%;
    height: 80px;
    line-height: 80px;
    background-color: white;
    display: flex;
    align-items: center;

    &.header1 {
        opacity: 1;
        transform: none;
        transition: all 0.2s;
    }
}

.headul {
    line-height: 80px;
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    width: 60%;
    margin-left: auto;
    margin-right: 100px;
    justify-content: space-between;
}
</style>