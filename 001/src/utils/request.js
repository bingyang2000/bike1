import axios from 'axios'

const request = axios.create({
  timeout: 3000
});


// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
  
 // config.headers['token'] = user.token;  // 设置请求头
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // console.log(res);
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        // if (typeof res === 'string' && res!='ok') {
        //     res = res ? JSON.parse(res) : res  
      //    不知道这里为啥报错，报错信息为
      //   VM1255:1 
      //  Uncaught (in promise) SyntaxError: Unexpected token o in JSON at position 0
      //  at JSON.parse (<anonymous>)
      //  at __webpack_exports__.default
        //  }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request;
