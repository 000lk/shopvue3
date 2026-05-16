<script setup>
import { ShopStore } from '@/stores/ShopCar';
import { ref } from 'vue';
import { LoginP } from '@/stores/Login';
import { deletecar } from '@/api';

const login1 = LoginP()
const sc = (a) => {

    if (login1.token !== '') {
        const g = []
        g.push(shopA.goodcar?.[a].skuId)
        deletecar(g).then((s) => {
            console.log('删除购物车信息');
            console.log(s);
            ElMessage({
                message: '删除成功',
                type: 'success',
                plain: true,
            })
            shopA.goodcar.splice(a, 1)
        }).catch((e) => {
            console.log(e);
        })
    }

}
const allsc = () => {
    const kkl = shopA.goodcar.filter(l => l.selected === true)
    const g = []
    if (kkl.length > 0) {
        kkl.forEach((x) => {
            const ind = shopA.goodcar.findIndex(m => m.skuId === x.skuId)
            g.push(x.skuId)
            if (ind !== -1) {
                shopA.goodcar.splice(ind, 1)
            }
        })
        deletecar(g).then((s) => {
            console.log('删除多个购物车信息');
            console.log(s);
            ElMessage({
                message: '删除成功',
                type: 'success',
                plain: true,
            })
        }).catch((e) => {
            console.log(e);
        })
    }

}
const shopA = ShopStore()
const updateStore = (c, ind) => {
    shopA.goodcar[ind].selected = c
}
const allchecked = (c) => {
    shopA.goodcar.forEach(a => a.selected = c)
}
</script>

<template>
    <div class="ttop">
        <table>
            <thead>
                <tr>
                    <td><el-checkbox :modelValue="shopA.select" @change="(c) => allchecked(c)" label="全选"
                            size="large" />
                    </td>
                    <td>商品信息</td>
                    <td>单价</td>
                    <td>数量</td>
                    <td>小计</td>
                    <td>操作</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(it, ind) in shopA.goodcar" :key="ind">
                    <td>
                        <el-checkbox :modelValue="it.selected" @change="(c) => updateStore(c, ind)" label=""
                            size="large" />
                    </td>
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
                    <td>
                        <span @click="sc(ind)" class="kljbbhhjkse">删除</span>
                    </td>
                </tr>
                <tr>
                    <td :colspan="6" style="position: relative;">
                        <span>共{{ shopA.allcount }}件商品,已经选择{{ shopA.selectcount }}件,</span>
                        <span>商品合计:</span>
                        <span style="color: red;">￥{{ shopA.selectallprice }}</span>
                        <el-button @click="allsc"
                            style="position:absolute;top: 50%;transform: translateY(-50%);right: 150px;">
                            删除选中
                        </el-button>
                        <el-button type="primary"
                            style="position: absolute;top: 50%;transform: translateY(-50%);right: 20px;"
                            @click="$router.push('/pay')">
                            去支付
                        </el-button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<style scoped>
.kljbbhhjkse {
    cursor: pointer;
}

.ttop {
    width: 980px;
    margin: auto;

    & table {
        width: 100%;
        text-align: center;
        line-height: 90px;
        border-collapse: collapse;

        & tr {
            /* margin-bottom: 10px; */
            border-bottom: 1px solid #eee;
            height: 90px;
        }

    }
}
</style>