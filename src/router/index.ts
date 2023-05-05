import {createRouter, createWebHistory, Router, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: "Home",
        component: () => import("@/page/Home/index.vue"),
        children: [
            {
                path: "main",
                name: "Main",
                component: () => import("@/page/Home/Main/index.vue")
            },
            {
                path: "article",
                name: "Article",
                children: [
                    {
                        path: "create",
                        name: "Create",
                        component: () => import("@/page/Article/Create/index.vue")
                    }
                ]
            }
        ]

    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/page/Login/index.vue")
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/page/Register/index.vue")
    },
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
