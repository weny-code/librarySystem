import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'HomePage',
    component: HomePage
},
{
    path: '/Navigation',
    name: 'Navigation',
    redirect: '/UserPage',//默认
    component: () =>
        import( /* webpackChunkName: "about" */ '../components/Navigation.vue'),
    //路由嵌套
    children: [
        {
            path: '/UserPage',
            name: 'UserPage',

            // meta: {
            //     requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
            // },
            component: () =>
                import( /* webpackChunkName: "about" */ '../components/UserPage.vue'),
        },
        {
            path: '/Mybookshelf',
            name: 'Mybookshelf',
            // meta: {
            //     requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
            // },
            component: () =>
                import( /* webpackChunkName: "about" */ '../components/Mybookshelf.vue')
        },
        {
            path: '/Borrowinfo',
            name: 'Borrowinfo',
            // meta: {
            //     requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
            // },
            component: () =>
                import( /* webpackChunkName: "about" */ '../components/Borrowinfo.vue')
        },
        {
            path: '/infoModifyStudent',
            name: 'infoModifyStudent',
            // meta: {
            //     requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
            // },
            component: () =>
                import( /* webpackChunkName: "about" */ '../components/infoModifyStudent.vue')
        },
        {
            path: '/MyInfo',
            name: 'MyInfo',
            // meta: {
            //     requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
            // },
            component: () =>
                import( /* webpackChunkName: "about" */ '../components/MyInfo.vue')
        },
        {
            path: '/Bookroom',
            name: 'Bookroom',
            // meta: {
            //     requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
            // },
            component: () =>
                import( /* webpackChunkName: "about" */ '../components/Bookroom.vue')
        },
    ]
},

{
    path: '/AdministratorPage',
    name: 'AdministratorPage',
    // meta: {
    //     requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
    // },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "about" */ '../components/AdministratorPage.vue')
},
{
    path: '/SignIn',
    name: 'SignIn',

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "about" */ '../components/SignIn.vue')
},
{
    path: '/Register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "about" */ '../components/Register.vue')
},

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆 
        if (sessionStorage.getItem('userId')) { // 查询本地存储信息是否已经登陆 

            next();
        } else {
            alert("请先登录")
            next({
                path: '/SignIn', // 未登录则跳转至login页面 
            });
        }
    } else {
        next();
    }
});

export default router