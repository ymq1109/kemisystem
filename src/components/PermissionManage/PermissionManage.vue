<template>
  <div id="Permissionr">
    <mq-table style="min-width:800px;" width="100%" title="权限管理">
      <template slot="mqtable-head">
        <div style="text-align:right;">
          <el-button type="primary" size="mini" @click="dialogFormVisible=true">
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
        ></el-tree>
      </template>
    </mq-table>
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
  }
};
</script>
<style lang="scss" scoped>
</style>


