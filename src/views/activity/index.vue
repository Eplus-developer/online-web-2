<template>
  <div class="app-container box">
    <div class="filter-container">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="search"
        style="width: 200px"
      ></el-input>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 10px;"
        @click="handleFilter"
      >Search</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >Add</el-button>
    </div>
    <el-table :data="tableData" stripe border style="width:100%;margin-top: 20px">
      <el-table-column prop="name" label="名称" width="150"></el-table-column>
      <el-table-column prop="promoter.name" label="发起人" width="150"></el-table-column>
      <el-table-column prop="activityType" label="活动类型" width="150"></el-table-column>
      <el-table-column prop="actTime" label="比赛开始时间" width="150"></el-table-column>
      <el-table-column prop="endTime" label="报名截止时间" width="150"></el-table-column>
      <el-table-column prop="description" label="详情" width="150"></el-table-column>
      <el-table-column prop="location" label="地址" width="150"></el-table-column>
      <el-table-column prop="phone" label="电话" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="团队信息" :visible.sync="dialogFormVisible">
      <el-form :model="info">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="举办方" :label-width="formLabelWidth">
          <el-input v-model="info.host" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="比赛开始时间" :label-width="formLabelWidth">
          <el-input v-model="info.beginTime" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="报名截止时间" :label-width="formLabelWidth">
          <el-input v-model="info.singEtime" autocomplete="off"></el-input>
        </el-form-item>  
         <el-form-item label="详情" :label-width="formLabelWidth">
          <el-input v-model="info.des" autocomplete="off"></el-input>
        </el-form-item>     
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      background
      class="page"
      layout="prev, pager, next"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :pager-count="5"
      :total="totalNum"
    ></el-pagination>
  </div>
</template>

<script>
import {getActivity} from "@/api/activity"
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    return {
      activeIndex: "1",
      totalNum: 12,
      pageSize: 6,
      currentPage: 1,
      search: "",
      dialogFormVisible:false,
      formLabelWidth:'100px',
      info:{},
      default:{
         id: undefined,
          name: "",
         host: "",
          beginTime: "",
          singEtime: "",
          des:""
      },
      tableData: []
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.info = row;

    },
    handleCreate(){
      this.dialogFormVisible = true;
      this.info = this.default;

    }
  },
  mounted(){
    var that = this;
    getActivity().then( res => {
      console.log("activity");
          console.log(res.data);
          that.tableData = res.data;
    })
  }
}
</script>
<style scoped>
.page {
  position: fixed;
  bottom: 30px;
  left: 50%;
}
</style>

