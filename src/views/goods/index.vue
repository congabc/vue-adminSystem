<template>
    <div>
        <!-- 导航栏 -->
        <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top: 20px">
            <!-- 重置会看 el-form-item 组件元素的 prop 上是否指定了字段名，指定了才会重置生效 -->
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="商品名称" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="searchMap.code" placeholder="商品编号" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item prop="supplierName">
                <!-- readonly 只读 -->
                <el-input readonly
                @click.native="dialogSupplierVisible = true"
                v-model="searchMap.supplierName" placeholder="选择供应商" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData" >查询</el-button>
                <el-button type="primary" @click="handleAdd" >新增</el-button>
                 <el-button @click="$refs['searchForm'].resetFields()" >重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 数据展示 -->
        <el-table
            :data="list"
            height="380"
            border
            style="width: 100%">
            <!-- type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽 -->
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="name" label="商品名称" ></el-table-column>
            <el-table-column prop="code" label="商品编码" width="90"></el-table-column>
            <el-table-column prop="spec" label="商品规格" ></el-table-column>
            <el-table-column prop="retailPrice" label="零售价" ></el-table-column>
            <el-table-column prop="purchasePrice" label="进货价" ></el-table-column>
            <el-table-column prop="storageNum" label="库存数量" ></el-table-column>
            <el-table-column prop="supplierName" label="供应商" ></el-table-column>
             <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
             </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!-- 选择供应商对话框 -->
        <el-dialog title="选择供应商" :visible.sync="dialogSupplierVisible" width="500px">
            <!-- @option-supplier自定义事件 -->
            <supplier @option-supplier="optionSupplier" :isDialog="true"></supplier>
        </el-dialog>
        <!-- 新增窗口 -->
        <el-dialog title="编辑商品" :visible.sync="dialogFormVisible" width="500px">
            <el-form 
            :rules="rules"
            ref="pojoForm"
            label-width="100px"
            label-position="right"
            style="width: 400px;"
            :model="pojo">
                <el-form-item label="商品名称" prop="name" >
                    <el-input v-model="pojo.name" ></el-input>
                </el-form-item>
                <el-form-item label="商品编码" prop="code" >
                    <el-input v-model="pojo.code" ></el-input>
                </el-form-item>
                <el-form-item label="商品规格" prop="spec" >
                   <el-input v-model="pojo.spec" ></el-input>
                </el-form-item>
                <el-form-item label="零售价" prop="retailPrice">
                    <el-input v-model="pojo.retailPrice" ></el-input>
                </el-form-item>
                <el-form-item label="进货价" prop="purchasePrice">
                    <el-input v-model="pojo.purchasePrice" ></el-input>
                </el-form-item>
                <el-form-item label="库存数量" prop="storageNum">
                    <el-input v-model="pojo.storageNum" ></el-input>
                </el-form-item>
                <el-form-item label="供应商" prop="supplierName">
                    <el-input 
                    readonly
                    @click.native="editOptionSupplier"
                    v-model="pojo.supplierName" placeholder="选择供应商"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="pojo.id === null ? addData('pojoForm'): updateData('pojoForm')">确 定</el-button>
                <!-- <el-button type="primary" @click="addData('pojoForm')">确 定</el-button> -->
            </div>
        </el-dialog>
    </div>
</template>
<script>
import goodsApi from '@/api/goods'
import Supplier from '@/views/supplier'
export default {
    components:{Supplier},
    data (){
        return {
            list:[],
            currentPage:10,
            pageSize:1,
            total:0,
            searchMap:{
                name: '',
                code: '',
                supplierName: '',
                supplierId:null
            },
            dialogSupplierVisible: false,
            dialogFormVisible: false,
            pojo:{
                id: null,
                name: '',
                code: '',
                spec: '',
                retailPrice: 0.0,
                purchasePrice: 0.0,
                storageNum: 0,
                supplierName: '',
                supplierId: null
            },
            rules:{
                name: [
                    {required: true, message:'商品名称不能为空', trigger: 'blur'}
                ],
                code: [
                    {required: true, message:'商品编码不能为空', trigger: 'blur'}
                ],
                retailPrice: [
                    {required: true, message:'零售价不能为空', trigger: 'blur'}
                ]
            },
            liEdit:false//编辑窗口
        }
        
        
    },
    created() {
        this.fetchData()
    },
    methods: {
        // 查询
        fetchData(){
            
            goodsApi.search(this.currentPage,this.pageSize,this.searchMap).then(response=>{
                const lists=response.data.data
                this.list=lists.rows
                this.total=lists.total
            })
        },
        // 分页
        handleSizeChange(val){
            // 每页显示多少条
            this.pageSize = val
            this.fetchData() 
        },
        handleCurrentChange(val){
            // 当前页面
            this.currentPage = val
            this.fetchData() 
        },
        // 父子组件传值
        optionSupplier(currentRow){
            if(this.liEdit){
                this.pojo.supplierName=currentRow.name
                this.pojo.supplierId = currentRow.id 
            }else{
                this.searchMap.supplierName=currentRow.name
                this.searchMap.supplierId = currentRow.id 
            }
            
            this.dialogSupplierVisible=false
            this.liEdit=false
        },
        // 新增打开窗口
        handleAdd(){
            this.dialogFormVisible=true
            // 渲染结束之后重置数据
            this.$nextTick(() => {
                this.$refs['pojoForm'].resetFields()
            })
        },
        //新增窗口供应商查询
        editOptionSupplier(){
            // 打开供应商选择框
            this.dialogSupplierVisible=true
            this.liEdit=true
        },
        // 新增提交数据
        addData(formName){
            this.$refs[formName].validate(validate=>{
                if(validate){
                    goodsApi.add(this.pojo).then(response=>{
                        const resp=response.data
                        if(resp.flag){
                            // 提交成功关闭窗口
                            this.fetchData()
                            this.dialogFormVisible=false
                        }else{
                            this.$message({
                                message:'resp.message',
                                type:'warning'
                            })
                        }
                    })
                }
            })
        },
        //编辑窗口打开
        handleEdit(id){
            this.handleAdd()
            goodsApi.searchEdit(id).then(response=>{
                const resp =response.data
                if(resp.flag){
                    this.pojo=resp.data
                }
            })
        },
        // 修改数据
        updateData(formName){
            this.$refs[formName].validata(valid =>{
                if(valid){
                    goodsApi.updateData(this.pojo).then(response=>{
                        const resp=response.data
                        if(resp.flag){
                            // 关闭窗口
                            this.fetchData()
                            this.dialogFormVisible = false
                        }
                    })
                }else{
                    return false
                }
            })

        },
        // 删除数据
        handleDelete(id){
            goodsApi.delete(id).then(response=>{
                const resp =response.data
                if(resp.flag){
                    this.fetchData()
                }
            })
        }
    }
}
</script>