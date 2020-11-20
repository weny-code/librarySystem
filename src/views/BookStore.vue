<template>
  <div>
    <div class="select-container">
      <div class="select">
        <div class="desc">国家</div>
        <el-select
          style="margin-left: 20px"
          v-model="id1"
          clearable
          placeholder="请选择"
          @change="currentBookNation($event)"
        >
          <el-option
            v-for="item in nationData"
            :key="item.id"
            :label="item.nation"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <div class="desc">类型</div>
        <el-select
          style="margin-left: 20px"
          v-model="value2"
          clearable
          placeholder="请选择"
          @change="currentBookType($event)"
        >
          <el-option
            v-for="item in typeData"
            :key="item.id"
            :label="item.type"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <div class="desc">篇幅</div>
        <el-select
          style="margin-left: 20px"
          v-model="value3"
          clearable
          placeholder="请选择"
          @change="currentBookLength($event)"
        >
          <el-option
            v-for="item in lengthData"
            :key="item.id"
            :label="item.length"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <div class="desc">主题</div>
        <el-select
          style="margin-left: 20px"
          v-model="value4"
          clearable
          placeholder="请选择"
          @change="currentBookTheme($event)"
        >
          <el-option
            v-for="item in themeData"
            :key="item.id"
            :label="item.theme"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="check">
        <el-button type="success" icon="el-icon-plus"></el-button>
        <el-button type="success" v-on:click="queryBook()">查询</el-button>
      </div>
    </div>
    <div class="search-container">
      <div class="item">
        <el-input placeholder="请输入关键字"></el-input>
      </div>
      <div class="search">
        <el-button type="success" round v-on:click="searchBook(book)"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="show-container">
      <div class="booktable">
        <el-table v-model="tableData" :data="tableData" stripe>
          <el-table-column
            prop="bookName"
            label="书名"
            width="130"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="nation" label="国家" width="130">
          </el-table-column>
          <el-table-column prop="type" label="类型" width="130">
          </el-table-column>
          <el-table-column prop="length" label="篇幅" width="130">
          </el-table-column>
          <el-table-column prop="theme" label="主题" width="300">
          </el-table-column>
          <el-table-column prop="storeDate" label="上架时间" width="200">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="100"
            header-align="center"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.status == '可借'">
                <el-button
                  type="primary"
                  round
                  v-on:click="showBook(), (dialogTableVisible = true)"
                  >借阅</el-button
                >
              </div>
              <el-dialog :visible.sync="dialogTableVisible" top="10%">
                <el-table :data="tableData">
                  <el-table-column
                    prop="name"
                    label="书名"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    prop="introduction"
                    label="简介"
                  ></el-table-column>
                </el-table>
              </el-dialog>
              <div v-if="scope.row.status == '已借'">
                <el-button type="success" disabled>已借</el-button>
              </div>
              <div v-if="scope.row.status == '无货'">
                <el-button type="info" disabled>无货</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page-container">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bookstore",
};
</script>

<style scoped>
.select-container {
  margin-top: 100px;
}

.select-container .select {
  display: flex;
  width: 80%;
  margin-left: 10%;
  justify-content: space-around;
}

.select-container .desc {
  color: black;
  font-size: 30px;
  margin-top: 2px;
  margin-right: -40px;
  letter-spacing: -5px;
  font-family: "FZZhaoMFXSJF";
}

.select-container .check {
  margin-left: 70%;
  margin-top: 5px;
}

.search-container {
  margin-top: 100px;
  margin-left: 60%;
}

.search-container .item {
  width: 200px;
  margin-left: 10%;
}

.search-container .search {
  margin-top: -40px;
  margin-left: -10px;
}

.show-container {
  display: flex;
  margin-top: 10px;
  width: 100%;
  justify-content: center;
}

.show-container .booktable {
  width: 75%;
}

.page-container {
  margin-top: 5px;
  margin-bottom: 20px;
}
</style>