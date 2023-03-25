// 用来配置文件的别名，方便路径的寻找
const path = require('path');//引入path模块
function resolve(dir) {
    return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            //set第一个参数：设置的别名，第二个参数：设置的路径
            .set('@', resolve('./src'))//根据目录的层级来决定，也可以自行设
    },
    lintOnSave: false,
    devServer: {
        overlay: {
            warning: false,
            errors: false
        },
        port: 9876,
        proxy: {                 //设置代理，必须填
            '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://localhost:9090',     //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '^/api': ''                     //选择忽略拦截器里面的内容
                }
            }
        }
    },
}
