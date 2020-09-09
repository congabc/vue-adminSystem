import request from '../utils/request'
export default{
    // 查询
    search(page, size, searchMap){
        return request({
            url:`/goods/list/search/${page}/${size}`,
            method:'post',
            data: searchMap
        })
        
    },
    //新增
    add(pojo){
        return request({
            url:'/goods',
            method:'post',
            data:pojo
        })
    },
    //编辑查询
    searchEdit(id){
        return request({
            url:`/goods/${id}`,
            method:'get',
        })
    },
    // 修改数据
    updateData(pojo){
        return request({
            url:`/goods/${pojo}`,
            method:'post',
            data:pojo
        })
    },
    //删除数据
    delete(id){
        return request({
            url:`/goods/${id}`,
            method:'delete'
        })
    }
}