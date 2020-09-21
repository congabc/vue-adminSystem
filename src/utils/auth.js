const TOKEN_KEY = 'gl-token'
const USER_KEY = 'gl-user'

// 获取token
export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}
// 设置 token
export function setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token)
}
// 获取用户信息
export function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY))
}
//设置用户信息
export function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}
//删除用户信息
export function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
}