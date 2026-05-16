<script setup>
import LayoutNav from '@/components/LayoutNav.vue';
import LayoutHeader from '@/components/LayoutHeader.vue';
import LayoutHnar from '@/components/LayoutHnar.vue';
</script>

<template>
    <LayoutHnar></LayoutHnar>
    <LayoutNav></LayoutNav>
    <LayoutHeader></LayoutHeader>
    <router-view :key="$route.fullPath"></router-view>
</template>

<style scoped></style>
