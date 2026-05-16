import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const LayoutStore = defineStore('laystore', () => {
    const cate = ref([])
    const banner = ref([])
    const New = ref([])
    const Hot = ref([])
    const Product = ref([])
    const bannerOrder = ref([])
    return {
        cate,
        banner,
        New,
        Hot,
        Product,
        bannerOrder
    }
}, { persist: true })