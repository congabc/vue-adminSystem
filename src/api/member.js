import request from '../utils/request'
export default{
    // 获取会员数据
    getList(){
        return request({
            url:'/member/list',
            method: 'get'
        })
    },
    // 分页
    search(page,sizi,searchMap){
        return request({
            url:`/member/list/search/${page}/${sizi}`,
            method:'post',
            data :searchMap
        })
    },
    // 新增
    add(pojo){
        return request({
            url:`/member`,
            method:'post',
            data :pojo
        })
    },
    // 查询
    getbyId(id){
        return request({
            url:`/member/${id}`,
            method:'get'
        })
    },
    // 修改
    update(pojo){
        return request({
            url:`/member/${pojo}`,
            method:'put',
            data :pojo
        })
    },
    deletebyId(id){
        return request({
            url:`/member/${id}`,
            method:'delete'
        })
    }
}