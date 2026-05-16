<script setup>
import { ref } from 'vue';
import { Avatar, Lock } from '@element-plus/icons-vue'
import { Login } from '@/api';
import { LoginP } from '@/stores/Login';
import { useRouter } from 'vue-router';
import { addcar } from '@/api';
import { ShopStore } from '@/stores/ShopCar';

const shopa = ShopStore()
const LoginStore = LoginP()
const router = useRouter()
const ruleFormRef = ref(null)
const ruleForm = ref({
    name: '',
    pass: '',
    checked1: true
})
const validatePass = (rule, value, callback) => {
    if (/^1[3-9]\d{9}$/.test(value) || /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/.test(value)) {
        callback()
    }
    else {
        callback(new Error('请输入正确的手机号格式或字母开头且6-20个字符'))
    }
}
const XZ = (rule, value, callback) => {
    if (value) {
        callback()
    }
    else {
        callback(new Error('请勾选协议'))
    }
}
const rules = ref({
    name: [
        { required: true, message: '输入用户名或手机号', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
    ],
    pass: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern: /^.{6,14}$/, message: '6-14个字符', trigger: 'blur' }
    ],
    checked1: [
        { validator: XZ, trigger: 'change' }
    ]
})
const lll = (a, b) => {
    Login(a, b).then((s) => {
        console.log('登录');
        console.log(s);
        LoginStore.token = s.data.result.token
        LoginStore.Lxx = s.data.result
        if (shopa.goodcar.length > 0) {
            shopa.goodcar.forEach((d) => {
                addcar(d.skuId, d.count).then((addada) => {
                    console.log('合并了购物车');
                    console.log(addada);
                }).catch((e) => {
                    console.log(e);
                })
            })
        }
    })
}
const submitForm = () => {
    ruleFormRef.value.validate((v) => {
        if (v) {
            lll(ruleForm.value.name, ruleForm.value.pass)
            ElMessage({
                message: '登陆成功',
                type: 'success',
            })
            router.replace('/')
        }
        else {
            ElMessage.error('信息错误')
        }
    })
}
</script>

<template>
    <div class="uui">
        <el-form ref="ruleFormRef" style="max-width: 400px" :model="ruleForm" status-icon :rules="rules"
            label-width="auto" class="demo-ruleForm">
            <el-form-item label="账户" prop="name">
                <el-input v-model="ruleForm.name" autocomplete="off" :prefix-icon="Avatar" />
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" :prefix-icon="Lock" />
            </el-form-item>
            <el-form-item prop="checked1">
                <el-checkbox v-model="ruleForm.checked1" size="large" style="margin-right: 5px;" />
                <span>我已同意隐私条款和服务条款</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.uui {
    width: 400px;
    /* height: 600px; */
    margin: auto;
    margin-top: 200px;
}
</style>