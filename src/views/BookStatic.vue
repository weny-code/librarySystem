<template>
  <div class="borrow-container block">
    <!-- 走马灯 -->
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in lists" :key="item">

            <h2 class="medium">{{ item }}</h2>
            <span>
                {{item}}
            </span>
          
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 报表 -->
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" class="mainReport" style="width: 600px; height: 400px"></div>
    <div id="main1" class="mainReport1" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script src="echarts.min.js"></script>
<script>
import echarts from "echarts";
export default {
  name: "bookStatic",
  data() {
    return {
        lists:[
            "今日借出统计",
            "本月借出统计",
            "年度借出统计",
            "今日归还统计",
            "本月归还统计",
            "年度归还统计",
            ]
    };
  },
  mounted: function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    var myChart1 = echarts.init(document.getElementById("main1"));
    // 指定图表的配置项和数据
    // 饼状图
    var option1 = {
      title: {
        text: "最近五个月借书情况",
        left: "center",
        top: 20,
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
        data: ["七月", "八月", "九月", "十月", "十一月"],
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 335, name: "七月" },
            { value: 310, name: "八月" },
            { value: 234, name: "九月" },
            { value: 135, name: "十月" },
            { value: 1548, name: "十一月" },
          ],
        },
      ],
    };

    //折线图
    var option = {
      title: {
        text: "最近一周借书情况",
        left: "center",
        top: 20,
        textStyle: {
          color: "black",
        },
      },   
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};
    console.log(option1.series[0].data);
    myChart.setOption(option);
    myChart1.setOption(option1);
  },
  methods: {
    //   getdata(){
    //       this.$axios
    //       .get("url")
    //       .then((res) =>{
    //           this.option1.data = res.data
    //           console.log("获取了饼状图的数据")
    //           console.log(this.option1.data)
    //       }).catch((error)=>{
    //           console.log(error)
    //       });
    //   },
    getDa(){
        console.log(this.option1.data)
    }
  },

};
</script>

<style scoped>

@font-face {
    font-family: "FZZJ-JHTJW";
    src: url('../assets/font/FZZJ-JHTJW.TTF');
}

.el-carousel__item h3 {
  color: #becc80;
  font-size: 18px;
  opacity: 0.85;
  line-height: 100px;
  margin: 0;
}

.el-carousel__item span {
    color: rgb(61, 48, 48);
    font-size: 24px;
    line-height: 50px;
    opacity: 0.75;
    font-family: "FZZJ-JHTJW";
}

.el-carousel__item:nth-child(2n) {
  background-color: #e4928f;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #579cb1;
}
.carousel{
    width: 1000px;
    margin: auto;
}

.mainReport , .mainReport1{
    float: left;
    margin-left: 50px;
}
</style>