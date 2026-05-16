<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { LayoutStore } from '@/stores/layoutStore/LayoutLei';
import { homeBanner1 } from '@/api';
import { navqqq } from './composables/userbanner';

const route = useRoute()
const LayoutStore000 = LayoutStore()

const { r, rrr } = navqqq()
homeBanner1().then((a) => {
    console.log('其他轮播图');
    console.log(a);
    LayoutStore000.bannerOrder = a.data.result
}).catch((e) => {
    console.log(e);
})

watch(() => route.params.id, (n) => {
    rrr(n)
})
</script>

<template>
    <div class="nav">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ r.name }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="bannera">
        <el-carousel height="500px" :interval="5000" :autoplay=true>
            <el-carousel-item v-for="item in LayoutStore000.bannerOrder" :key="item.id">
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="fenlei">
        <h2 style="position: absolute;left: 50%;transform: translateX(-50%);">全部分类</h2>
        <ul>
            <li v-for="it in r.children">
                <router-link :to="`/cate/sub/${it.id}`">
                    <img :src="it.picture" alt="">
                    <span style="font-size: 13px;color: black;">{{ it.name }}</span>
                </router-link>

            </li>
        </ul>
    </div>

</template>

<style scoped>
.fenlei {
    width: 950px;
    height: 300px;
    margin: auto;
    position: relative;
    text-align: center;

    & ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 200px;

        & li {
            width: 100px;
            height: 130px;
            text-align: center;
            transition: all 0.2px;

            &:hover {
                background-color: #eee;
            }

            & img {
                width: 100px;
                height: 100px;
            }

            & a {
                text-decoration: none;
            }
        }
    }
}

.nav {
    width: 950px;
    margin: auto;
    margin-bottom: 10px;
}

.bannera {
    width: 950px;
    height: 480px;
    margin: auto;
    margin-bottom: 45px;

    & img {
        width: 100%;
        height: 100%;
    }
}
</style>