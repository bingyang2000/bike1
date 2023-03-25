<template>
  <div>
    <el-input
      style="position: relative; top: 10px; right: -2%; width: 70%"
      v-model="search"
      size="mini"
      placeholder="按所属区检索"
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
      <el-table-column label="id" prop="ID"> </el-table-column>
      <el-table-column label="现有单车数" prop="bikeCount">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.bikeCount"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.bikeCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属区" prop="dist">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.dist"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.dist }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需调度车辆数" prop="needBikeCount">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.needBikeCount"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.needBikeCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="经度" prop="jindu">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.jindu"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.jindu }}</span>
        </template>
      </el-table-column>
      <el-table-column label="纬度" prop="weidu">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.weidu"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.weidu }}</span>
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
      v-model="insertData.ID"
      size="mini"
      placeholder="id"
      style="position: relative; top: 10px; right: -2%; width: 10%"
    />
    <el-input
      v-model="insertData.bikeCount"
      size="mini"
      placeholder="现有单车数"
      style="position: relative; top: 10px; right: -5%; width: 10%"
    />
    <el-input
      v-model="insertData.dist"
      size="mini"
      placeholder="所属区"
      style="position: relative; top: 10px; right: -8%; width: 10%"
    />
    <el-input
      v-model="insertData.needBikeCount"
      size="mini"
      placeholder="需调度车辆数"
      style="position: relative; top: 10px; right: -11%; width: 10%"
    />
    <el-input
      v-model="insertData.jindu"
      size="mini"
      placeholder="经度"
      style="position: relative; top: 10px; right: -14%; width: 10%"
    />
    <el-input
      v-model="insertData.weidu"
      size="mini"
      placeholder="纬度"
      style="position: relative; top: 10px; right: -17%; width: 10%"
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
        ID: "",
        bikeCount: "",
        dist: "",
        needBikeCount: "",
        jindu: "",
        weidu: "",
        isEdit: false,
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
        url: "/api/delPort",
        // `method` 是创建请求时使用的方法
        method: "post", // 默认是 get
        params: {
          ID: this.tableData[index].ID,
        },
      }).then((res) => {
        // console.log(res.data)  //配置文件已做修改,所以res就是data
        console.log(res);
      });
    },
    add() {
      let newPort = {
        ID: this.insertData.ID,
        bikeCount: this.insertData.bikeCount,
        dist: this.insertData.dist,
        needBikeCount: this.insertData.needBikeCount,
        jindu: this.insertData.jindu,
        weidu: this.insertData.weidu,
      };
      this.$data.tableData.push(this.$data.insertData);
      request({
        // `url` 是用于请求的服务器 URL
        url: "/api/addPort",
        // `method` 是创建请求时使用的方法
        method: "post", // 默认是 get
        data: newPort,
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
          if (parseInt(this.search) != this.tableData[j].dist) {
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
      url: "/api/getAllPort",
      // `method` 是创建请求时使用的方法
      method: "get", // 默认是 get
    }).then((res) => {
      // console.log(res.data)  //配置文件已做修改,所以res就是data
      console.log(res);
      for (var i = 0; i < res.length; i++) {
        this.tableData.push({
          ID: res[i].iD,
          bikeCount: res[i].bikeCount,
          dist: res[i].dist,
          needBikeCount: res[i].needBikeCount,
          jindu: res[i].jindu,
          weidu: res[i].weidu,
          isEdit: false,
        });
      }
    });
  },
};
</script>