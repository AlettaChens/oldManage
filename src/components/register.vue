<template>
<div class="ms_body">
        <div class="ms-login">
        <div class="ms-title">管理员注册</div>
            <el-form :model="form" ref="form" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="form.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>    
                <el-form-item prop="confirm">
                    <el-input type="password" placeholder="密码" v-model="form.confrim" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('form')">注册</el-button>
                </div>
            </el-form>
        </div>
</div>
       
</template>

<script>
export default {
  data: function() {
    return {
      form: {
        username: "",
        password: "",
        confrim: ""
      }
    };
  },
  methods: {
    submitForm() {
      const self = this;
      let params = {
        name: this.form.username,
        password: this.form.password
      };
      if (this.form.password == this.form.confrim) {
        this.$http.post(
          "/admin/register",
          params,
          response => {
            console.log(response);
            if (response.data.code == "200") {
              this.$message({
                showClose: true,
                type: "success",
                message: "管理员注册成功"
              });
            }
          },
          () => {
            console.log("err");
          }
        );
      }
    }
  }
};
</script>
<style scoped>
.ms_body{
        margin:0 auto;
        width:100%;
        height:100%;
        border-radius: 5px;
        background: #ccc;
}
    .ms-title{
        width:100%;
        text-align: center;
        font-size:30px;
        color: #000;
        margin-bottom:30px;
    }
    .ms-login{
        margin:0px auto;
        width:500px;
        height:600px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
   
