import { createRouter, createWebHistory } from 'vue-router';
import AuthTemplate from '../template/AuthTemplate.vue';
import Login from '../modules/Auth/Login.vue';
import DefaultTemplate from "../template/DefaultTemplate.vue";
import Home from "../modules/Home.vue";

const routes = [
    {
        path: '/',
        component: DefaultTemplate,
        children: [
            {
                path: '',
                name: 'home',
                component: Home,
            },
        ],
    },
    {
        path: '/login',
        component: AuthTemplate,
        children: [
            {
                path: '',
                component: Login,
            },
        ],
    },
    // {
    //     path: '/sign',
    //     component: AuthTemplate,
    //     children: [
    //         {
    //             path: '',
    //             component: Sign,
    //         },
    //     ],
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('accessToken');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});

export default router;
