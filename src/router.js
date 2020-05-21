import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from './pages/EventList'
import store from './store'

Vue.use(VueRouter);

const routes = [
    {path: '/', component: EventList},
    {path: '/search', component: EventList}
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.path === '/search') {
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
        store.dispatch('pagingEvents');
    }
    next()
});

export default router
