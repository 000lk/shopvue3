import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const LoginP = defineStore('LoginA', () => {
    const token = ref('')
    const Lxx = ref('')
    return {
        token,
        Lxx
    }
}, { persist: true })