<script setup>
import { defineProps, ref, defineEmits } from 'vue';

const props = defineProps({
  goodGS: {
    type: Array
  }
})
const emit = defineEmits(['changeCheck'])
const ccccc = (a, b) => {
  emit('changeCheck', a, b)
}
</script>

<template>
  <div class="Sc">
    <ul>
      <li v-for="(it, ind) in goodGS" :key="it.id">
        <div>
          <span>{{ it.name }}:</span>
        </div>

        <div v-if="it.values?.[0].picture">
          <img :src="it1.picture" v-for="(it1, ind1) in it.values" :class="{ bor: it1.ischecked }"
            @click="ccccc(ind, ind1)" alt="" :title="it1.name" :key="ind1">
        </div>
        <div v-else>
          <span v-for="(it1, ind1) in it.values" @click="ccccc(ind, ind1)" :class="{ bor: it1.ischecked }"
            :key="ind1">{{ it1.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.Sc {
  width: 100%;
  margin-top: 15px;

  & ul {
    padding: 0;
    margin: 0;
    list-style-type: none;

    & li {
      width: 100%;
      height: 50px;
      display: flex;
      line-height: 50px;

      & div:first-child {
        margin-right: 5px;
        width: 40px;
        line-height: 50px;
        text-align: center;
        flex-shrink: 0;
      }

      & div:nth-child(2) {
        height: 100%;
        /* overflow: hidden; */
        flex: 1;
        display: flex;
        align-items: center;
        white-space: nowrap;

        & span {
          text-align: center;
          margin-right: 9px;
          margin-left: 1px;
          outline: 1px solid rgb(192, 192, 192);
          display: block;
          width: 60px;
          height: 25px;
          line-height: normal;
        }

        & img {
          outline: 1px solid rgb(192, 192, 192);
          height: 95%;
          margin-left: 1px;
          margin-right: 9px;
        }

        & .bor {
          outline: 1px solid green;
        }
      }
    }
  }
}
</style>
