import axios from 'axios'

//登录完成后得所有请求必须在header中添加token
// Add a request interceptor
let axiosInstance = axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let loginToken = sessionStorage.getItem("LoginToken");
    if (loginToken) {
        config.headers.Auhtorization = `Bearer ${loginToken}`;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default {
    login(data) {
        return axios.post('/api/login', data);
    },
    logout() {
        //退出登录时，取消全局注入依赖
        axios.interceptors.request.eject(axiosInstance);
    },
    getUserProgress() {
        return axios.get('/api/getUserProgress');
    }
}