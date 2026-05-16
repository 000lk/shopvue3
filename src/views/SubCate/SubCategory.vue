<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { router3, subcategory } from '@/api';
import { ArrowRight } from '@element-plus/icons-vue';
import GoodItem from '@/components/GoodItem.vue';

const route = useRoute()
router3(route.params.id).then((a) => {
    console.log('二级分类具体信息');
    console.log(a);
    r.value = a.data.result
}).catch((e) => {
    console.log(e);
})


const data1 = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
})
const gooditem = (g) => {
    subcategory(g).then((a) => {
        console.log('二级分类下的商品信息');
        console.log(a);
        good.value = a.data.result.items
    }).catch((e) => {
        console.log(e);
    })
}
gooditem(data1.value)

const r = ref({})
const good = ref([])
watch(
    () => data1.value.sortField,
    (newsort) => {
        data1.value.sortField = newsort
        console.log(data1);
        gooditem(data1)
    },
    { deep: true }
)
const dl = ref(-1)

const disable = ref(false)
const loading = ref(false)
const load = () => {
    if (loading.value || disable.value) return
    data1.value.page++
    loading.value = true
    subcategory(data1.value).then((a) => {

        if (a.data.result.items.length === 0) {
            disable.value = true
            data1.value.page--
        }
        else {
            good.value = [...good.value, ...a.data.result.items]
        }
    }).finally(() => {
        loading.value = false
    })
}
</script>

<template>
    <div class="nav">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/cate/${r.parentId}` }">{{ r.parentName }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ r.name }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="goodslist">
        <el-card style="max-width: 980px">
            <template #header>
                <div class="card-header">
                    <span @click="data1.sortField = 'publishTime'; dl = -1;" :class="{ dl: dl === -1 }">最新商品</span>
                    <span @click="data1.sortField = 'orderNum'; dl = 10;" :class="{ dl: dl === 10 }">最高人气</span>
                    <span @click="data1.sortField = 'evaluateNum'; dl = 20;" :class="{ dl: dl === 20 }">评论最多</span>
                </div>
            </template>
            <div class="neiron" v-infinite-scroll="load" infinite-scroll-distance="100"
                infinite-scroll-throttle-delay="1000" :infinite-scroll-disabled="disable">
                <GoodItem :good="good"></GoodItem>
            </div>
        </el-card>

    </div>
</template>

<style scoped>
.neiron {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.card-header {
    & span {
        margin-right: 25px;
        cursor: pointer;
        color: rgb(153, 153, 153);
        transition: color 0.2s;

        &:hover {
            color: black;
        }

        &.dl {
            color: black;
        }
    }
}

.goodslist {
    width: 980px;
    margin: auto;
}

.nav {
    width: 980px;
    margin: auto;
    margin-bottom: 15px;
}
</style>