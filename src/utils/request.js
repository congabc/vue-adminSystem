import axios from 'axios'
// 自动截取ajax请求
// axios.get('/db.json').then(response => {// get请求路径幕刃在public里面找
//     const data =response.data
//     console.log(data)
// }) 
const request = axios.create({
    baseURL:process.env.VUE_APP_BASE_API, //（前缀） /后面加的是默认路径baidu.com/ 后面加的就是单引号的内容
    timeout:5000 //请求超时
})
// 定义拦截器
// 请求拦截器 必须有返回值 不管成功与否
request.interceptors.request.use(config => {
    //请求拦截
    return config
},error =>{// 出现异常的时候返回错误信息
    return Promise.reject(error)
})
// 响应拦截
request.interceptors.response.use(response => {
    // response.data
    return response
}, error =>{
    return Promise.reject(error)
})

// request.get('/db.json').then(response => {
//     console.log(response.data)
// })
export default request  // 导出自定义创建的axios对象