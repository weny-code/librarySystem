<template>
  <div class="container">
  <!-- 导航栏 -->
    <div id="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">我是借阅者</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mybookshelf' }"
          ><a>信息修改</a></el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/borrowinfor' }"
          ><a>借阅历史</a></el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!-- 详情页面 -->
    <div v-show="xianshi" class="xiangqingyemian">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover"> 用户编号：111 </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            用户姓名：武松
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            距归还还剩：7天
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">
            书籍名称：{{detail.bookName}}
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            借阅时间：{{detail.borrowTime}}
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            借阅有效期：{{detail.validTime}}
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="demo-input-suffix">
      <el-input
        class="sousuokuang"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input2"
      >
      </el-input>
      <el-button type="primary"  icon="el-icon-search" @click="search"
        >搜索</el-button
      >
    </div>
    <!-- 所有借阅历史 -->
    <div class="tb">
      <el-table
        :data="bookData"
        style="width: 100%"
        
      >
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
        <el-table-column label="详情" width="200"
          > <template slot-scope="scope">
            <el-button v-on:click="onLook(scope.row)" type="info" round
              >查看详情</el-button
            ></template></el-table-column
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
      input2: "",
      xianshi: false,
      bookData: [
        // {
        //   bookName:"水浒传",
        //   nation:"中国",
        //   type:"不知道",
        //   length:"很长",
        //   theme:"不知道",
        // },
        //  {
          
        //   bookName:"水浒传",
        //   nation:"中国",
        //   type:"不知道",
        //   length:"很长",
        //   theme:"不知道",
        // },
        //  {
          
        //   bookName:"水浒传",
        //   nation:"中国",
        //   type:"不知道",
        //   length:"很长",
        //   theme:"不知道",
        // },
        //  {
        //   bookId: 4,
        //   bookName:"水浒传",
        //   nation:"中国",
        //   type:"不知道",
        //   length:"很长",
        //   theme:"不知道",
        // },
        //  {
        //   bookId: 5,
        //   bookName:"水浒传",
        //   nation:"中国",
        //   type:"不知道",
        //   length:"很长",
        //   theme:"不知道",
        // },
        //  {
        //   bookId: 6,
        //   bookName:"水浒传",
        //   nation:"中国",
        //   type:"不知道",
        //   length:"很长",
        //   theme:"不知道",
        // },
        //  {
        //   bookId: 7,
        //   bookName:"水浒传",
        //   nation:"中国",
        //   type:"不知道",
        //   length:"很长",
        //   theme:"不知道",
        // },
      ],
      detail: 
        {
          // userId: 111,
          // name: "诸葛亮",
          retTime: " ",
          bookName: " ",
          borrowTime: " ",
          validTime: " ",
        },
      currentPage: 1, // 当前页码
     // 每页的数据条数
       pageSize: 5, 
     total: 0, // 总条数
    };
  },
  methods: {
    onLook(book) {
      this.xianshi = true;
      console.log(book.id)
      this.$axios
      .get("/borrowInfo/3")
      .then((res) => {
        this.detail = res.data;
        console.log(res.data);
        console.log(this.detail);
      });
    },
    getCount() {
      this.$axios
        .get("/borrowCount/5")
        .then((res) => {
          this.total = res.data
        });
    },
    search() {
      console.log("点击了搜索");
      this.$axios({
        method: 'post',
        url: '/borrowUserLikeSearch',
        data: {
          userId: 5,
          bookName: this.input2
        }
        }).then((res)=>{
          this.bookData = res.data ;
          this.total = this.bookData.length
          console.log(this.total)
        });
    },
     getBookData() {
      this.$axios({
          method: 'post',
          url: '/borrowPage',
          data: {
            userId: 5,
            index: this.currentPage-1
          }
        }).then((res) => {
          this.bookData = res.data;
          console.log(this.bookData)
        });
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getBookData()
    },
  },
  created() {
    this.getCount();
    this.getBookData();
    // this.total=this.bookData.length
    // console.log( this.pageSize);
  },
};
</script>

<style scoped>
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
  margin-top: 50px;
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
  width: fit-content;
  border: 2px solid rgb(175, 193, 241);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
