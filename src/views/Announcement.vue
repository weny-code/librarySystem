<template>
  <div class="announcementCard">
    <div class="title">
      <!--公告标题和内容-->
      <span>标题:</span>
      <el-input
        class="input"
        placeholder="公告标题"
        v-model="textarea.title"
        clearable
      >
      </el-input>
    </div>
    <div>
      <el-input
        class="textarea"
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea.content"
        :autosize="{ minRows: 10, maxRows: 14 }"
      >
      </el-input>
      <div>
        <el-button type="primary" @click="open()" class="juli">发布</el-button>
        <el-button type="primary" @click="cleartext()" class="cleantext"
          >清空内容</el-button
        >
      </div>
    </div>
    <div class="noticeShow">
      <el-card class="box-card">
        <div class="text item" v-html="text.Notice"></div>
        <el-button type="text" @click="dialogVisible = true"
          >公告详情</el-button
        >
      </el-card>
    </div>
    <el-dialog
      title="公告"
      :visible.sync="dialogVisible"
      style="text-align: left; padding-bottom: 100px"
    >
      <div class="textcontent" v-html="textconent"></div>
      <div style="height: 60px"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    // this.getParams()
    this.$axios({
      method: "get",
      url: "/showAnnouncement",
    })
      .then((res) => {
        console.log(res);
        console.log(res.data.content);
        this.textarea.title = res.data.title;
        this.textarea.content = res.data.content.replace(/<br\/>/g, "\n");
        this.textconent = res.data.content;
        if (res.data.title === "") {
          console.log("w");
        } else {
          this.text.Notice = res.data.title;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  data() {
    return {
      dialogVisible: false,
      textconent: "",
      oldAnnouncement: "",
      text: {
        Notice: "图书管理系统",
      },
      textarea: {
        title: "",
        content: "",
        publisherId: "",
      },
    };
  },
  methods: {
    open() {
      this.textarea.publisherId = sessionStorage.getItem("userId");
      this.$confirm("此操作将修改公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.oldAnnouncement = this.textarea.content;
          let stringReplace = this.textarea.content.replace(
            /\n|\r\n/g,
            "<br/>"
          );
          this.textarea.content = stringReplace;
          this.$axios({
            method: "post",
            url: "/addAnnouncement",
            data: this.textarea,
          }).then((res) => {
            if (res.data == 1) {
              this.text.Notice = this.textarea.title;
              this.textconent = this.textarea.content;
              this.textarea.content = this.oldAnnouncement;
              this.$message({
                type: "success",
                message: "添加成功!",
              }).catch(function (error) {
                console.log(error);
              });
            } else {
              this.$message.error("添加失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    cleartext() {
      this.textarea.content = "";
      this.textarea.title = "";
      
    },
  },
};
</script>

<style>
.cleantext {
  margin-left: 16px;
}
.textcontent {
  font-size: 1.2em;
  margin-top: -2em;
  text-indent: 2em;
  padding: 20px 40px 10px;
}
.noticeShow {
  margin-top: 2%;
  display: flex;
  justify-content: center;
}
.noticeShow .box-card {
  width: 800px;
  height: 100px;
}

.announcementCard {
  height: auto;
}

.titleTip {
  margin-top: 100px;
}
@font-face {
  font-family: "FZZhaoMFXSJF";
  src: url("../assets/font/FZZhaoMFXSJF.TTF");
}
.input {
  width: 30%;
  margin-top: 50px;
  margin-left: 10px;
  font-size: 16px;
  font-family: "FZZhaoMFXSJF";
}
.textarea {
  width: 40%;
  margin: auto;
  margin-top: 30px;
  font-size: 18px;
  font-family: "FZZhaoMFXSJF";
  height: auto;
}
.juli {
  text-align: center;
  margin: 0 auto;
  margin-top: 2%;
}
.title span{
  font-size: 22px;
  margin-left: -80px;
}

</style>