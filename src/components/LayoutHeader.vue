<script setup>
import { ref, watch, onMounted } from 'vue';
import { Search, ShoppingCart } from '@element-plus/icons-vue'
import { homecatehead } from '@/api/index'
import { LayoutStore } from '@/stores/layoutStore/LayoutLei';
import { useRoute } from 'vue-router';
import { ShopStore } from '@/stores/ShopCar';
import { useRouter } from 'vue-router';
import { getcar, deletecar } from '@/api/index';
import { LoginP } from '@/stores/Login';

const logins = LoginP()
onMounted(() => {
    if (logins.token !== '') {
        getcar().then((a) => {
            console.log('获取购物车信息');
            console.log(a);
            shopA.goodcar = a.data.result
        }).catch((e) => {
            console.log(e);
        })
    }
})
const shopA = ShopStore()
const router = useRouter()
homecatehead()
    .then((a) => {
        console.log('头部分类：');
        console.log(a);
        LayoutStore000.cate = a.data.result
    })
    .catch((e) => {
        console.log(e);
    })

const route = useRoute()
const input1 = ref(null)
const LayoutStore000 = LayoutStore()
const idf = ref(route.params.id || -1)
const clikaas = (a) => {
    idf.value = a
}
const ahahahah = () => {
    idf.value = -1
}
watch(
    () => {
        return route.params.id
    },
    (sdd) => {
        if (!sdd) {
            idf.value = -1
        }
        else {
            idf.value = sdd
        }
    }, {
    immediate: true
}
)

const enter = ref(-1)
const dddd = (a) => {
    enter.value = a
}
const deleteStore = (a) => {
    const g = []
    g.push(shopA.goodcar?.[a].skuId)
    deletecar(g).then((s) => {
        console.log('删除购物车某个订单');
        console.log(s);
    })
    shopA.goodcar.splice(a, 1)
}

const newshop = () => {
    router.push('/shop')
}
</script>

<template>
    <div class="header">
        <ul class="headul">
            <li class="li00" :class="{ jjoi: idf === -1 }" @click="ahahahah">
                <router-link to="/home">首页</router-link>
            </li>
            <li v-for="it in LayoutStore000.cate" :key="it.id" class="li00" :class="{ jjoi: it.id === idf }"
                @click="clikaas(it.id)">
                <router-link :to="`/cate/${it.id}`">
                    {{ it.name }}
                </router-link>
            </li>
        </ul>
        <div class="jkvhn">
            <el-input v-model="input1" style="width: 100px" placeholder="搜一搜" :prefix-icon="Search" />

            <el-col :span="8">
                <el-dropdown>
                    <el-icon size="25px" style="margin-left: 5px;outline: none;">
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
                                    @click="newshop">
                                    去结算
                                </el-button>
                            </div>

                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-col>
            <span
                style="color: white;user-select: none; background-color: red;position: absolute;display: block;top: 13px;right: 15px;border-radius: 20px;width: 15px;font-size: 11px; line-height: 15px;text-align: center; height: 15px;">
                {{ shopA.goodcar.length }}
            </span>
        </div>

    </div>
    <!-- <el-menu :default-active="1" class="el-menu-demo" mode="horizontal" router background-color="white"
        text-color="black" active-text-color="#ffd04b" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="3">居家</el-menu-item>
        <el-menu-item index="4">美食</el-menu-item>
    </el-menu> -->
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

    & div:nth-child(2) {
        flex: 1;

        & span:nth-child(2) {
            color: red;
            display: block;
        }
    }

    & div:nth-child(3) {
        width: 20px;
        text-align: center;

        & span {
            color: rgb(121, 121, 121);

            &:hover {
                color: black;
            }
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
    height: 23px;

    &.jjoi a {
        color: aqua;
    }
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
    width: 100%;
    height: 120px;
    /* line-height: 120px; */
    display: flex;
    align-items: center;
}

.headul {
    /* line-height: 120px; */
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    width: 60%;
    margin-left: auto;
    margin-right: 100px;
    justify-content: space-between;
    align-items: center;
}
</style>