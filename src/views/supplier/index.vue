<template>
    <div>
        <!-- 要重置 需要加上属性prop -->
        <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline">
            <el-form-item label="联系人" prop="linkman" v-if="!isDialog">
              <el-input v-model="searchMap.linkman" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="mobile" v-if="!isDialog">
              <el-input v-model="searchMap.mobile" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item label="供应商" prop="name">
              <el-input v-model="searchMap.name" placeholder="供应商"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="fetchData">查询</el-button>
              <el-button v-if="!isDialog" @click="resetForm('searchForm')">重置</el-button>
              <el-button type="primary" v-if="!isDialog" @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-form>
        
        
        <!-- 表单显示 -->
        <!--highlight-current-row 激活单选行
          current-change当点某行时会触发事件
          handleCurrentChange函数会接收currentRow
          -->
        <el-table
            highlight-current-row
            @current-change="handleCurrentChange"
            :data="list"
            height="350"
            border
            style="width: 100%">
            <el-table-column prop="id" label="序号" width="60"></el-table-column>
            <el-table-column prop="name" label="供应商名称" ></el-table-column>
            <el-table-column prop="linkman" label="联系人" ></el-table-column>
            <el-table-column v-if="!isDialog" prop="mobile" label="手机号码" ></el-table-column>
            <el-table-column v-if="!isDialog" prop="remark" label="备注" ></el-table-column>
            <el-table-column v-if="!isDialog" label="操作" width="200">
                <template slot-scope="scope">
                  <!-- row每一行的数据 -->
                  <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
       <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSizes"
          :layout="!isDialog ? 'total, sizes, prev, pager, next, jumper':'prev, pager, next'"
          :total="tatal">
        </el-pagination>
        
        <!-- 新增表单 -->
        <!-- ：model="pojo" 表单绑定数据 -->
        <el-dialog 
        title="供应商编辑" :visible.sync="dialogFormVisible" width="500px">
            <el-form 
            :rules="rules"
            ref="pojoForm"
            label-width="100px"
            label-position="right"
            style="width: 400px;"
            :model="pojo">
                <el-form-item label="供应商名称" prop="name" >
                    <el-input v-model="pojo.name" ></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="linkman" >
                    <el-input v-model="pojo.linkman" ></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile" >
                   <el-input v-model="pojo.mobile" ></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="pojo.remark" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"  @click="pojo.id === null ? addData('pojoForm'): updateData('pojoForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import supplierApi from "@/api/supplier";

export default {
    props:{
      //判断是不是弹框，父组件传值 默认为false
    isDialog: Boolean
    },
    data(){
        return {
            list: [],
            tatal: 0,
            currentPage: 1,
            pageSizes: 10,
            searchMap:{
                name:'',
                mobile:'',
                linkman:''
            },
            dialogFormVisible: false,
            pojo : {
              id: null,
              name :'',
              linkman:'',
              mobile:'',
              remark:''
            },
            rules: {
              name:[
                {required: true ,message:'供应商不能为空', trigger:'blur'}
              ],
              linkman:[
                {required: true ,message:'供应商不能为空', trigger:'blur'}
              ],
            }
        }
    },
    created() {
    this.fetchData();
  },
    methods:{
        // 分页
        handleSizeChange(val){
            this.currentPage =val;
            this.fetchData()
        },
        handleCurrentChange(val){
            this.pageSizes = val;
            this.fetchData();
        },
        // 打开窗口
         handleAdd(){
          this.dialogFormVisible= true
          this.$nextTick(() => { 
            this.$refs['pojoForm'].resetFields()
          })

        },
        fetchData(){
            supplierApi.search(this.currentPage, this.pageSizes, this.searchMap).then(response =>{
                // 声明一个变量获取数组（错）
                const lists = response.data
                // 赋值 （错）
                // console.log(lists)
                this.list= lists.data.rows
                this.tatal=lists.data.tatal
                

            })
        },
        resetForm(formName){
          this.$refs[formName].resetFields()
          
        },
        // 提交新增表单
       addData(formName){
         this.$refs[formName].validate(valid => {
           
           if(valid){
             // 提交表单
             supplierApi.add(this.pojo).then(response =>{
               const resp = response.data
               if(resp.flag){
                 this.fetchData()
                 this.dialogFormVisible = false
               }else {
                 this.$message({
                   message:resp.message,
                   type:'warning'
                 })
               }
             })
           }else {
             return false
           }
         })
       },
      //  编辑修改提交数据
       updateData(formName){
         this.$refs[formName].validate(valid =>{
          // 判断提交成功了没
          if (valid){
            // 提交成功
            supplierApi.update(this.pojo).then(response =>{
              const list=response.data
              // 判断修改成功没
              if(list.flag){
                this.fetchData()
                this.dialogFormVisible = false
              }else {
                this.$message({
                  message :resp.message,
                  type:'warning'
                })
              }
            })
          }else {
            return false
          }
        
         })
       },
       // 编辑数据
       handleEdit(id){
         // 打开窗口
         this.handleAdd()
         // 获取数据
         supplierApi.getbyid(id).then(response =>{
           const list = response.data
           this.pojo =list.data
         })
       },
       handleDelete(id){
         supplierApi.deleteById(id).then(response =>{
           const resp =response.data
           if(resp.flag){
             // 删除成功
             this.fetchData()
           }
         })
       },
       // 单击触发事件
       // $emit 触发父组件的事件1父组件的事件，2传递的值
       handleCurrentChange(currentRow){
         this.$emit('option-supplier',currentRow)
       }
      }
}
</script>