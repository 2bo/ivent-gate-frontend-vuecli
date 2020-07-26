import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import EventList from './pages/EventList'
import EventDetail from "./pages/EventDetail";
import TaggedEventList from "./pages/TaggedEventList"

Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'top', component: EventList},
    {path: '/search', name: 'search', component: EventList},
    {
        path: '/event/:id(\\d+)', name: 'event',
        component: EventDetail,
        props: route => ({id: Number(route.params.id)})
    },
    {path: '/tag/:url_name', name: 'tag', component: TaggedEventList}
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
    if (to.name === 'top' || to.name === 'search') {
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
    if (to.name === 'tag') {
        var tagPage;
        if (to.query.page === null || to.query.page === undefined) {
            tagPage = 1
        } else {
            tagPage = Number(to.query.page)
        }
        store.dispatch('getEventsFromTag', {url_name: to.params.url_name, page: tagPage});
        store.commit('setPage', Number(tagPage));
    }
    next()
});

export default router
