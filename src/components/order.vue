<template>
<div>
 <div class="title_search">
  <el-input style="width:200px" placeholder="请输入订单用户名" v-model="orderName" clearable @clear="dataClear"></el-input>
 <span> <el-button  type="primary" @click="searchOrder">查询订单</el-button></span>
</div>
<div>
 <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="订单号">
            <span>{{ props.row.order_id }}</span>
          </el-form-item>
          <el-form-item label="订单人">
            <span>{{ props.row.user_name }}</span>
          </el-form-item>
          <el-form-item label="价格">
            <span>{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="服务名称">
            <span>{{ props.row.service_name }}</span>
          </el-form-item>
          <el-form-item label="订单地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="联系电话">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
         <el-form-item label="订单状态">
            <span>{{ props.row.status }}</span>
          </el-form-item>         
          <el-form-item label="下单时间">
            <span>{{ props.row.orderdate }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="订单号"
      prop="order_id">
    </el-table-column>
    <el-table-column
      label="订单人"
      prop="user_name" >
    </el-table-column>
    <el-table-column
      label="服务名称"
      prop="service_name">
    </el-table-column>
       <el-table-column
      label="订单状态"
      prop="status">
    </el-table-column>
    <el-table-column
      label="下单时间"
      prop="orderdate">
    </el-table-column>
        <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
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
<div>
  <el-dialog title="订单状态编辑" :visible.sync="editdialog">
  <el-form :model="editrow">
    <el-form-item label="订单状态" :label-width="formLabelWidth">
      <el-input v-model="originStatus" autocomplete="off" disabled></el-input>
    </el-form-item>
    <el-form-item label="修改操作" :label-width="formLabelWidth">
    <template>
    <el-radio v-model="originStatus" label="未完成">未完成</el-radio>
    <el-radio v-model="originStatus" label="完成">完成</el-radio>
    </template>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editdialog = false">取 消</el-button>
    <el-button type="primary" @click="updateStatus(editrow)">确 定</el-button>
  </div>
</el-dialog>
</div>
<div>
  <el-dialog title="提示（谨慎操作）" :visible.sync="deletedialog" width="30%" center>
  <span>您确认要删除这个订单吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deletedialog = false">取 消</el-button>
    <el-button type="danger" @click="orderDelete">确 定</el-button>
  </span>
</el-dialog>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagesize: 6,
      count: 0,
      currentPage: 1,
      orderName: "",
      editdialog: false,
      deletedialog: false,
      editrow: [],
      deleterow: [],
      formLabelWidth: "120px",
      originStatus: ""
    };
  },
  created() {
    this.initData();
  },
  methods: {
    dataClear() {
      this.initData();
    },
    initData() {
      this.$http.post(
        "/order/getOrderCount",
        null,
        response => {
          if (response.data.code == "200") {
            this.count = response.data.data;
            this.currentPage = 1;
            this.getOrderByPage();
          }
        },
        () => {
          console.log("err");
        }
      );
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderByPage();
    },
    searchOrder() {
        if (this.orderName == "") {
        this.$message({
          showClose: true,
          type: "danger",
          message: "您还啥都没有输入呢"
        });
        return;
      }
      this.$http.post(
        "/order/getOrderByName",
        { serviceName: this.orderName },
        response => {
          if (response.data.code == "200") {
            const Order = response.data.data;
            this.tableData = [];
            Order.forEach((item, index) => {
              const tableData = {};
              tableData.order_id = item.order_id;
              tableData.user_name = item.user_name;
              tableData.price = item.price;
              tableData.service_name = item.service_name;
              tableData.address = item.address;
              tableData.phone = item.phone;
              tableData.status = item.status;
              tableData.orderdate = item.orderdate;
              tableData.index = index;
              this.tableData.push(tableData);
            });
            this.count = this.tableData.length;

          }
        },
        () => {
          console.log("err");
        }
      );
    },
    getOrderByPage() {
      this.$http.post(
        "/order/getOrderPageByAdmin",
        { pageNum: this.currentPage, pageSize: this.pagesize },
        response => {
          if (response.data.code == "200") {
            const Order = response.data.data;
            this.tableData = [];
            Order.forEach((item, index) => {
              const tableData = {};
              tableData.order_id = item.order_id;
              tableData.user_name = item.user_name;
              tableData.price = item.price;
              tableData.service_name = item.service_name;
              tableData.address = item.address;
              tableData.phone = item.phone;
              tableData.status = item.status;
              tableData.orderdate = item.orderdate;
              tableData.index = index;
              this.tableData.push(tableData);
            });
          }
        },
        () => {
          console.log("err");
        }
      );
    },
    handleEdit(index, row) {
      this.editrow = row;
      this.originStatus = this.editrow.status;
      this.editdialog = true;
    },
    handleDelete(index, row) {
      this.deleterow = row;
      this.deletedialog = true;
    },
    updateStatus(edrow) {
      this.$http.post(
        "/order/updateOrderStatus",
        { status: this.originStatus, orderId: edrow.order_id },
        response => {
          if (response.data.code == "200") {
            edrow.status = this.originStatus;
            this.initData();
          }
        },
        () => {
          console.log("err");
        }
      );
      this.editdialog = false;
    },
    orderDelete() {
      this.$http.post(
        "/order/deleteOrderById",
        { orderId: this.deleterow.order_id },
        response => {
          if (response.data.code == "200") {
            this.$message({
              showClose: true,
              type: "success",
              message: "订单已经被成功删除"
            });
             this.initData();
          }
        },
        () => {
          console.log("err");
        }
      );
      this.deletedialog = false;
    }
  }
};
</script>


<style>
.title_search {
  padding-top: 10px;
  padding-right: 20dp;
  float: right;
}
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
.padination {
  text-align: right;
  margin-top: 10;
}
</style>