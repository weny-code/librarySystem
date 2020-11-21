<template>
  <div class="container">
    <div class="demo-input-suffix">
      <el-input class="input" placeholder="修改公告" disabled= true>
      </el-input>
      <el-button type="primary" @click="open" >发布</el-button>
    </div>
    <div >
      <el-input
      class="textarea"
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        :autosize="{ minRows: 6, maxRows: 10}"
      >
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
    };
  },
  methods: {
    issue() {
      console.log("点击了发布");
    //   this.$axios
    //   .get("url/textarea")
    //   .then((res) => {
    //       comsole.log("修改成功")
    //   })
    },
    open() {
        this.$confirm('此操作将修改公告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.issue(),
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      }
  },
};
</script>

<style scoped>
@font-face {
  font-family: "FZZhaoMFXSJF";
  src: url("../assets/font/FZZhaoMFXSJF.TTF");
}
.input {
  width: 30%;
  margin-top: 50px;
  margin-left: auto;
  margin-right: 80px;
  font-size: 16px;
  font-family: "FZZhaoMFXSJF";
}
.textarea{
    width: 40%;
    margin: auto;
    margin-top: 30px;
    font-size: 18px;
    font-family: "FZZhaoMFXSJF";
}
</style>