import { router2 } from '@/api';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

export function navqqq() {
    const route = useRoute()
    const r = ref({})
    const rrr = (s) => {
        router2(s).then((a) => {
            console.log('二级路由');
            console.log(a);
            r.value = a.data.result
        }).catch((e) => {
            console.log(e);

        })
    }
    rrr(route.params.id)
    return {
        r, rrr
    }
}
