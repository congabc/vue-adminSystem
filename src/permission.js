// 登录验证
// 路由跳转验证
// beforeEach(to,from,next)
import router from './router'
import {getUserInfo} from './api/login'
router.beforeEach((to, from, next) => {
    // 获取token值
    const token = localStorage.getItem('gl-token')
    // 判断有没有这个token值 有跳转到目标 没有跳转到登录页面
    console.log(token)
    if(token){
        // 有token值
        // 判断下去的是哪个路径
        if(to.path ==='./login'){
            // 去登录页面
            next()
        }else {
            // 不是去登录页面
            // 获取用户信息，判断是直接跳转还是请求服务端
            const userInfo = localStorage.getItem('gl-user')
            if(userInfo){
                next()
            }else {
                // 获取用户信息  需要引入login中的getUserInfo方法
                getUserInfo(token).then(response => {
                    // 获取到数据
                    const resp = response.data
                    // 判断有没有
                    if(resp.flag){
                        // 有就保存
                        localStorage.setItem('gl-user',JSON.stringify(resp.data))
                        next()
                    }else {
                        // 没获取到重新登录
                        next({path: './login'})
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
// 错的位置
// beforeEach 函数写错 获取getItem 保存setItem
// router.beforeEach((to, from, next) => { 括号掉了
// router 路由没有写， 只有函数引入也没用