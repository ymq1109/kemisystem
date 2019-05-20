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
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">角色管理</el-menu-item>
          <el-menu-item index="1-2">用户管理</el-menu-item>
          <el-menu-item index="1-3">权限管理</el-menu-item>
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
        </div>
        <router-view/>
    </div>
</template>
<script>
export default {
    methods:{
        logout(){
            var action=()=>{
                localStorage.clear();
                this.$router.push({name:'Login'});
                console.log("跳转到登录页面");
            }
            this.operatorConfirm("退出",action)
        },
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created() {
        this.$store.dispatch('loadAllCategory')
    },
    
}
</script>
<style lang="scss" scoped>
#Home{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .NavBar{
        min-width: 200px;
        width: 15%;
        height: 100%;
        background: linear-gradient(180deg,rgb(195, 201, 194),rgb(195, 230, 189));
    }
    .content{
        width: 85%;
        height: 100%;
        .topcontent{
            width: 100%;
            height: 5%;
            background: linear-gradient(180deg,rgb(195, 201, 194),rgb(195, 230, 189));
            padding: 5px;
            box-sizing: border-box;
            text-align: right;
        }
    }
}
</style>


