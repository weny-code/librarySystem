<template>
  <div class="container">
    <div class="demo-input-suffix">
      <el-input class="input" placeholder="主题" v-model="textarea.title">
      </el-input>
    
    </div>
    <div >
      <el-input
        class="textarea"
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea.content"   
      :autosize="{ minRows: 8, maxRows: 10}"
      >
      </el-input>
        <el-button type="primary" @click="open()"  class="juli">发布</el-button>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea:{
        title:"",
        content:"",
        publisherId:"", 
      } 
    }
    
  },
  methods: {
    issue() {
      alert("点击了发布");
    //   this.$axios
    //   .get("url/textarea")
    //   .then((res) => {
    //       comsole.log("修改成功")
    //   })
    },
    open() {
      this.textarea.publisherId=sessionStorage.getItem("userId");
        this.$confirm('此操作将修改公告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            
            this.$axios({
              method: "post",
              url: "/addAnnouncement",
              data:this.textarea
            })
            .then((res) => {
              if(res.data==1){
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
                .catch(function (error) {
                  console.log(error);
                });
              }
              else{
                this.$message.error("添加失败");
              }
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
    height: 329px;
}
.juli{
 
  text-align: center;
  margin: 0 auto;
   margin-top:2%;
}
</style>