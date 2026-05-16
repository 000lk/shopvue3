<script setup>
import { homePanel } from '@/api';
import PanelPage from './PanelPage.vue';
import { LayoutStore } from '@/stores/layoutStore/LayoutLei';

const LayoutStore000 = LayoutStore()
homePanel().then((a) => {
  console.log('新鲜好物：');
  console.log(a);
  LayoutStore000.New = a.data.result

}).catch((e) => {
  console.log(e);
})
</script>

<template>
  <PanelPage title="新鲜好物" title1="新鲜出炉 品质靠谱">
    <div>
      <ul class="ul43322222222">
        <li v-for="it in LayoutStore000.New" :key="it.id">
          <router-link :to="`/detail/${it.id}`">
            <img :src="it.picture" alt="">
            <div class="mmnnmmnmn">
              <span>{{ it.name }}</span>
              <br>
              <span style="color: red;">￥{{ it.price }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </PanelPage>
</template>

<style scoped>
.ul43322222222 {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.ul43322222222>li {
  transition: all 0.2s;
  width: 180px;
  height: 255px;
}

.ul43322222222>li>a>img {
  width: 180px;
  height: 180px;
}

.ul43322222222>li>a {
  text-decoration: none;
}

.ul43322222222>li:hover {
  box-shadow: 5px 5px 5px #eee;
  transform: translateY(-5px);
}

.mmnnmmnmn {
  width: 100%;
  height: 20px;
}

.mmnnmmnmn span {
  color: black;
}
</style>
