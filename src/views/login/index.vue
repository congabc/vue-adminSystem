<template>
  <div class="login-container" >
      <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
          <h2 class="login-title">会员管理系统</h2>
          <el-form-item label="帐号" prop="username">
              <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm('form')">登录</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
import {login, getUserInfo} from '@/api/login'

  export default {
    data() {
      return {
        form: {
            username: '',
            password: ''
         },
         rules: {
             username: [
                  {required: true, message: '帐号不能为空', trigger: 'blur' },
             ],
             password: [
                 {required: true, message: '密码不能为空', trigger: 'blur' },
             ]
         }
      }
    },
    methods: {
      submitForm(formName) {
        
        this.$refs[formName].validate(valid => {
            if (valid) {
                // 通过dispatch()函数触发store中定义的user组件中的actions下的Login方法
                // 此方法会调用接口请求token值，并且请求成功之后会token值保存到state下进行管理
                // 并且把token值存储到localstorage中，方便页面刷新之后获取token值
                this.$store.dispatch('Login',this.form).then(resp=>{
                    // 获取成功跳转页面
                    if(resp.flag){
                        this.$router.push('/')
                    }else {
                        this.$message({
                            message: response.message,
                            type: 'waring'
                        })
                    }
                })
            }else{
                console.log('验证失败')
                return false
            }
        })
    }
  }
}
</script>

<style scoped>
.login-form {
    width: 350px;
    /* 上下间隙 160px, 左右自动居中 */
    margin: 160px auto;
    background-color: rgb(255,255,255,0.8);
    padding: 28px;
    border-radius: 20px;
}
.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../../assets/timg1.jpg') no-repeat; 
    background-size: 100% 100%;
    transform: translateX();
}
.login-title {
    color: #303133;
    text-align: center;

}
</style>