<script setup>
import { defineProps } from 'vue';
defineProps({
    title: {
        type: String
    },
    title1: {
        type: String
    }
})
</script>

<template>
    <div class="hcfclmkl">
        <h2>{{ title }} <small style="color: rgb(121, 121, 121);">{{ title1 }}</small></h2>
        <div class="hcfclmkl1">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.hcfclmkl {
    width: 950px;
    margin: auto;
    margin-top: 15px;
}

.hcfclmkl1 {
    width: 90%;
    margin: auto;
    margin-top: 10px;

}
</style>