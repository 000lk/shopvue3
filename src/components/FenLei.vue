<script setup>
import { LayoutStore } from '@/stores/layoutStore/LayoutLei';
import { ref } from 'vue';
import { homeBanner } from '@/api';
const LayoutStore000 = LayoutStore();
homeBanner().then((a) => {
    console.log('走马灯：');
    console.log(a);
    LayoutStore000.banner = a.data.result
}).catch((e) => {
    console.log(e);

})


const mouseenter1 = (a) => {
    clearTimeout(timeout.value);
    it10.value = a.goods
    show.value = true
}
const mouseleave1 = () => {
    clearTimeout(timeout.value)
    timeout.value = setTimeout(() => {
        show.value = false
    }, 300)
}
const it10 = ref([])
const show = ref(false)
const timeout = ref(null)

const enter1 = () => {
    clearTimeout(timeout.value)
}
const leave1 = () => {
    clearTimeout(timeout.value)
    timeout.value = setTimeout(() => {
        show.value = false
    }, 300)
}
</script>

<template>
    <div class="FL">
        <div class="FL1">
            <ul>
                <li v-for="it in LayoutStore000.cate" :key="it.id" @mouseenter="mouseenter1(it)"
                    @mouseleave="mouseleave1" class="oiioo">
                    <router-link to="/">{{ it.name }}</router-link>
                    <router-link to="/" v-for="it1 in it.children.slice(0, 2)">{{ it1.name }}</router-link>
                </li>
            </ul>
        </div>
        <div class="FL2" v-if="show" @mouseenter="enter1" @mouseleave="leave1">
            <ul class="ul9">
                <li v-for="it1 in it10" :key="it1.id">
                    <router-link to="/">
                        <div style="display: flex;justify-content: space-between;">
                            <img :src="it1.picture" alt="">
                            <div class="FL3">
                                <span>{{ it1.name }}</span>
                                <span style="color: red;">￥{{ it1.price }}</span>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="FL4" v-else>
            <el-carousel trigger="click" height="400px">
                <el-carousel-item v-for="item in LayoutStore000.banner" :key="item.id">
                    <img :src="item.imgUrl" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<style scoped>
.FL3 {
    width: 135px;
    height: 80px;
    overflow: hidden;
    border: 1px solid #eee;
    border-left: none;
}

.FL3 span:first-child {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    /* 关键：必须添加 */
    text-overflow: ellipsis;
    /* 关键：省略号 */
    width: 100%;
}

.ul9 img {
    width: 80px;
    height: 80px;
}

.ul9 {
    margin: 0;
    padding: 0;
    list-style-type: none;
    text-align: left;
    /* 覆盖继承的 center */
    line-height: normal;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.ul9 li {
    flex: none !important;
    line-height: normal;
}

.ul9 li a {
    color: black;
    text-decoration: none;
}

.FL2 {
    width: 680px;
    height: 378px;
    /* background-color: antiquewhite; */
    border: 1px solid #eee;
    border-left: none;
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px 10px 10px 10px;
}

.FL4 {
    width: 700px;
    height: 400px;
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
}

.FL4 img {
    width: 100%;
    height: 100%;
}

.FL {
    width: 950px;
    height: 400px;
    margin: auto;
    display: flex;
    position: relative;
}

.FL1 {
    height: 100%;
    width: 250px;
    background-color: rgb(117, 117, 117);
    color: white;
    /* opacity: 0.6; */
    /* display: flex; */
}

.FL1>ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.FL1>ul>li>a {
    color: white;
    margin-right: 5px;
    text-decoration: none;
    /* text-align: center; */
}

.FL1>ul>li {
    flex: 1;
    line-height: 44.45px;
    text-align: center;
    transition: all 0.2s;
}

.oiioo:hover {
    background-color: rgb(0, 122, 144);
}
</style>