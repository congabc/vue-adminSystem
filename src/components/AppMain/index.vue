<template>
    <div class="main">
        <app-list v-show="$route.path!=='/home'"></app-list>
        <router-view></router-view>
    </div>
</template>
<script>
import AppList from './list'
export default {
    components:{AppList}
    
}
</script>
<style scoped>
    
</style>