<script setup>
import { LoginP } from '@/stores/Login';
import { cainixh } from '@/api/index'
import GoodItem from '@/components/GoodItem.vue';
import { ref } from 'vue';

const login = LoginP()
const list = ref([])
cainixh().then((a) => {
    console.log('猜你喜欢');
    console.log(a);
    list.value = a.data.result
})

</script>

<template>
    <div class="sshhshsh">
        <img :src="login.Lxx.avatar" alt="">
        <span>{{ login.Lxx.nickname }}</span>
    </div>
    <h3>猜你喜欢</h3>
    <div class="snnxx">
        <GoodItem :good="list"></GoodItem>
    </div>
</template>

<style scoped>
.snnxx {
    width: 649px;
    height: 265px;
    margin-top: 40px;
    padding: 0px 3px 0px 3px;
    display: flex;
}

.sshhshsh {
    width: 100%;
    height: 99px;
    display: flex;
    border-bottom: 1px solid #eee;
    align-items: center;

    & img {
        width: 80px;
        height: 80px;
        border-radius: 80px;
        margin-left: 20px;
        margin-right: 10px;
    }

    & span {
        font-size: 20px;
        /* font-size: large; */
    }
}
</style>