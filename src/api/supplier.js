import request from '../utils/request'

export default{
    // 查询
    getList(){
        return request({
            url:'/supplier/list',
            method: 'get'
        })
    },
    search(page,sizi,searchMap){
        return request({
            url:`/supplier/list/search/${page}/${sizi}`,
            method:'post',
            data :searchMap
        })
    },
    add(pojo){
        return request({
            url:  `/supplier`,
            method :'post',
            data: pojo

        })
    },
    // 编辑查询
    getbyid(id){
        return request({
            url: `/supplier/${id}`,
            method:'get'
        })
    },
    // 编辑修改
    update(pojo){
        return request({
            url:`/supplier/${pojo}`,
            method:'put',
            data:pojo
        })
    },
    // 删除
    deleteById(id){
        return request ({
            url :`/supplier/${id}`,
            method:'delete'
        })
    }
}