<template>
  <div id="findByGameName">
    <table class="dataTable" ref="dataTable">
      <tbody>
        <tr style="background-color:pink;">
          <th style="width:70px">旗号</th>
          <th v-for="(item,key) in 33" :key="key">{{ item <10 ?'0'+item:item}}</th>
          <th v-for="item in 16" :key="item+'dfdfd'">{{item<10?'0'+item:item}}</th>
        </tr>
        <tr v-for="(item,key) in result" :key="key+'fvgfvg'">
          <td style="width:70px">{{item.period}}</td>
          <td
            v-for="(general,index) in item.missNumber.general"
            :class="general>0?'general':index<33?'ball_red':'ball_blue'"
            :ref="general>0?{}:index<33?'ball_red':'ball_blue'"
            :key="index+'gffss'"
          >
            {{general>0?general:index<33?(index+1)>9?(index+1):'0'+(index+1):
            (index-32)>9?(index-32):'0'+(index-32)
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <template  >
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size = pageSize
                    @current-change="loadMore">
                </el-pagination>
            </template>
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: [],
      positionArray: [],
      total:0,
      pageSize:20
    };
  },
  methods: {
      loadMore(pageNo){
this.$http
      .get(this.$apis.findByGameName, {
        gameName: this.$route.query,
        pageSize: 20,
        pageNo: pageNo
      })
      .then(resp => {
        this.result = resp.data.data.data;
        console.log("result", this.result);
      });      
      },
    lineToAllBlue() {
      /*
                    this.$refs.canvas: 获取画布元素
                    this.$refs.dataTable: 获取表格
                */
      var canvas = this.$refs.canvas;
      var dataTable = this.$refs.dataTable;
      // 设置画布的宽高等于dataTable的宽高
      canvas.width = dataTable.clientWidth;
      canvas.height = dataTable.clientHeight;
      // 设置画布的定位
      canvas.style.position = "absolute";
      // 设置画布和顶部的距离,+19px的原因是首行的高度
      canvas.style.top = dataTable.offsetTop + 19 + "px";
      //创建2d绘图工具
      var context = canvas.getContext("2d");
      // 获取所有存储在this.$refs对象中的篮球选项
      var blueBalls = this.$refs["ball_blue"];
      // 遍历所有的蓝球选项
      for (var i = 0; i < blueBalls.length ; i++) {
        // 获取蓝球的坐标x轴和y轴
        var x = blueBalls[i].offsetLeft + 15;
        var y = blueBalls[i].offsetTop - 10;
        // 如果i=0,代表的是第一行,那就是作为线条的起点
        if (i == 0) {
          // 将笔触移动到该位置上
          context.moveTo(x, y);
        } else {
          // 开始对每一个篮球进行前后连线
          context.lineTo(x, y);
        }
      }
      // 设置连线的颜色
      context.strokeStyle = "blue";
      //设置线条的宽度
      context.lineWidth = 1;
      //绘制路径(显示线条)
      context.stroke();
    }
  },
  mounted() {
    this.$http
      .get(this.$apis.findByGameName, {
        gameName: this.$route.query,
        pageSize: 20,
        pageNo: 1
      })
      .then(resp => {
        this.result = resp.data.data.data;
        console.log("result", this.result);
        this.total = resp.data.total
      });
  },
  updated() {
    this.lineToAllBlue();
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  font: 12px/1.5 arial, 宋体;
}
#findByGameName {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: white;
  padding-top: 50px;
  margin: 0 auto 0 auto;
}

#findByGameName .ssqContainer {
  border: 1px solid #c9c9c9;
  width: 100%;
  margin: 0 auto;
}

#findByGameName .ssqContainer table {
  width: 100%;
  border-collapse: collapse;
}

#findByGameName .ssqContainer table tr {
  width: 100%;
  height: 22px;
}

#findByGameName .ssqContainer table tr td,
#findByGameName .ssqContainer table tr th {
  border: 1px solid lightgray;
  height: 100%;
  text-align: center;
}

.ball_red {
  background-image: url(./ball18px.png);
  background-repeat: no-repeat;
  color: white;
  background-position: center -88px;
}

.ball_blue {
  background-image: url(./ball18px.png);
  background-repeat: no-repeat;
  color: white;
  background-position: center -66px;
}
.general {
  color: lightpink;
}
</style>


