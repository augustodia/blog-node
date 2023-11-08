import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import AuthTemplate from '../template/AuthTemplate.vue';
import Login from '../modules/Auth/Login.vue';
import DefaultTemplate from "../template/DefaultTemplate.vue";
import Home from "../modules/Home/Home.vue";
import Post from "@/modules/Post/Post.vue";
import UserProfile from "@/modules/Profile/UserProfile.vue";
import MyProfile from "@/modules/Profile/MyProfile.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: DefaultTemplate,
        children: [
            {
                path: '',
                name: 'home',
                meta: {
                  requireAuth: false,
                },
                component: Home,
            },
            {
                path: '/post/:id',
                name: 'post',
                meta: {
                    requireAuth: false,
                    showGoBackBtn: true,
                },
                component: Post,
            },
            {
                path: '/my-profile',
                name: 'my-profile',
                meta: {
                    requireAuth: true,
                    showGoBackBtn: true,
                },
                component: MyProfile,
            },
            {
                path: '/user/:id',
                name: 'user-profile',
                meta: {
                    requireAuth: false,
                    showGoBackBtn: true,
                },
                component: UserProfile,
            },
        ],
    },
    {
        path: '/login',
        component: AuthTemplate,
        children: [
            {
                path: '',
                meta: {
                    requireAuth: false,
                },
                name: 'login',
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
    const authRequired = !!to.meta.requireAuth;
    const loggedIn = !!localStorage.getItem('accessToken');

    if(to.name === 'login' && loggedIn) return next({name: 'home'});

    if (authRequired && !loggedIn) {
        return next({name: 'login'});
    }

    next();
});

export default router;
