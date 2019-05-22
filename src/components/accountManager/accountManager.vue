<template>
  <div id="accountManager">
    <mq-table style="min-width:600px;" width="70%" title="用户管理">
      <template slot="mqtable-head">
        <div style="text-align:right;">
          <el-button type="primary" size="mini" @click="dialogFormVisible = true">
            <i class="el-icon-plus"></i>
            新增
          </el-button>
        </div>
      </template>

      <!-- 用户管理的内容 -->
      <template slot="mqtable-content">
        <table>
          <tr>
            <th>账号名</th>
            <th>角色列表</th>
            <th>操作</th>
          </tr>
          <template v-if="allUsers">
            <tr v-for="(item,index) in allUsers" :key="index">
              <td>{{item.username}}</td>
              <td>{{item.roles}}</td>

              <td style="width:150px">
                <div class="operator">
                  <!-- 编辑用户 -->
                  <el-button type="primary" size="mini" @click="dialogFormVisible = true">编辑用户</el-button>
                  <!-- 删除用户 -->
                  <el-button type="danger" @click="deleteUser(item)" size="mini">删除用户</el-button>
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
    <!-- 新增用户弹框 -->
    <template>
      <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
        <el-form :model="addUserInfo" :rules="rules" ref="addUserInfo">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="addUserInfo.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input type="password" v-model="addUserInfo.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-checkbox-group
              v-model="addUserInfo.roles"
              v-for="(item,index) in allRoles"
              :key="index"
            >
              <el-checkbox :label="item._id">{{item.roleName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="addNewUser(addUserInfo) ">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogFormVisible: false,
      addUserInfo: {
        username: "",
        password: "",
        roles: []
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      message: ""
    };
  },
  computed: {
    ...mapGetters(["allPermission", "allRoles", "allUsers"])
  },
  methods: {
    cancel() {
      var action = () => {
        this.$router.go(0);
      };
      this.operatorConfirm("退出编辑", action);
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.$router.go(0);
    },
    deleteUser(item) {
      var action = () => {
        this.post(this.$apis.deleteUser, item).then(() => {
          this.handleClose();
        });
      };
      this.operatorConfirm("删除用户", action);
    },
    addNewUser(item) {
      var action=()=>{
        this.post(this.$apis.addNewUser, item).then(() => {
          this.handleClose();
        });
      }
    this.operatorConfirm("新增用户", action);
    }
  }
};
</script>
<style lang="scss" scoped>
#accountManager {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.operator {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>


