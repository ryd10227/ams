import Login from '../views/LOG/LOG1000.vue';
import FPW from '../views/FPW/FPW1000.vue';
import MainFrame from '../views/MFR/MFR1000.vue';
import Dashboard from '../views/HOM/HOM1000.vue';
import List from '../views/LST/LST1000.vue';
import Add from '../views/ADD/ADD1000.vue';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login',
        name: 'RootRouter'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/fpw',
        component: FPW
    },
    {
        path: '/main',
        component: MainFrame,
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'list',
                component: List,
            },
            {
                path: 'add',
                component: Add,
            }
        ]
    },
]

export default routes;