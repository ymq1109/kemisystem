<template>
  <div id="Home">
    <div class="NavBar">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- 绑定index，对应分项 -->
        <el-submenu :index="'index'+''" v-for="(item,index) in tabs" :key="index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.permissionDesc}}</span>
          </template>
          <el-menu-item-group v-for="(item,key) in item.children" :key="key">
            <el-menu-item
              :index="index+'-'+key"
              @click="pushView({name:item.permissionName})"
            >{{item.permissionDesc}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content">
      <div class="topcontent">
        <el-button type="danger" size="mini" @click="logout">
          <i class="el-icon-warning"></i>退出
        </el-button>
      </div>
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      permissions: [],
      tabs: []
    };
  },
  methods: {
    logout() {
      var action = () => {
        localStorage.clear();
        this.$router.push({ name: "Login" });
        console.log("跳转到登录页面");
      };
      this.operatorConfirm("退出", action);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    this.$store.dispatch("loadAllPermission");
    this.$store.dispatch("loadAllRoles");
    this.$store.dispatch("loadAllUsers");
    this.$store.dispatch("loadAllGames")
  },
  mounted() {
    var response = JSON.parse(localStorage.getItem("response"));
    this.permissions = response.permissions;
    var length = this.permissions.length;
    for (var i = 0; i < length; i++) {
      if (this.permissions[i].parentid == 0) {
        this.permissions[i].children = [];
        this.tabs.push(this.permissions[i]);
      }
    }
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < this.tabs.length; j++) {
        if (this.permissions[i].parentid == this.tabs[j]._id) {
          this.tabs[j].children.push(this.permissions[i]);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#Home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, rgb(195, 201, 194), #11674E);
  .NavBar {
    min-width: 200px;
    width: 15%;
    height: 100%;
    background: linear-gradient(180deg, rgb(195, 201, 194), #11674E);
    ul {
      margin-top: 40px;
    }
  }
  .content {
    width: 85%;
    height: 100%;
    .topcontent {
      width: 100%;
      height: 5%;
      background: linear-gradient(90deg,  rgb(195, 201, 194), #11674E);
      padding: 5px;
      box-sizing: border-box;
      text-align: right;
    }
  }
}
</style>


