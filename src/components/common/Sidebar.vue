<template>
    <div class="sidebar">
        <el-menu :default-active="defaultActive" @open="handleOpen" class="el-menu-vertical-demo" background-color="#324157" text-color="#fff"
                 unique-opened router>
            <el-menu-item index="order">
            <i class="el-icon-location"></i>
            <span slot="title">订单管理</span>
            </el-menu-item>
           <el-menu-item index="service">
           <i class="el-icon-menu"></i>
           <span slot="title">服务管理</span>
           </el-menu-item>
           <el-menu-item index="user">
           <i class="el-icon-setting"></i>
           <span slot="title">用户管理</span>
           </el-menu-item>
           <el-menu-item index="register">
           <i class="el-icon-document"></i>
           <span slot="title">管理员注册</span>
           </el-menu-item>
        </el-menu>
    </div>

</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2e363f;
}

.sidebar > ul {
  height: 100%;
}

.el-menu-item,
.el-submenu__title {
  height: 45px !important;
  line-height: 45px !important;
}
</style>


