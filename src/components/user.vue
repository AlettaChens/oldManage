<template>
<div>
<div>
 <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户ID">
            <span>{{ props.row.user_id }}</span>
          </el-form-item>
          <el-form-item label="昵称">
            <span>{{ props.row.nickname }}</span>
          </el-form-item>
          <el-form-item label="用户性别">
            <span>{{ props.row.sex }}</span>
          </el-form-item>
          <el-form-item label="联系方式">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="年龄">
            <span>{{ props.row.age }}</span>
          </el-form-item>
          <el-form-item label="地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="用户ID"
      prop="user_id">
    </el-table-column>
    <el-table-column
      label="用户昵称"
      prop="nickname" >
    </el-table-column>
       <el-table-column
      label="用户性别"
      prop="sex">
    </el-table-column>
    <el-table-column
      label="用户地址"
      prop="address">
    </el-table-column>
  </el-table>
</div>
 <div class="padination">
 <el-pagination
  background
     @current-change="handleCurrentChange"
     :current-page="currentPage"
     :page-size="pagesize"
     layout="total, prev, pager, next"
     :total="count">
</el-pagination>   
</div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        pagesize: 8,
        count: 0,
        currentPage: 1,
      }
    },created(){
        this.initData();
        },
    methods: {
        initData(){
            this.$http.post("/user/getUserCount",null,response=>{
            if(response.data.code=="200"){
                this.count=response.data.data;
                this.currentPage = 1;
                this.getUserByPage();
            }
            },()=>{
                console.log("err");
            }) 
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getUserByPage()
            },
        getUserByPage(){
            this.$http.post("/user/getUserByPage",{page:this.currentPage,pageSize:this.pagesize}, response=> {
               if(response.data.code=="200"){
                const User=response.data.data;
                console.log(User);
                this.tableData = [];
                User.forEach((item, index) => {
                    const tableData = {};
                    tableData.user_id = item.user_id;
                    tableData.nickname = item.nickname;
                    tableData.sex = item.sex;
 					          tableData.age =item.age;
                    tableData.address = item.address;
                    tableData.phone = item.phone;
                    tableData.index = index;
                    this.tableData.push(tableData);
                })
               }
            },()=>{
                console.log("err");
            });
      }
    }
  }
</script>


<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .padination{
    text-align:right;
    margin-top: 10
  }
</style>
