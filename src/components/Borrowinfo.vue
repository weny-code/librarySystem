<template>
  <div class="container">
    <div class="desc">GBA图书管理系统</div>
    <div class="bottom">
      <el-tooltip class="item" content="退出登录" placement="bottom-end">
        <i class="el-icon-switch-button" v-on:click="alert()"></i>
      </el-tooltip>
    </div>
    <div class="navigator-container">
      <div class="item">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"
            ><el-link class="item-class"
              ><i class="el-icon-s-home"></i>首页</el-link
            ></el-breadcrumb-item
          >
          <el-breadcrumb-item :to="{ path: '/UserPage' }"
            ><el-link class="item-class"
              ><i class="el-icon-s-custom"></i>个人主页</el-link
            ></el-breadcrumb-item
          >
          <el-breadcrumb-item class="item-class" :to="{ path: '/MyInfo' }"
            ><i class="el-icon-ship"></i>个人信息</el-breadcrumb-item
          >
          <el-breadcrumb-item class="item-class"
            ><i class="el-icon-s-order"></i>借阅历史</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
    </div>
    <!-- 详情页面 -->
    <transition name="el-fade-in-linear">
      <div v-show="xianshi" class="xiangqingyemian transition-box">
        <el-row :gutter="12">
          <el-col :span="8">
            <el-card shadow="hover"> 用户编号：{{ sessionStorage.getItem("userId") }} </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover"> 用户姓名：{{ userName }} </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              距归还还剩：{{ detail.validTime }}
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="12">
          <el-col :span="8">
            <el-card shadow="hover"> 书籍名称：{{ detail.bookName }} </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              借阅时间：{{ detail.borrowTime }}
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover"> 借阅有效期：30天 </el-card>
          </el-col>
        </el-row>
        <el-button type="primary" round @click="xianshi = false"
          >点击隐藏</el-button
        >
      </div>
    </transition>

    <div class="demo-input-suffix">
      <el-input
        class="sousuokuang"
        placeholder="请输入书名"
        prefix-icon="el-icon-search"
        v-model="input2"
      >
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="search"
        >搜索</el-button
      >
    </div>
    <!-- 所有借阅历史 -->
    <div class="tb">
      <el-table :data="bookData" style="width: 100%">
        <el-table-column prop="bookName" label="书籍名" width="150">
        </el-table-column>
        <el-table-column prop="nation" label="国家" width="150">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="150">
        </el-table-column>
        <el-table-column prop="length" label="篇幅" width="150">
        </el-table-column>
        <el-table-column prop="theme" label="主题" width="150">
        </el-table-column>
        <el-table-column prop="retTime" label="归还日期" width="200">
        </el-table-column>
        <el-table-column label="详情" width="200">
          <template slot-scope="scope">
            <el-button v-on:click="onLook(scope.row)" type="primary" round
              >查看详情</el-button
            ></template
          ></el-table-column
        >
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="page">
      <el-pagination
        background
        layout="total,prev, pager, next"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input2: null,
      xianshi: false,
      bookData: [],
      detail: {},
      currentPage: 1, // 当前页码
      // 每页的数据条数
      pageSize: 5,
      // 总条数
      total: 0,
      userName: "",
      
    };
  },
  methods: {
    onLook(book) {
      this.xianshi = true;
      console.log(book.id);
      this.$axios.get("/borrowInfo/" + book.id).then((res) => {
        this.detail = res.data;
        console.log(res.data);
        console.log(this.detail);
      });
    },
    getCount() {
      this.$axios.get("/borrowCount/" + sessionStorage.getItem("userId")).then((res) => {
        this.total = res.data.num;
        this.userName = res.data.name;
        console.log("yonghuming");
        console.log(this.userName);
        console.log(this.total)
      });
    },
    search() {
      console.log("点击了搜索");
      this.total = 1;
      this.getSearchCount();
      this.searchAndPage();
    },
    getSearchCount() {
      this.$axios({
        method:'post',
        url: '/borrowUserLikeSearchCount',
        data:{
          userId: sessionStorage.getItem("userId"),
          bookName: this.input2
        }
      }).then((res)=>{
        this.total = res.data
        console.log("搜索得到的总数")
        console.log(this.total)
      }).catch((error)=>{
        console.log(error)
      })
    },
    searchAndPage() {
      this.$axios({
        method: "post",
        url: "/borrowUserLikeSearch",
        data: {
          userId: sessionStorage.getItem("userId"),
          index: (this.currentPage-1),
          bookName: this.input2,
        },
      }).then((res) => {
        this.bookData = res.data;
        console.log(this.bookData)
      });
    },
    getBookData() {
      this.$axios({
        method: "post",
        url: "/borrowPage",
        data: {
          userId: sessionStorage.getItem("userId"),
          index: this.currentPage - 1,
        },
      }).then((res) => {
        this.bookData = res.data;
        console.log(this.bookData);
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if(this.input2 != null){
        this.searchAndPage();
      }else if(this.input2 == null){
        this.getBookData();
      }
    },
    //退出登录
     alert() {
      this.$confirm("正在选择退出当前用户, 是否继续?", "退出登录......", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$userId.userId = null;
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出操作",
          });
        });
    },
  },
  created() {
    this.getCount();
    this.getBookData();
  },
};
</script>

<style scoped>
@font-face {
  font-family: "FZZhaoMFXSJF";
  src: url("../assets/font/FZZhaoMFXSJF.TTF");
}
.container {
  width: 100%;
  position: absolute;
}
.page {
  width: 500px;
  margin-left: 600px;
}
.sousuokuang {
  width: 200px;
}
.xiangqingyemian {
  height: 150px;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.demo-input-suffix {
  margin-left: 700px;
  margin-bottom: 10px;
  margin-top: 30px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 900px;
  margin: 0px 200px 10px;
}
.tb {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  width: 1080px;
  width: fit-content;
  border: 2px solid rgb(175, 193, 241);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.el-card {
  height: 80px;
}
.desc {
  font-family: "FZQuSJW";
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 5px;
  color: cadetblue;
  margin-top: 10px;
  float: left;
  margin-left: 10px;
  cursor: default;
}
.bottom {
  float: right;
  font-size: 40px;
  margin-right: 50px;
  margin-top: 10px;
  cursor: pointer;
  text-align: center;
}
.navigator-container {
  display: flex;
  height: 50px;
  margin-top: 60px;
  align-items: center;
}
.navigator-container .item {
  margin-left: 50px;
}
.item-class {
  font-size: 20px;
  color: black;
}
</style>
