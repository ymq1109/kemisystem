<template>
  <div id="LotteryList">
    <mq-table title="彩票列表">
      <template slot="mqtable-head">
        <ul>
          <li v-for="(item,index) in AllGames" :key="index" @click="pushView({name:'findByGameName',query: item.en})">
            <img :src="'http://localhost:3000'+item.icon2">
            <span>{{item.cn}}</span>
          </li>
          <li
            style="width:100px;height:100px;border:1px dashed black; line-height:100px "
            @click="dialogFormVisible = true"
          >
            <i style="font-size:30px " class="el-icon-plus"></i>
          </li>
        </ul>
      </template>
    </mq-table>
    <router-view></router-view>
    <template>
      <el-dialog title="新增彩票" :visible.sync="dialogFormVisible">
        <el-form :model="addNewGameInfo" :rules="rules" ref="addNewGameInfo">
          <el-form-item label="彩票英文名" :label-width="formLabelWidth" prop="en">
            <el-input v-model="addNewGameInfo.en" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="彩票中文名" :label-width="formLabelWidth" prop="cn">
            <el-input v-model="addNewGameInfo.cn" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="icons" :label-width="formLabelWidth" prop="file">
            <input type="file"  @change="getFile($event,1)"/>
          </el-form-item>
          <el-form-item label="icons2" :label-width="formLabelWidth">
            <input type="file"  @change="getFile($event,2)"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submiForm($event)">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from 'axios'
export default {
  data() {
    return {
      dialogFormVisible: false,
      addNewGameInfo: {
        cn: "",
        en: "",
        file: []
      },
      rules: {
        cn: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        en: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        file: [
          { required: true, message: "请上传40*40大小的图片", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    ...mapGetters(["AllGames"])
  },
  methods: {
     handleClose() {
      this.dialogFormVisible = false;
      this.$router.go(0);
    },
    getFile(event,num) {
      console.log(event)
      if(num==1){
        this.addNewGameInfo.file[0]=event.target.files[0];
      }else if(num==2){
        this.addNewGameInfo.file[1]=event.target.files[0];
      }
      console.log(this.file);
    },
    submiForm(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append("cn", this.addNewGameInfo.cn);
      formData.append("en", this.addNewGameInfo.en);
      for(var i=0;i<this.addNewGameInfo.file.length;i++){
        formData.append("file", this.addNewGameInfo.file[i]);
      }
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      this.$refs.addNewGameInfo.validate((valid)=>{
        if(valid){
          var url=process.env.VUE_APP_BaseURL.slice(0,-1) + this.$apis.addNewGame;
          axios.post(url,formData, config)
          .then((resp)=>{
              console.log("resp",resp)
              this.handleClose();
          })
        }
      })
    }
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


