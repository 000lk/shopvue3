import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { LoginP } from "../Login";
import { addcar, getcar } from "@/api";

export const ShopStore = defineStore('shopcar', () => {
    const loginB = LoginP()
    const goodcar = ref([])
    const allprice = computed(() => {
        return goodcar.value.reduce((a, b) => {
            return a + b.price * b.count
        }, 0)
    })
    const allcount = computed(() => {
        return goodcar.value.reduce((a, b) => {
            return a + b.count
        }, 0)
    })
    const select = computed(() => {
        return goodcar.value.every(a => a.selected)
    })
    const selectcount = computed(() => {
        return goodcar.value.reduce((k, g) => {
            if (g.selected) {
                return k + g.count
            }
            else
                return 0
        }, 0)
    })
    const selectallprice = computed(() => {
        return goodcar.value.reduce((k, g) => {
            if (g.selected) {
                return k + g.count * g.price
            }
            else
                return 0
        }, 0)
    })
    function add1(a) {
        if (loginB.token !== '') {
            addcar(a.skuId, a.count).then((a) => {
                console.log('添加购物车信息');
                console.log(a);
                getcar().then((s) => {
                    console.log('购物车列表');
                    console.log(s);
                    goodcar.value = s.data.result
                    ElMessage({
                        message: '添加成功',
                        type: 'success',
                        plain: true,
                    })
                })
            }).catch((e) => {
                console.log(e);

            })
        }
        else {
            const index = goodcar.value.findIndex((it) => {
                return it.skuId === a.skuId
            })
            if (index !== -1) {
                goodcar.value[index].count += a.count
                ElMessage({
                    message: '添加成功',
                    type: 'success',
                    plain: true,
                })
            }
            else {
                goodcar.value.push(a)
                ElMessage({
                    message: '添加成功',
                    type: 'success',
                    plain: true,
                })
            }
        }

    }
    return {
        goodcar, add1, allprice, allcount, select, selectallprice, selectcount
    }
}, { persist: true })