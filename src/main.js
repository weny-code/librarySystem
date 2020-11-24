import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios'
import qs from 'qs'
// import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css';
import userId from '../global_variable.js'


// Vue.use(VueAxios, axios);
Vue.prototype.$userId = userId
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.use(ElementUI);

axios.defaults.baseURL = '/api'

new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')
    // router.beforeEach((to, from, next) => {
    //     if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆 
    //         if (sessionStorage.getItem('userId') !== null) { // 查询本地存储信息是否已经登陆 
    //             next();
    //         } else {
    //             next({
    //                 path: '/SignIn', // 未登录则跳转至login页面 
    //                 // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面 
    //             });
    //         }
    //     } else {
    //         next();
    //     }
    // });