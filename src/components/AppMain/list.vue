<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: $route.path }" class="link">{{$route.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style scoped>
.el-breadcrumb {
  font-size: 20px;
   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
   padding: 20px 30px;
   margin: 20px 20px;
   
}
.link {
  border-left: 3px solid #31c17b;
  padding: 10px;
  
}
</style>