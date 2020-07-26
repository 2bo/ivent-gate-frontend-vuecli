import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from './pages/EventList'
import store from './store'
import EventDetail from "./pages/EventDetail";

Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'top', component: EventList},
    {path: '/search', name: 'search', component: EventList},
    //FIXME: change component
    {path: '/event/:id', name: 'event', component: EventList},
    //FIXME: change component
    {path: '/tag/:name', name: 'tag', component: EventList}
];

const router = new VueRouter({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;

        } else {
            return {x: 0, y: 0};
        }
    },
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name === 'search') {
        var types;
        if (to.query.types === null || to.query.types === undefined) {
            types = []
        } else if (Array.isArray(to.query.types)) {
            types = to.query.types.map(Number)
        } else {
            types = [Number(to.query.types)]
        }

        var places;
        if (to.query.places === null || to.query.places === undefined) {
            places = []
        } else if (Array.isArray(to.query.places)) {
            places = to.query.places.map(Number)
        } else {
            places = [Number(to.query.places)]
        }

        var page;
        if (to.query.page === null || to.query.page === undefined) {
            page = 1
        } else {
            page = Number(to.query.page)
        }

        store.commit('setTypes', types);
        store.commit('setPlaces', places);
        store.commit('setKeywords', to.query.keywords);
        store.commit('setPage', Number(page));
        store.dispatch('searchEvents');
    }
    next()
});

export default router
