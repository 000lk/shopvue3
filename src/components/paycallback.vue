<script setup>
import { CircleClose } from '@element-plus/icons-vue'

</script>

<template>
    <div class="zbzbzbbz">
        <div class="vvvvv">
            <el-icon color="red" style="font-size: 80px;">
                <CircleClose />
            </el-icon>
            <h2>支付失败</h2>
            <span>支付方式:支付宝</span>
            <el-button style="margin-top: 10px;" @click="$router.push('/')">回首页</el-button>
        </div>

    </div>
</template>

<style scoped>
.zbzbzbbz {
    width: 980px;
    margin: auto;
}

.vvvvv {
    width: 300px;
    margin: auto;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & h2:nth-child(2) {
        margin-top: 20px;
        margin-bottom: 5px;
    }
}
</style>