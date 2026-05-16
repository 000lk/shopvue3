<script setup>
import { defineProps } from 'vue';
defineProps({
  good: {
    type: Array
  }
})
</script>

<template>
  <div v-for="it1 in good" class="d2">
    <img v-img-lazy="it1.picture" alt="" class="im6">
    <span class="ss1">{{ it1.name }}</span>
    <span class="ss2">￥{{ it1.price }}</span>
  </div>
</template>

<style scoped>
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

.d2:hover {
  outline: 1px solid #eaeaea;
  /* transform: translateY(-5px);
    box-shadow: 5px 5px 5px #eee; */
}
</style>
