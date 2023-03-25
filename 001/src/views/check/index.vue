<template>
  <div>
    <el-input
      style="position: relative; top: 10px; right: -2%; width: 70%"
      v-model="search"
      size="mini"
      placeholder="按任务状态检索"
    />
    <el-button
      size="mini"
      @click="find"
      style="position: relative; top: 10px; right: -2%"
      >查找</el-button
    >
    <el-table
      :data="tableData"
      style="width: 90%; margin-top: 20px; margin-left: 20px"
    >
      <el-table-column label="产生时间" prop="firstTime">
        <template slot-scope="scope">{{ scope.row.firstTime | dateFormat }}</template>
      </el-table-column>
      <el-table-column label="开始时间" prop="startTime | conversion">
        <template slot-scope="scope">{{ scope.row.startTime | dateFormat }}</template>
      </el-table-column>
      <el-table-column label="结束时间" prop="endTime | conversion">
        <template slot-scope="scope">{{ scope.row.endTime | dateFormat }}</template>
      </el-table-column>
      <el-table-column label="状态" prop="state">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.state"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预估需求时间" prop="needSpan">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.needSpan"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.needSpan }}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            v-show="!scope.row.isEdit"
            >编辑</el-button
          >
          <el-button
            size="mini"
            @click="handleModify(scope.$index, scope.row)"
            v-show="scope.row.isEdit"
            >保存</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-input
      v-model="insertData.firstTime"
      size="mini"
      placeholder="请输入产生时间"
      style="position: relative; top: 10px; right: -2%; width: 10%"
    />
    <el-input
      v-model="insertData.startTime"
      size="mini"
      placeholder="请输入开始时间"
      style="position: relative; top: 10px; right: -5%; width: 10%"
    />
    <el-input
      v-model="insertData.endTime"
      size="mini"
      placeholder="请输入结束时间"
      style="position: relative; top: 10px; right: -8%; width: 10%"
    />
    <el-input
      v-model="insertData.state"
      size="mini"
      placeholder="请输入状态"
      style="position: relative; top: 10px; right: -11%; width: 10%"
    />
    <el-input
      v-model="insertData.needSpan"
      size="mini"
      placeholder="请输入预估时间"
      style="position: relative; top: 10px; right: -14%; width: 10%"
    />
    <el-button
      size="mini"
      type="primary"
      @click="add()"
      style="float: right; position: relative; top: 10px; right: 9%"
      >添加</el-button
    >
  </div>
</template>

<script>
import request from "../../utils/request";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      insertData: {
        firstTime: "",
        startTime: "",
        endTime: "",
        state: "",
        isEdit: false,
        needSpan: "",
      },
    };
  },
  methods: {
    handleEdit(index, row) {
      this.$set(row, "isEdit", true);
      console.log(row);
    },
    handleModify(index, row) {
      this.$set(row, "isEdit", false);
      request({
        // `url` 是用于请求的服务器 URL
        url: "/api/updateTask",
        // `method` 是创建请求时使用的方法
        method: "post", // 默认是 get
        data:row,
      }).then((res) => {
        // console.log(res.data)  //配置文件已做修改,所以res就是data
        console.log(res);
      });
    },
    handleDelete(index, row) {
      this.$data.tableData.splice(index, 1);
      request({
        // `url` 是用于请求的服务器 URL
        url: "/api/delTask",
        // `method` 是创建请求时使用的方法
        method: "post", // 默认是 get
        params: {
          id: index,
        },
      }).then((res) => {
        // console.log(res.data)  //配置文件已做修改,所以res就是data
        console.log(res);
      });
    },
    add() {
      let newTask = {
        firstTime: this.insertData.firstTime,
        startTime: this.insertData.startTime,
        endTime: this.insertData.endTime,
        state: this.insertData.state,
        needSpan: this.insertData.needSpan,
      };
      this.$data.tableData.push(this.$data.insertData);
      request({
        // `url` 是用于请求的服务器 URL
        url: "/api/addTask",
        // `method` 是创建请求时使用的方法
        method: "post", // 默认是 get
        data: newTask,
      }).then((res) => {
        // console.log(res.data)  //配置文件已做修改,所以res就是data
        console.log(res);
      });
    },
    find() {
      if (!this.$data.search) {
        alert("输入内容不能为空");
      } else {
        for (var j = this.tableData.length - 1; j >= 0; j--) {
          if (this.search != this.tableData[j].state) {
            this.tableData.splice(j, 1);
            console.log(this.tableData);
          }
        }
      }
    },
  },
  created() {
    request({
      // `url` 是用于请求的服务器 URL
      url: "/api/getAllTask",
      // `method` 是创建请求时使用的方法
      method: "get", // 默认是 get
    }).then((res) => {
      // console.log(res.data)  //配置文件已做修改,所以res就是data
      console.log(res);
      for (var i = 0; i < res.length; i++) {
        this.tableData.push({
          firstTime: res[i].firstTime,
          startTime: res[i].startTime,
          endTime: res[i].endTime,
          state: res[i].state,
          isEdit: false,
          needSpan: res[i].needSpan,
        });
      }
    });
  },
    filters: {
    dateFormat: function (value) {
      if(value)
      return new Date(value).toLocaleString();
      else
      return '数据还未出生哦';
    },
  },
};
</script>