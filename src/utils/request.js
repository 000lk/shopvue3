import axios from "axios";
import { LoginP } from "@/stores/Login";
// import { useRouter } from "vue-router";
import router from '@/router/index'
import pinia from "@/main";

const LoginT = LoginP(pinia)
// const router = useRouter()
const axios1 = axios.create({
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 10000
});

// 添加请求拦截器
axios1.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (LoginT.token) {
    config.headers.Authorization = `Bearer ${LoginT.token}`;
    console.log('00000');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios1.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response.status === 401) {
    LoginT.Lxx = ''
    LoginT.token = ''
    router.push('/login')
    ElMessage.error('登录已过期')
  }
  return Promise.reject(error);
});
export default axios1
