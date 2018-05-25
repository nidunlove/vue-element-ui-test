import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import stores from '../vuex/store.js'
import router from '../router'

Vue.use(VueAxios, axios);

// const Axios = axios.create({
//   // baseURL: 'https://some-domain.com/api/',
//     timeout: 60000
//     // headers: {'X-Custom-Header': 'foobar'}
// });
//设置请求超时
axios.defaults.timeout =  120000;
//循环请求
//可参考： http://javascript.ctolib.com/ssttm169-use-axios-well.html
//设置全局的请求次数，请求的间隙
// axios.defaults.retry = 4;
// axios.defaults.retryDelay = 1000;
//请求根地址
window.eleBaseURL = stores.state.eleBaseURL;
// window.eleBaseURL = "http://192.168.2.95:8080";
//各个请求地址
window.eleAllUrl = {
    // /language/checkLanguage.action
    // http://10.226.74.25:8080/carload/loading.action
    loginUrl: window.eleBaseURL + "/static/login.json",
    taskListUrl: window.eleBaseURL + "/static/taskList.json",


    upDateTaskUrl: window.eleBaseURL + "/static/updataTask.json",

    loadInventoryUrl: window.eleBaseURL + "/static/listData2.json",
    
    loadInventoryUrlStatic: "/static/listData2.json"

}

// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = AIbaseURL;
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = AIbaseURL;
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = AIbaseURL;
// }

// axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
// axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
// axiosIns.defaults.responseType = 'json';
// axiosIns.defaults.transformRequest = [function (data) {
//     //数据序列化
//     return qs.stringify(data);
// }
// ];
// axiosIns.defaults.validateStatus = function (status) {
//     return true;
// };
// axiosIns.interceptors.request.use(function (config) {
//     //配置config
//     config.headers.Accept = 'application/json';
//     // config.headers.System = 'vue';
//     // let token = Vue.localStorage.get('token');
//     // if(token){
//     //     config.headers.Token = token;
//     // }
//     return config;
// });
// console.log("console.log(stores);console.log(stores);console.log(stores);");
// console.log(stores);
// 
//添加请求拦截器
axios.interceptors.request.use(function(config){
     //在发送请求之前做某事
     console.log("在发送请求之前做某事");
     console.log(config);

     let isLoginUrl = (config.url === window.eleAllUrl.loginUrl);
     // console.log(config.url);
     // console.log(window.eleAllUrl.loginUrl);
     // console.log(isLoginUrl);
     if(!isLoginUrl){
        let userInfo = stores.state.login.userInfo;
         // console.log(userInfo);
         if(!userInfo || !userInfo.token || ''==userInfo.token){
            console.log("无登录 信息 !userInfo || !userInfo.token");
             router.replace({name:"Login"});
                          
         } else {
            config.headers.token = userInfo.token;
            config.headers.username= userInfo.userCode;
            config.headers.password= userInfo.password;
         }
     } else {
        console.log("登录的请求不做headers验证");
     }
     
     // console.log(config.headers);
     // console.log(stores);
     // stores.dispatch('showloader');
     // stores.commit('SHOWLOADING');

     return config;
   },function(error){
     //请求错误时做些事
    console.log("请求错误时做些事");
    // stores.dispatch('hideloader');
    // stores.commit('HIDELOADING');
    console.log(error);
    return Promise.reject(error);
   });
 

//添加响应拦截器
axios.interceptors.response.use(function(response){
    //对响应数据做些事
    console.log("对响应数据做些事");
    // console.log(response);
    // stores.dispatch('hideloader');
    // stores.commit('HIDELOADING');
    // console.log(response);
    // 未验证的登录token，跳到登录页
    if(!stores.state.isTestDev && response.data && "999"===response.data.loginStatus){
        console.log(response);
        console.log("登录信息验证失败 ‘999’===response.data.loginStatus");
        router.replace({name:"Login"});
    }
    return response;
   },function(error){
    // stores.dispatch('hideloader');
    // stores.commit('HIDELOADING');
    console.log("Axios.interceptors error");
    console.log(error);
    // if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 ){
        // console.log(error.code);
    // }

     //响应错误时做些事
     console.log("响应错误时做些事");
   
     return Promise.reject(error);
   });



export default axios