// 登录验证
// 路由跳转验证
// beforeEach(to,from,next)
import router from './router'
import {getUserInfo} from './api/login'
import store from './store'

router.beforeEach((to, from, next) => {
    // 获取token值
    // const token = localStorage.getItem('gl-token')
    const token = store.state.user.token
    // 判断有没有这个token值 有跳转到目标 没有跳转到登录页面
    if(token){
        // 有token值
        // 判断下去的是哪个路径
        if(to.path ==='/login'){
            // 去登录页面
            next()
        }else {
            // 不是去登录页面
            // 获取用户信息，判断是直接跳转还是请求服务端
            const userInfo = store.state.user.user 
            if(userInfo){
                next()
            }else {
                // 获取用户信息  需要引入login中的getUserInfo方法
                store.dispatch('GetUserInfo').then(resp=>{
                    if(resp.flag){
                        next()
                    }else {
                        next({path:'/login'})
                    }
                })
            }
        }
    }else{
        if(to.path !=='/login'){
            next({path:'/login'})
        }else{
            next()
        }
    }
})
