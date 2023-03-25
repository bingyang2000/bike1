import request from '../utils/request'

//这种封装已经过时，最好不要用了
export const loginweb = (adminUser,adminPassword) => {
    let datresa=request({
        // `url` 是用于请求的服务器 URL
        url: '/api/user/login',
        // `method` 是创建请求时使用的方法
        // method: 'get', // 默认是 get
        params:{
            adminUser,
            adminPassword
        }
    }).then(res =>{
        // console.log(res.data)  //配置文件已做修改,所以res就是data
        console.log(res)
        return res
    })
    return datresa
}
// let m=request.interceptors.response.use(response => {
    //     let res = response.data;
    //     console.log(res)
    //     return res;
    // })
    // console.log(m)


    // let datresa=request.get('/api/user/login',{
    //     params:{
    //                 adminUser,
    //                 adminPassword
    //             }
    // }).then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    //  console.log(datas)
    //  console.log(datresa)