<template>
  <div id="PermissionManage">
    <mq-table style="min-width:400px;" width="30%" title="权限管理">
      <template slot="mqtable-head">
        <div style="text-align:right;">
          <el-button type="primary" size="mini"  @click="dialogVisible = true">
            <i class="el-icon-plus"></i>
            新增权限
          </el-button>
        </div>
        <!-- 新增权限弹框 -->
        <template>
          <el-dialog
            title="新增权限"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <span>
              <table>
                <tr>
                  <td>权限名称</td>
                  <td>
                    <el-input v-model="permissionInfo.permissionName" autocomplete="off" placeholder="请输入权限名称"></el-input>
                  </td>
                  <td>父级权限</td>
                  <td>{{permissionInfo.parentid}}</td>
                </tr>
                <tr>
                  <td>权限描述</td>
                  <td>
                    <el-input v-model="permissionInfo.permissionDesc" autocomplete="off" placeholder="请输入权限描述"></el-input>
                  </td>
                  <td>权限等级</td>
                  <td >
                    <el-input v-model="permissionInfo.permissionLeve" autocomplete="off" placeholder="请输入权限等级"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>排列序号</td>
                  <td>
                    <el-input v-model="permissionInfo.sortNum" autocomplete="off" placeholder="请输入排列序号"></el-input>
                  </td>
                </tr>
              </table>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="addNewPersmission(permissionInfo)">确 定</el-button>
            </span>
          </el-dialog>
        </template>
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      permissionInfo:{
        permissionName:'',
        permissionLeve:'',
        permissionDesc:'',
        sortNum:'',
        parentid:0,
      },
      dialogVisible: false,
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
    addNewPersmission(item){
      this.post(this.$apis.addNewPersmission,item)
      .then(()=>{
        this.handleClose();
      })
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


