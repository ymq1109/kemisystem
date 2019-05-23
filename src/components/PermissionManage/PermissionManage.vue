<template>
  <div id="PermissionManage">
    <mq-table style="min-width:400px;" width="30%" title="权限管理">
      <template slot="mqtable-head">
        <div style="text-align:right;">
          <el-button type="primary" size="mini"  @click="pushView({name:'addNewPersmission'})">
            <i class="el-icon-plus"></i>
            新增权限
          </el-button>
        </div>
      </template>
      <template slot="mqtable-content">
        <el-tree
          v-model="allPermission"
          :data="allPermission"
          show
          node-key="permissionDesc"
          :default-expanded-keys="[2, 3]"
          :default-keys="[5]"
          :props="defaultProps"
        >
        </el-tree>
        <!-- <el-button type="danger" @click="deletePermission(_id)">删除</el-button> -->
      </template>
    </mq-table>
    <router-view/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "permissionDesc"
      }
    };
  },
  computed: {
    ...mapGetters(["allPermission"])
  },
  methods: {
    cancel(){
      var action=()=>{
        this.$router.go(0);
      };
      this.operatorConfirm("退出编辑",action)
    },
    handleClose(){
      this.dialogVisible=false;
      this.$router.go(0);
    },
    
    //可以在vuex里通过id查询所有的权限，然后通过点击删除的时候，弹出对话框，然后根据id点击删除。
    // deletePermission(_id){
    //   var action = () => {
    //     this.post(this.$apis.deletePermission, { _id: _id }).then(() => {
    //       this.handleClose();
    //     });
    //   };
    //   this.operatorConfirm("删除角色", action);
     
    // }
  },
};
</script>
<style lang="scss" scoped>
#PermissionManage {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: white;
}
</style>


