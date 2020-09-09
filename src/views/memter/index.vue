<template>
  <div>
    <!-- 搜索 -->
    <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline">
      <el-form-item label="会员卡号" prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item label="会员名字" prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名字"></el-input>
      </el-form-item>
      <el-form-item label="支付类型" prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付类型" >
          <el-option
            v-for="option in payTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      
      <el-form-item label="日期" prop="birthday" >
      <el-date-picker v-model="searchMap.birthday" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      </el-form-item >
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- // 查询 -->
    <el-table :data="list" height="380" border style="width: 100%">
      <el-table-column prop="id" label="日期" width="50"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号" width="180"></el-table-column>
      <el-table-column prop="name" label="会员名字" width="80"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column prop="phone" label="会员电话"></el-table-column>
      <el-table-column prop="integral" label="可用积分" width="80"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <!-- <el-table-column prop="payType" label="支付类型"></el-table-column>
      调用过滤器-->
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>{{scope.row.payType |payTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <!-- row每一行的数据 -->
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- // 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tatal"
    ></el-pagination>
    <!-- 新增 -->
    <el-dialog   title="会员编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="pojoForm" :rules="rules" :model="pojo" label-width="100px" label-position="right" style="width: 400px;">
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="pojo.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-input
            v-model="pojo.birthday"
            type="date"
            placeholder="会员生日"
            value-format="yyyy-MM-dd"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="pojo.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="pojo.money"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="pojo.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="pojo.payType" placeholder="支付类型">
            <el-option
              v-for="option in payTypeOptions"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="pojo.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="pojo.id===null?addData('pojoForm'):updateData('pojoForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import memberApi from "@/api/member";
const payTypeOptions = [
  { type: "1", name: "现金" },
  { type: "2", name: "支付宝" },
  { type: "3", name: "微信" },
  { type: "4", name: "银行卡" }
];
export default {
  data() {
    return {
      list: [],
      tatal: 0,
      currentPage: 1,
      pageSizes: 10,
      searchMap: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: ""
      },
      payTypeOptions,
      dialogFormVisible: false,
      pojo: {
        id:null,
        payType: "",
        integral: "",
        money: "",
        phone: "",
        birthday: "",
        name: "",
        cardNum: "",
        address: "",
        
      },
      rules:{
          cardNum:[
            { required: true, message: '卡号不能为空', trigger: 'blur' },
          ],
          name:[
            { required: true, message: '姓名不能为空', trigger: 'blur' },
          ],
          payType:[
            {required: true, message: '支付类型不能为空', trigger: 'change'}
          ]
        }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleCurrentChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleSizeChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    updateData(formName){
      console.log('updateData')
      this.$refs[formName].validate(valid=>{
        // 验证表单
        if(valid){
          // 验证通过
          console.log(this.pojo)
          memberApi.update(this.pojo).then(response=>{
            const resp =response.data
            if(resp.flag){
              // 修改成功
              // 刷新列表
              this.fetchData()
              // console.log('成功')
              this.dialogFormVisible = false // 关闭窗口
            }else {
              // 修改失败
              this.$message({
                  message: resp.message, 
                  type: 'warning'
              })
            }
          })
        }else {
          return false
        }
      })
    },
    addData(formName){
      console.log('addData')
      this.$refs[formName].validate(valid =>{
        if(valid){
          // 成功
          
          //提交表单
          memberApi.add(this.pojo).then(response => {
            // console.log(response)
            const resp =response.data
            console.log(resp.flag)
            if(resp.flag){
              this.fetchData()
              this.dialogFormVisible = false 
              console.log('456')
            }else {
              // 新增失败
              console.log('123'),
              this.$message({
                
                message:resp.message,
                type:'warning',
                
              })
            }
          })
        }else {
          //失败
          return false
        }
      })
    },
  
    fetchData() {
      memberApi
        .search(this.currentPage, this.pageSizes, this.searchMap)
        .then(response => {
          const resp = response.data;
          this.list = resp.data.rows;
          this.tatal = resp.data.tatal;
          console.log(resp.data.tatal);
        });
    },

    //重置
  resetForm(formName){
    this.$refs[formName].resetFields()
  },
  // 弹出新窗口
  handleAdd(){
    this.dialogFormVisible = true
    this.$nextTick(() =>{
      this.$refs['pojoForm'].resetFields()
    })
  },
      // 编辑
    handleEdit(id) {
      // console.log("编辑" + id);
      this.handleAdd()
      if(id){
        //有id传入
        memberApi.getbyId(id).then(response => {
          const resp = response.data
          if(resp.flag){
            // 查询成功
            // 先打开新增框
            this.pojo =resp.data
            // console.log(resp.data)

          }else {
            console.log(123)
          }
        })
      }
    },
    // 删除
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
            memberApi.deletebyId(id).then(response=>{
              const resp=response.data
              this.$message({
                type: 'success',
            message: '删除成功!'
              })
              if(resp.flag){
                // 删除成功
                this.fetchData()
              }
            })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  },
  filters: {
    payTypeFilter(type) {
      // 数组的方法 find 查找
      const payObj = payTypeOptions.find(obj => {
        return obj.type === type;
      });
      return payObj ? payObj.name : null;
    }
  },
  
};
</script>

<style  scoped>
.el-table {
  font-size: 14px;
}
</style>