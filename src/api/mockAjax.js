import axios from "axios";
// 引入进度条
import nProgress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";
const requests = axios.create({
    //基础路径,发请求的时候会自动加上api
    baseURL:"/mock",
    //请求超市的时间
    timeout:5000,
})

// 请求拦截器
requests.interceptors.request.use((config)=>{
    nProgress.start();
    return config;
});

//响应拦截器
requests.interceptors.response.use((res)=>{
    nProgress.done();
    return res.data;
},(err)=>{
    console.log(err);
    return Promise.reject(new Error('faille'))
})

export default requests;