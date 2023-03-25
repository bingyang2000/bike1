<template>
  <div>
    <div class="header">
      <h1 class="title">共享单车调度系统</h1>
    </div>
    <div class="main">
      <div class="border">
        <div class="content">
          <el-input
            v-model="userName"
            placeholder="请输入用户名..."
            style="width: 70%; margin-top: 20px"
          ></el-input>
          <el-input
            placeholder="请输入密码"
            v-model="password"
            show-password
            style="width: 70%; margin-top: 20px"
          ></el-input>
        </div>
        <div class="toast" v-show="toastShow">
          {{ toastText }}
        </div>
        <div class="btn">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import request from '../../utils/request'


export default {
  data() {
    return {
      userName: "",
      password: "",
      showPass: false,
      toastText: "用户名或密码错误",
      toastShow: false,
      loginRules: {
        //这里待商家需求确定，暂时不添加，但保留接口，应该放在注册页面
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    toast(str) {
      let v = this;
      v.toastText = str;
      v.toastShow = true;
      setTimeout(function () {
        v.toastShow = false;
      }, 1500);
    },

    //登录
    login() {
      // 后台判断进行跳转
      if (this.userName == "" || this.password == "") {
        //   重新输入
        this.toast("不能为空");
      } else {
        request({
          // `url` 是用于请求的服务器 URL
          url: "/api/user/login",
          // `method` 是创建请求时使用的方法
          // method: 'get', // 默认是 get
          params: {
            adminUser: this.userName,
            adminPassword: this.password,
          },
        }).then((res) => {
          // console.log(res.data)  //配置文件已做修改,所以res就是data
          console.log(res);
          if (res == "ok") {
            let flag = true;
            this.$store.commit("login", flag);
            this.$router.push("/home");
            this.toast("登录成功");
          } else {
            this.toast("用户名或密码错误");
          }
        });
      }
    },
    // //这里是退出登录
    // exit() {
    //     let flag = false;
    //     this.$store.commit('login',flag);
    //     this.$router.push("/login");
    //     console.log("退出登录");
    // }
  },
};
</script>
<style lang="scss">
.header {
  text-align: center;
}
.main {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 400px;
  height: 200px;
  margin-left: -200px;
  margin-top: -100px;
  text-align: center;
  border: 1px solid black;
  border-radius: 4px;
  background-color: rgba(84, 92, 100, 0.5);
}
img {
  position: absolute;
  right: 95px;
  top: 105px;
  width: 30px;
  height: 15px;
  cursor: pointer;
  user-select: none;
}
.btn {
  margin-top: 20px;
}
.toast {
  position: fixed;
  z-index: 2000;
  left: 50%;
  top: 45%;
  transition: all 0.5s;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  border-radius: 5px;
  color: #fff;
  background: rgba(17, 17, 17, 0.7);
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  max-width: 150px;
}
</style>
