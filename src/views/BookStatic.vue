<template>
  <div class="borrow-container block">
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" class="mainReport" style="width: 600px;height:400px;"></div>
    <div id="main1" class="mainReport1" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script src="echarts.min.js"></script>
<script>
import echarts from 'echarts'
export default {
  name: "bookStatic",
  data() {
    return {
    };
  },
  mounted: function(){
     // 基于准备好的dom，初始化echarts实例
     var myChart = echarts.init(document.getElementById('main'));
      var myChart1 = echarts.init(document.getElementById('main1'));
     // 指定图表的配置项和数据
    var option = {
      title: {
        text: '最近五个月借书情况',
        left: 'center',
        top: 20,
        textStyle: {
            color: 'black'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: ['七月', '八月', '九月', '十月', '十一月']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
             data: [
                {value: 335, name: '七月'},
                {value: 310, name: '八月'},
                {value: 234, name: '九月'},
                {value: 135, name: '十月'},
                {value: 1548, name: '十一月'}
            ]
        }
    ]
  };

  var option1 = {
      title: {
        text: '最近五个月还书情况',
        left: 'center',
        top: 20,
        textStyle: {
            color: 'black'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data:['七月', '八月', '九月', '十月', '十一月']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: '七月'},
                {value: 310, name: '八月'},
                {value: 234, name: '九月'},
                {value: 135, name: '十月'},
                {value: 1548, name: '十一月'}
            ]
        }
    ]
  };
  myChart.setOption(option);
   myChart1.setOption(option1);
  }
};
</script>

<style scoped>
.mainReport , .mainReport1{
  float: left;
  margin-top: 20px;
}
</style>