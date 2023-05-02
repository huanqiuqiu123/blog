import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: "Home",
        component: () => import("@/page/Home/index.vue")
    },
    {
        path:"/login",
        name:"Login",
        component:()=>import("@/page/Login/index.vue")
    },
    {
        path:"/register",
        name:"Register",
        component:()=>import("@/page/Register/index.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
