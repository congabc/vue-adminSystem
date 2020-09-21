<template>
  <div class="header">
    <a href="#/">
      <img class="logo" src="@/assets/logo.png" width="25px" />
      <span class="company">会员管理系统</span>
    </a>

    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{user.name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus" command="a">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus" command="b">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    
    <div class="line"></div>
  </div>
</template>
<script>
import {getUserOut} from '@/api/login'
export default {
  data(){
    return {
      user: this.$store.state.user.user
    }
  },
  
  methods: {
    handleCommand(command) {
      switch (command) {
        case "a":
          // 打开修改密码窗口
         console.log("修改密码"); 
          this.handlePwd();
          break;
        case "b":
          // 退出系统
          console.log("退出登录")
          this.handleLogout();
          break;
        default:
          break;
      }
    },
    // 退出系统
    handleLogout(){
      // 返回登录时候用户信息
      getUserOut(localStorage.getItem('gl-token')).then(response => {
        // 定义一个变量接收服务端返回的数据
        const resp =response.data
        // 判断成功与否
        if(resp.flag){
          // 成功
          // 清除缓存数据
          localStorage.removeItem('gl-token')
          localStorage.removeItem('gl-user')
          // 返回登录界面
          this.$router.push('/login')
        }else {
          // 错误执行代码
         this.$message({
              message: resp.message,
              type: 'warning',
              duration: 500 // 弹出停留时间
          });
        }
      })
    }
  }
};
</script>
<style >
.el-dropdown {
  float: right;
}
.logo {
  padding: 0px 10px 0 40px;
  vertical-align: middle;
}
.company {
  position: absolute;
  color: white;
}
.el-dropdown-link,
.el-dropdown-item {
  color: white;
  cursor: pointer;
}
.el-dropdown {
  padding-right: 40px;
}
</style>