import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from './pages/EventList'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: EventList
    },
    {
        path: '/search',
        component: EventList,
        props: (route) => ({
            p: route.query.places,
            t: route.query.types,
            k: route.query.keywords
        })
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router
