<template>
  <div id="addNewPersmission">
    <mq-table width="70%" style="min-width:700px" title="新增分类">
      <template slot="mqtable-content">
          <el-form :model="permissionInfo" :rules="rules" ref="permissionInfo" label-width="100px" class="demo-ruleForm">
                <el-form-item label="权限名称" prop="permissionName">
                    <el-input v-model="permissionInfo.permissionName" placeholder="请输入权限名称"></el-input>
                </el-form-item>
                <el-form-item label="父级权限" prop="parentid">
                    <el-input v-model="permissionInfo.parentid" placeholder="请输入权限名称"></el-input>
                </el-form-item>
                <el-form-item label="权限描述" prop="permissionDesc">
                    <el-input v-model="permissionInfo.permissionDesc" placeholder="请输入权限描述"></el-input>
                </el-form-item>
                <el-form-item label="权限等级" prop="permissionLeve">
                    <el-input   v-model.number="permissionInfo.permissionLeve" placeholder="请输入权限等级"></el-input>
                </el-form-item>
                <el-form-item label="排列序号" prop="sortNum">
                    <el-input  v-model.number="permissionInfo.sortNum" placeholder="请输入排列序号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="addNewPersmission(permissionInfo)">确 定</el-button>
                </el-form-item>
          </el-form>
      </template>
    </mq-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      permissionInfo: {
        permissionName: '',
        permissionLeve: '',
        permissionDesc: '',
        sortNum: '',
        parentid: '',
      },
      rules: {
        permissionName: [
          { required: true, message: "权限名不能为空", trigger: "blur" }
        ],
        permissionLeve: [
          { required: true, message: "权限等级不能为空", trigger: "blur" },
          { type: 'number', message: '权限等级必须为数字值'}
        ],
        permissionDesc: [
          { required: true, message: "权限描述不能为空", trigger: "blur" }
        ],
        sortNum: [
          { required: true, message: "权限排序不能为空", trigger: "blur" },
          { type: 'number', message: '权限排序必须为数字值'}
        ],
        parentid: [
          { required: true, message: "父级权限id不能为空", trigger: "blur" }
        ]
      },
      message: ""
    };
  },
  methods: {
    cancel() {
      var action = () => {
        this.$router.go(-1);
      };
      this.operatorConfirm("退出编辑", action);
    },
    handleClose(){
      this.$router.go(-1);
    },
    addNewPersmission(item){
      this.post(this.$apis.addNewPersmission,item)
      .then(()=>{
        this.handleClose();
      })
    },
  }
};
</script>
<style lang="scss" scoped>
#addNewPersmission {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: white;
}
</style>


