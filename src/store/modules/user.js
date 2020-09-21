import {getToken, setToken, getUser, setUser, removeToken} from '@/utils/auth.js'
import {login, getUserInfo, getUserOut} from '@/api/login'

const user = {
    state: {
        // 管理状态值
        token:getToken(),
        user: getUser()
    },
    // 改变状态值
    mutations: {
        SET_TOKEN(state,token){
            state.token=token
            setToken(token)
        },
        SET_USER(state,user){
            state.user=user
            setUser(user)
        }
    },
    // 业务逻辑调用状态值用{commit}, 
    actions:{//form 传入的用户输入的值
        // 获取token登录状态
        Login({commit},form){//commit调用mutations中的方法
            // 新建一个promise对象 通知调用此方法的对象进行的结果
            return new Promise((resolve,reject)=>{
                login(form.username.trim(), form.password).then(resp=>{
                    const res =resp.data
                    commit('SET_TOKEN',res.data.token)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 获取用户信息
        GetUserInfo({commit,state}){
            return new Promise((resolve,reject)=>{
                getUserInfo(state.token).then(resp=>{
                    const resUser =resp.data
                    commit('SET_USER',resUser.data)
                    resolve(resUser)
                }).catch(err => {
                    reject(err)
                })
            })
        }
        // 退出
    }
}
export default user