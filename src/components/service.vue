<template>
  <div>
    <div>
      <div class="title_service">
        <el-input
          style="width:200px"
          placeholder="请输入内容"
          v-model="serviceName"
          clearable
          @clear="dataClear"
        ></el-input>
        <span>
          <el-button type="primary" @click="searchService">查询服务</el-button>
        </span>
        <span>
          <el-button type="primary" @click="handleAdd">添加服务</el-button>
        </span>
      </div>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="服务编号">
                <span>{{ props.row.service_id }}</span>
              </el-form-item>
              <el-form-item label="服务名称">
                <span>{{ props.row.service_name }}</span>
              </el-form-item>
              <el-form-item label="服务价格">
                <span>{{ props.row.service_price }}</span>
              </el-form-item>
              <el-form-item label="服务描述">
                <span>{{ props.row.service_description }}</span>
              </el-form-item>
              <el-form-item label="是否热门">
                <span>{{ props.row.service_hot }}</span>
              </el-form-item>
              <el-form-item label="服务种类">
                <span>{{ props.row.service_type }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="服务名称" prop="service_name"></el-table-column>
        <el-table-column label="服务种类" prop="service_type"></el-table-column>
        <el-table-column label="是否热门" prop="service_hot"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        :total="count"
      ></el-pagination>
    </div>
    <div>
      <el-dialog title="服务信息更新" :visible.sync="dialogFormVisible" width="40%">
        <el-form :model="eitdForm" enctype="multipart/form-data">
          <el-form-item label="服务名称" :label-width="'120px'">
            <el-input v-model="eitdForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务价格" :label-width="'120px'">
            <el-input v-model="eitdForm.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务种类" :label-width="'120px'">
            <el-input v-model="eitdForm.type" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务描述" :label-width="'120px'">
            <el-input v-model="eitdForm.description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否热门" :label-width="'120px'">
            <template>
              <el-radio v-model="eitdForm.hot" label="非热门">非热门</el-radio>
              <el-radio v-model="eitdForm.hot" label="热门">热门</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="商铺图片" label-width="120px">
            <el-upload
              class="avatar-uploader"
              action="http://134.175.107.153:8080/eldercare-0.0.1-SNAPSHOT/service/uploadServicePic"
              :show-file-list="false"
              :on-success="handleeditAvatarSuccess"
              :before-upload="beforeUpload"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <em>点击更新</em>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateService">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="服务信息添加" :visible.sync="adddialog" width="40%">
        <el-form :model="addform" enctype="multipart/form-data">
          <el-form-item label="服务名称" :label-width="'120px'">
            <el-input v-model="addform.service_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务价格" :label-width="'120px'">
            <el-input v-model="addform.service_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务种类" :label-width="'120px'">
            <el-input v-model="addform.service_type" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务描述" :label-width="'120px'">
            <el-input v-model="addform.service_description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否热门" :label-width="'120px'">
            <template>
              <el-radio v-model="addform.service_hot" label="非热门">非热门</el-radio>
              <el-radio v-model="addform.service_hot" label="热门">热门</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="商铺图片" label-width="120px">
            <el-upload
              class="avatar-uploader"
              action="http://134.175.107.153:8080/eldercare-0.0.1-SNAPSHOT/service/uploadServicePic"
              :show-file-list="false"
              :on-success="handleaddAvatarSuccess"
              :before-upload="beforeUpload"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="adddialog = false">取 消</el-button>
          <el-button type="primary" @click="addService">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="提示（谨慎操作）" :visible.sync="deletedialog" width="30%" center>
        <span>您确认要删除这个服务吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deletedialog = false">取 消</el-button>
          <el-button type="danger" @click="serviceDelete()">确 定</el-button>
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
      pagesize: 8,
      count: 0,
      currentPage: 1,
      serviceName: "",
      addform: {
        service_imageUrl: "",
        service_name: "",
        service_price: "",
        service_description: "",
        service_hot: "",
        service_type: ""
      },
      eitdForm: {
        name: "",
        price: "",
        avatar: "",
        description: "",
        hot: "",
        type: "",
        id: ""
      },
      dialogFormVisible: false,
      adddialog: false,
      deletedialog: false,
      deleterow: [],
      editrow: [],
      imageUrl: ""
    };
  },
  created() {
    this.initData();
  },
  methods: {
    //添加服务
    addService() {
      this.$http.post(
        "/service/addService",
        this.addform,
        response => {
          console.log(response);
          if (response.data.code == "200") {
            this.$message({
              showClose: true,
              type: "success",
              message: "成功添加服务"
            });
            this.adddialog = false;
            this.addform.service_imageUrl = "";
            this.addform.service_name = "";
            this.addform.service_price = "";
            this.addform.service_description = "";
            this.addform.service_hot = "";
            this.addform.service_type = "";
            this.initData();
          }
        },
        () => {
          console.log("err");
        }
      );
    },

    //图片上传成功后的处理------添加
    handleaddAvatarSuccess(res, file) {
      if (res.code == "200") {
        this.addform.service_imageUrl = res.data;
        this.$message({
          showClose: true,
          type: "success",
          message: "图片上传成功"
        });
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: "图片上传失败"
        });
      }
    },

    //图片上传成功后的处理------edit
    handleeditAvatarSuccess(res, file) {
      if (res.code == "200") {
        this.eitdForm.avatar = res.data;
        this.$message({
          showClose: true,
          type: "success",
          message: "图片更新成功"
        });
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: "图片更新失败"
        });
      }
    },

    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },

    // 编辑服务
    updateService() {
      console.log(this.eitdForm);
      if (
        this.eitdForm.name != "" &&
        this.eitdForm.price >= 0 &&
        this.eitdForm.avatar != "" &&
        this.eitdForm.description != "" &&
        this.eitdForm.hot &&
        this.eitdForm.id != 0 &&
        this.eitdForm.type != ""
      ) {
        this.$http.post(
          "/service/updateService",
          this.eitdForm,
          response => {
            console.log(response);
            if (response.data.code == "200") {
              this.$message({
                showClose: true,
                type: "success",
                message: "服务信息更新成功"
              });
            }
            this.dialogFormVisible = false;
            this.editrow.name = "";
            this.editrow.price = "";
            this.editrow.avatar = "";
            this.editrow.description = "";
            this.editrow.hot = "";
            this.editrow.type = "";
            this.editrow.id = "";
            this.initData();
          },
          () => {
            console.log("err");
          }
        );
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: "缺少图片或者信息"
        });
      }
    },

    // 删除服务
    serviceDelete() {
      console.log(this.deleterow.service_id);
      this.$http.post(
        "/service/deleteServiceById",
        { id: this.deleterow.service_id },
        response => {
          if (response.data.code == "200") {
            this.$message({
              showClose: true,
              type: "success",
              message: "服务已经被成功删除"
            });
            this.initData();
          }
        },
        () => {
          console.log("err");
        }
      );
      this.deletedialog = false;
    },

    //搜素服务
    searchService() {
      if (this.serviceName == "") {
        this.$message({
          showClose: true,
          type: "danger",
          message: "您还啥都没有输入呢"
        });
        return;
      }
      this.$http.post(
        "/service/getServiceByName",
        { serviceName: this.serviceName },
        response => {
          if (response.data.code == "200") {
            const Service = response.data.data;
            this.tableData = [];
            Service.forEach((item, index) => {
              const tableData = {};
              tableData.service_id = item.service_id;
              tableData.service_name = item.service_name;
              tableData.service_type = item.service_type;
              tableData.service_description = item.service_description;
              tableData.service_hot = item.service_hot;
              tableData.service_price = item.service_price;
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

    //处理编辑
    handleEdit(index, row) {
      this.editrow = Object.assign({}, row);
      this.eitdForm.id = this.editrow.service_id;
      this.eitdForm.name = this.editrow.service_name;
      this.eitdForm.type = this.editrow.service_type;
      this.eitdForm.hot = this.editrow.service_hot;
      this.eitdForm.description = this.editrow.service_description;
      this.eitdForm.price = this.editrow.service_price;
      this.dialogFormVisible = true;
    },

    //处理删除
    handleDelete(index, row) {
      this.deleterow = Object.assign({}, row);
      this.deletedialog = true;
    },

    //处理添加
    handleAdd() {
      // this.form = [];
      this.adddialog = true;
    },

    //处理分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserByPage();
    },

    //重新初始化数据
    dataClear() {
      this.initData();
    },

    //初始化数据
    initData() {
      this.$http.post(
        "/service/getServiceCount",
        null,
        response => {
          if (response.data.code == "200") {
            this.count = response.data.data;
            this.currentPage = 1;
            this.getUserByPage();
          }
        },
        () => {
          console.log("err");
        }
      );
    },

    //分页获取服务
    getUserByPage() {
      this.$http.post(
        "/service/getServiceByPageByAdmin",
        { page: this.currentPage, pagesize: this.pagesize },
        response => {
          if (response.data.code == "200") {
            const Service = response.data.data;
            this.tableData = [];
            Service.forEach((item, index) => {
              const tableData = {};
              tableData.service_id = item.service_id;
              tableData.service_name = item.service_name;
              tableData.service_type = item.service_type;
              tableData.service_description = item.service_description;
              tableData.service_hot = item.service_hot;
              tableData.service_price = item.service_price;
              tableData.index = index;
              this.tableData.push(tableData);
            });
          }
        },
        () => {
          console.log("err");
        }
      );
    }
  }
};
</script>


<style>
.title_service {
  padding-top: 10px;
  padding-left: 20px;
  float: left;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80;
  display: block;
}
</style>