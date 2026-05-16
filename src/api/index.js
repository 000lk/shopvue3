import axios1 from "@/utils/request";

export function homecatehead() {
    return axios1.get('/home/category/head')
}
export function homeBanner() {
    return axios1.get('/home/banner')
}
export function homePanel() {//新鲜好物
    return axios1.get('/home/new')
}
export function homeHot() {//人气推荐
    return axios1.get('/home/hot')
}
export function homeProduct() {//人气推荐
    return axios1.get('/home/goods')
}
export function router2(a) {//二级路由
    return axios1.get('/category', {
        params: {
            id: a
        }
    })
}
export function homeBanner1() {//其他轮播图
    return axios1.get('/home/banner',
        {
            params: {
                distributionSite: '2'
            }
        }
    )
}
export function router3(a) {//二级路由分类具体信息
    return axios1.get('/category/sub/filter', {
        params: {
            id: a
        }
    })
}
export function subcategory(a) {//二级路由分类商品信息
    return axios1.post('/category/goods/temporary', a)
}

export function goodDetail(a) {//商品详情
    return axios1.get('/goods', {
        params: {
            id: a
        }
    })
}
export function hotgoods(a, b) {//不重要
    return axios1.get('/goods/hot', {
        params: {
            id: a,
            type: b,
            limit: 3
        }
    })
}
export function Login(a, b) {//登录
    return axios1.post('/login', {
        account: a,
        password: b
    })
}
export function addcar(a, b) {//购物车
    return axios1.post('/member/cart', {
        skuId: a,
        count: b
    })
}
export function getcar() {//购物车
    return axios1.get('/member/cart')
}
export function deletecar(j) {//删除购物车
    return axios1.delete('/member/cart', {
        data: {
            ids: j
        }
    })
}
export function getorder() {//生成订单
    return axios1.get('/member/order/pre')
}

export function submitorder(j, k) {//提交订单
    return axios1.post('/member/order', {
        deliveryTimeType: 1,
        payType: 1,
        payChannel: 1,
        buyerMessage: '',
        goods: j,
        addressId: k
    })
}

export function getaddress() {//获取地址
    return axios1.get('/member/address')
}
export function getorderresult(id) {//获取订单及结果
    return axios1.get(`/member/order/${id}`)
}
export function cainixh() {//获取会员中心，猜你喜欢
    return axios1.get('/goods/relevant', {
        params: {
            limit: 4
        }
    })
}
export function getorderlist(a) {//获取会员中心，猜你喜欢
    return axios1.get('/member/order', {
        params: a
    })
}