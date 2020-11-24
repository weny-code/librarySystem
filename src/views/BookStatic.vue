<template>
  <div class="borrow-container block">
    <span>借出统计</span>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in list" :key="item">
        <span class="desc">{{ item }}</span>
      </el-carousel-item>
     
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "bookStatic",
  data() {
    return {
      list: ["今日借出统计", "本月借出统计", "年度借出统计"],
    };
  },
};
</script>

<style scoped>
.borrow-container {
  width: 60%;
  margin-left: 20%;
  margin-top: 20px;
  /* margin: 50px; */
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.desc {
  pad: 50px;
  color: black;
  font-size: 20px;
  font-weight: bold;
}
</style>