import store from "@/store";
import axios from "axios";
// 引入进度条
import nProgress from "nprogress";

// 引入进度条样式
import "nprogress/nprogress.css";
const requests = axios.create({
    //基础路径,发请求的时候会自动加上api
    baseURL:"api",
    //请求超市的时间
    timeout:5000,
})

// 请求拦截器
requests.interceptors.request.use((config)=>{
    nProgress.start();
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
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