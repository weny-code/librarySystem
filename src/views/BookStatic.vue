<template>
  <div class="borrow-container block">
    <!-- 走马灯 -->
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item,index) in lists" :key="index">
          <h2 class="medium">{{ item.name }}</h2>
          <span>借出数量: {{ item.valueBorrow }}</span> <br />
          <span>归还数量:{{ item.valueRet }}</span>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 报表 -->
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" class="mainReport" style="width: 500px; height: 400px"></div>
    <div
      id="main1"
      class="mainReport1"
      style="width: 500px; height: 400px"
    ></div>
  </div>
</template>

<script src="echarts.min.js"></script>
<script>
import echarts from "echarts";
export default {
  name: "bookStatic",
  data() {
    return {
      lists: [
        { name: "今日统计", valueBorrow: null, valueRet: null ,id:1},
        { name: "本月统计", valueBorrow: null, valueRet: null ,id:2},
        { name: "年度统计", valueBorrow: null, valueRet: null ,id:3},
      ],
    };
  },
  mounted: function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    var myChart1 = echarts.init(document.getElementById("main1"));
    // 指定图表的配置项和数据
    // 饼状图
    var name = [];
    var value = [];
    var nameRet = [];
    var valueRet = [];

    myChart.setOption({
      title: {
        text: "最近五个月归还情况",
        left: "center",
        top: 0,
        textStyle: {
          color: "black",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: 10,
        data: [],
      },
      color : ['LightPink','CornflowerBlue','#00EE76','#FF6A6A','Magenta' ],
      series: [
        {
          name: "归还数量",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "center",
          },
          label: {
            normal: {
              formatter: "{b}:{c}" + "\n\r" + "({d}%)",
              show: true,
              position: "left",
              textStyle:{
                fontSize:"20",
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold",
              },
            },
          },
          data: [],
        },
      ],
    });

    this.$axios
      .get("/borrowFiveMonthRetData/5")
      .then((res) => {
        var dataRet = res.data;
        console.log(dataRet);
        console.log(dataRet.fiveMonth.length);
        for (var i = 0; i < dataRet.fiveMonth.length; i++) {
          console.log(dataRet.fiveMonth[i].name);
          //获得注解
          nameRet.push(dataRet.fiveMonth[i].name + "月");
          //获取注解和数值
          valueRet.push({
            value: dataRet.fiveMonth[i].value,
            name: dataRet.fiveMonth[i].name + "月",
          });
        }
        myChart.setOption({
          legend: {
            data: nameRet,
          },
          series: [
            {
              data: valueRet,
            },
          ],
        });
        console.log("获取了归还饼状图的数据");
        console.log(value);
      })
      .catch((error) => {
        console.log(error);
      });

    myChart1.setOption({
      title: {
        text: "最近五个月借书情况",
        left: "center",
        top: 0,
        textStyle: {
          color: "black",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: 10,
        data: [],
      },
      series: [
        {
          name: "借出数量",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              formatter: "{b}:{c}" + "\n\r" + "({d}%)",
              show: true,
              position: "left",
              textStyle:{
                fontSize:"20",
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold",
              },
            },
          },
          labelLine: {
            normal: {
              show: true,
            },
          },
          data: [],
        },
      ],
    });

    this.$axios
      .get("borrowFiveMonthData/5")
      .then((res) => {
        var data = res.data;
        console.log(data);
        console.log(data.fiveMonth.length);
        for (var i = 0; i < data.fiveMonth.length; i++) {
          console.log(data.fiveMonth[i].name);
          name.push(data.fiveMonth[i].name + "月");
          value.push({
            value: data.fiveMonth[i].value,
            name: data.fiveMonth[i].name + "月",
          });
        }
        myChart1.setOption({
          legend: {
            data: name,
          },
          color : ['#B22222', 'MediumOrchid', 'green', 'steelblue', 'orange' ],
          series: [
            {
              data: value,
            },
          ],
        });
        console.log("获取了借出饼状图的数据");
        console.log(value);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    //获取当天借出总数
    getCurrentDayCount() {
      this.$axios
        .get("/borrowDay")
        .then((res) => {
          this.lists[0].valueBorrow = res.data;
          console.log(this.lists[0].valueBorrow);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取本月借出总数
    getCurrentMonthCount() {
      this.$axios
        .get("/borrowMonth")
        .then((res) => {
          this.lists[1].valueBorrow = res.data = res.data;
          console.log(this.lists[1].valueBorrow);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取年度借出总数
    getCurrentYearCount() {
      this.$axios
        .get("/borrowYear")
        .then((res) => {
          this.lists[2].valueBorrow = res.data;
          console.log(this.lists[2].valueBorrow);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取当天归还总数
    getCurrentDayRetCount() {
      this.$axios
        .get("/borrowRetDay")
        .then((res) => {
          this.lists[0].valueRet = res.data;
          console.log(this.lists[0].valueRet);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取本月归还总数
    getCurrentMonthRetCount() {
      this.$axios
        .get("/borrowRetMonth")
        .then((res) => {
          this.lists[1].valueRet = res.data;
          console.log(this.lists[1].valueRet);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取年度归还总数
    getCurrentYearRetCount() {
      this.$axios
        .get("/borrowRetYear")
        .then((res) => {
          this.lists[2].valueRet = res.data;
          console.log(this.lists[2].valueRet);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getCurrentDayCount();
    this.getCurrentMonthCount();
    this.getCurrentYearCount();
    this.getCurrentDayRetCount();
    this.getCurrentMonthRetCount();
    this.getCurrentYearRetCount();
  },
};
</script>

<style scoped>
@font-face {
  font-family: "FZZJ-JHTJW";
  src: url("../assets/font/FZFWZhuZiAYuanJWM.TTF");
}

.el-carousel__item h3 {
  color: #9fac69;
  font-size: 18px;
  opacity: 0.85;
  line-height: 100px;
  margin: 0;
}

.el-carousel__item span {
  color: rgb(100, 86, 86);
  font-size: 22px;
  line-height: 40px;
  opacity: 0.75;
  font-family: "FZFWZhuZiAYuanJWM";
}

.el-carousel__item:nth-child(2n) {
  background-color: rgb(238, 215, 202);
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d7f56c;
}
.carousel {
  width: 1000px;
  margin: 20px auto;
}
.el-carousel__item{
  box-shadow: rgb(250, 102, 18) 10px 10px 10px; 
  border-radius: 20px;
}

.mainReport,
.mainReport1 {
  float: left;
}

.mainReport {
  margin-left: 100px;
}

.mainReport1 {
  margin-left: 100px;
}
</style>
