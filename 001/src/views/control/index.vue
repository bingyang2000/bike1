<template>
  <div>
    <el-input
      style="position: relative; top: 10px; right: -2%; width: 70%"
      v-model="search"
      size="mini"
      placeholder="输入工号搜索"
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
      <el-table-column label="姓名" prop="name">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.name"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" prop="phoneNumber">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.phoneNumber"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.phoneNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="sex">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.sex"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" prop="cardId">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.cardId"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.cardId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工号" prop="jobNumber">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.jobNumber"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.jobNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" prop="password">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.password"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成功数" prop="successNum">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.successNum"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.successNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="失败数" prop="failNum">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.failNum"
            size="mini"
            class="editRemarkInput"
          />
          <span v-show="!scope.row.isEdit">{{ scope.row.failNum }}</span>
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
      v-model="insertData.name"
      size="mini"
      placeholder="姓名"
      style="position: relative; top: 10px; right: -2%; width: 10%"
    />
    <el-input
      v-model="insertData.phoneNumber"
      size="mini"
      placeholder="电话号"
      style="position: relative; top: 10px; right: -4%; width: 15%"
    />
    <el-input
      v-model="insertData.sex"
      size="mini"
      placeholder="性别"
      style="position: relative; top: 10px; right: -8%; width: 7%"
    />
    <el-input
      v-model="insertData.cardId"
      size="mini"
      placeholder="身份证号"
      style="position: relative; top: 10px; right: -12%; width: 22%"
    />
    <br />
    <el-input
      v-model="insertData.jobNumber"
      size="mini"
      placeholder="工号"
      style="position: relative; top: 10px; right: -2%; width: 15%"
    />
    <el-input
      v-model="insertData.password"
      size="mini"
      placeholder="密码"
      style="position: relative; top: 10px; right: -4%; width: 15%"
    />
    <el-input
      v-model="insertData.dist"
      size="mini"
      placeholder="所属区"
      style="position: relative; top: 10px; right: -6%; width: 8%"
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
        name: "",
        phoneNumber: "",
        sex: "",
        cardId: "",
        jobNumber: "",
        password: "",
        successNum: "0",
        failNum: "0",
        dist: "",
        isEdit: false,
      },
    };
  },
  methods: {
    handleEdit(index, row) {
      this.$set(row, "isEdit", true);
    },
    handleModify(index, row) {
      this.$set(row, "isEdit", false);
      request({
        // `url` 是用于请求的服务器 URL
        url: "/api/updateDispatcher",
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
        url: "/api/delDispatcher",
        // `method` 是创建请求时使用的方法
        method: "post", // 默认是 get
        params: {
          jobNumber: row.jobNumber,
        },
      }).then((res) => {
        // console.log(res.data)  //配置文件已做修改,所以res就是data
        console.log(res);
      });
    },
    add() {
        let newDispatcher= {
        "name": this.insertData.name,
        "phoneNumber": this.insertData.phoneNumber,
        "sex": this.insertData.sex,
        "cardId": this.insertData.cardId,
        "jobNumber": this.insertData.jobNumber,
        "password": this.insertData.password,
        "successNum": this.insertData.successNum,
        "failNum": this.insertData.failNum,
        "dist": this.insertData.dist,
      };
      this.$data.tableData.push(this.$data.insertData);
      request({
        // `url` 是用于请求的服务器 URL
        url: "/api/addDispatcher",
        // `method` 是创建请求时使用的方法
        method: "post", // 默认是 get
        data:newDispatcher,
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
          if (this.search != this.tableData[j].jobNumber) {
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
      url: "/api/getDispatcher",
      // `method` 是创建请求时使用的方法
      method: "get", // 默认是 get
    }).then((res) => {
      // console.log(res.data)  //配置文件已做修改,所以res就是data
      console.log(res);
      for (var i = 0; i < res.length; i++) {
        this.tableData.push({
            name:res[i].name ,
            phoneNumber:res[i].phoneNumber ,
            sex:res[i].sex ,
            cardId:res[i].cardId,
            jobNumber: res[i].jobNumber,
            password: res[i].password,
            successNum:res[i].successNum,
            failNum:res[i].failNum,
            dist:res[i].dist,
            isEdit: false,
        });
      }
    });
  },
};
</script>