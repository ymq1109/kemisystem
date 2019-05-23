<template>
  <div id="LotteryList">
    <mq-table title="彩票列表">
      <template slot="mqtable-head">
        <ul>
          <li v-for="(item,index) in AllGames" :key="index">
            <img :src="'http://localhost:3000'+item.icon2">
            <span>{{item.cn}}</span>
          </li>
          <li style="width:100px;height:100px;border:1px dashed black; line-height:100px " @click="dialogFormVisible = true">
            <i style="font-size:30px " class="el-icon-plus"></i>
          </li>
        </ul>
      </template>
    </mq-table>
    <template>
    <el-dialog title="新增彩票" :visible.sync="dialogFormVisible">
      <el-form :model="addNewGameInfo">
        <el-form-item label="彩票英文名" :label-width="formLabelWidth">
          <el-input v-model="addNewGameInfo.en" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="彩票中文名" :label-width="formLabelWidth">
          <el-input v-model="addNewGameInfo.cn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="icons" :label-width="formLabelWidth">
            <span style="display:inline-block;width:40px;height:40px;border:1px dashed black; line-height:40px;text-align:center;">
                 <i style="font-size:20px " class="el-icon-plus"></i>
            </span>

        </el-form-item>
        <el-form-item label="icons2" :label-width="formLabelWidth">
          <span style="display:inline-block;width:80px;height:80px;border:1px dashed black; line-height:80px;text-align:center;">
                 <i style="font-size:40px " class="el-icon-plus"></i>
            </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
         addNewGameInfo: {
          cn: '',
          en: '',
          _id: '',
        },
        formLabelWidth: '120px'
    };
  },
  computed: {
    ...mapGetters(["AllGames"])
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
#LotteryList {
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
}
ul li {
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  text-align: center;
}
</style>


