<template>
  <div id="RoleManage">
    <mq-table style="min-width:700px;" width="80%" title="角色管理">
      <!-- 新增角色 -->
      <template slot="mqtable-head">
        <div style="text-align:right;">
          <el-button type="primary" size="mini" @click="dialogVisible = true">
            <i class="el-icon-plus"></i>
            新增
          </el-button>
        </div>
        <!-- 新增角色弹框 -->
        <template>
          <el-dialog
            title="新增角色"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose"
          >
            <span>
              <template>
                <el-form :model="roleInfo" :rules="rules" ref="roleInfo">
                  <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="roleInfo.roleName" placeholder="输入角色名称" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="roleInfo.roleDesc" placeholder="输入角色描述" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label>
                    <el-tree
                      v-model="roleInfo.permissions"
                      :data="allPermission"
                      show-checkbox
                      node-key="permissionDesc"
                      :default-expanded-keys="[2, 3]"
                      :default-checked-keys="[5]"
                      :props="defaultProps"
                    ></el-tree>
                  </el-form-item>
                </el-form>
              </template>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="addNewRole">{{isupdateRoleInfo?'更新':'确定'}}</el-button>
            </span>
          </el-dialog>
        </template>
      </template>

      <!-- 角色管理的内容 -->
      <template slot="mqtable-content">
        <table>
          <tr>
            <th>角色名称</th>
            <th>角色描述</th>
            <th>详情</th>
            <th>操作</th>
          </tr>
          <template v-if="allRoles">
            <tr v-for="(item,index) in allRoles" :key="index">
              <td>{{item.roleName}}</td>
              <td>{{item.roleDesc}}</td>
              <td></td>
              <td style="width:150px">
                <div class="operator">
                  <!-- 编辑角色 -->
                  <el-button type="primary" size="mini" @click="updateRoleInfo(item)">编辑角色</el-button>
                  <!-- 删除角色 -->
                  <el-button type="danger" @click="deleteRole(item._id)" size="mini">删除角色</el-button>
                </div>
              </td>
            </tr>
          </template>

          <!-- 如果没有数据的时候提示 -->
          <template v-else>
            <tr>
              <td colspan="7">没有数据</td>
            </tr>
          </template>
        </table>
      </template>
    </mq-table>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      roleInfo: {
        roleName: "",
        roleDesc: "",
        permissions: ""
      },
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "角色描述不能为空", trigger: "blur" }
        ]
      },
      message: "",
      isupdateRoleInfo: false,
      dialogVisible: false,
      defaultProps: {
        children: "children",
        label: "permissionDesc"
      }
    };
  },
  // 引入vuex里的数据
  computed: {
    ...mapGetters(["allPermission", "allRoles"])
  },
  methods: {
    cancel() {
      var action = () => {
        this.$router.go(0);
      };
      this.operatorConfirm("退出编辑", action);
    },
    handleClose() {
      this.dialogVisible = false;
      this.$router.go(0);
    },
    deleteRole(_id) {
      var action = () => {
        this.post(this.$apis.deleteRole, { _id: _id }).then(() => {
          this.handleClose();
        });
      };
      this.operatorConfirm("删除角色", action);
    },
    addNewRole() {
      console.log(this.$refs.roleInfo);
      this.$refs.roleInfo.validate((valid) => {
        if (valid) {
          var url = "";
          if (this.isupdateRoleInfo) {
            url = this.$apis.updateRoleInfo;
          } else {
            url = this.$apis.addNewRole;
          }
          this.post(url, this.roleInfo)
          .then((resp) => {
            this.handleClose();
          });
        } else {
          return false;
        }
      });
    },
    updateRoleInfo(item) {
      this.dialogVisible = true;
      this.isupdateRoleInfo = true;
      this.roleInfo.roleName = item.roleName;
      this.roleInfo.roleDesc = item.roleDesc;
      this.roleInfo.permissions = item.permissions;
      this.roleInfo._id = item._id;
    }
  }
};
</script>
<style lang="scss" scoped>
#RoleManage {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: white;
}
.operator {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>


