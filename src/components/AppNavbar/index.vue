<template>
    <div class="navbar">
        <!-- <el-row class="navbar"> -->
  <el-col :span="24">
    <el-menu
      :router="true"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#2d3a4b"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/memter/">
        <i class="el-icon-user-solid"></i>
        <span slot="title">会员管理</span>
      </el-menu-item>
      <el-menu-item index="/supplier/">
        <i class="el-icon-s-cooperation"></i>
        <span slot="title">供应商管理</span>
      </el-menu-item>
      <el-menu-item index="/goods/">
        <i class="el-icon-s-goods"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>

    </div>
</template>
<style scoped>
.navbar{
  padding: 30px 0;
}
.el-menu-vertical-demo{
  margin: 30px 0;
}
.el-menu-vertical-demo > li{
  margin-bottom: 10px;
}
span  {
  font-size: 18px;
  
}

    .el-menu {
        border-right: none;
    }
</style>