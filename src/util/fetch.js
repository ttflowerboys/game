import axios from 'axios';

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://127.0.0.1:8081';
}

// 1. 创建axios实例
const fetch = axios.create({
    timeout: 500000 // 请求超时时间
});

let qs = require('qs');

// 2. http request 拦截器
fetch.interceptors.request.use(config => {
    config.headers['Content-type'] = 'application/x-www-form-urlencoded';
    config.data = qs.stringify(config.data);
    config.headers['Authorization'] = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    return config;
}, error => {
    return Promise.reject(error);
});

// 3. respone拦截器
fetch.interceptors.response.use(
    (response) => {
        return response.data;
    }, (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log('没有权限');
                    break;
                case 500:
                    console.log('内部服务器错误!')
                    break;
                case 40301:
                    console.log('response:403, 当前用户无相关操作权限！')
                    break;
                default:
                    console.error('错误信息：' + error.response.status + '-'+ error.response.statusText)
            }
        }
        return Promise.reject(error.response.data);
    }
);

export default fetch;
