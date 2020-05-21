import Vue from 'vue'
import Vuex from 'vuex'
import eventsApi from './api/EventsApi'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        types: [],
        places: [],
        keywords: "",
        page: 1,
        last_page: null,
        events: [],
        isLoading: false
    },
    mutations: {
        setTypes(state, types) {
            if (Array.isArray(types)) {
                state.types = types
            }
        },
        setPlaces(state, places) {
            if (Array.isArray(places)) {
                state.places = places
            }
        },
        setKeywords(state, keywords) {
            state.keywords = keywords
        },
        setPage(state, page) {
            if (!Number.isNaN(page)) {
                state.page = page
            }
        },
        setLastPage(state, lastPage) {
            if (!Number.isNaN(lastPage)) {
                state.last_page = lastPage
            }
        },
        setEvents(state, events) {
            state.events = events
        },
        setLoading(state, isLoading) {
            state.isLoading = isLoading
        }
    },
    getters: {
        getTypes(state) {
            return state.types
        },
        getPlaces(state) {
            return state.places
        },
        getKeywords(state) {
            return state.keywords
        },
        getPage(state) {
            return state.page
        },
        getLastPage(state) {
            return state.last_page
        },
        getEvents(state) {
            return state.events
        },
        isLoading(state) {
            return state.isLoading
        }
    },
    actions: {
        async searchEvents({commit, getters}) {
            commit('setLoading', true);
            const params = {
                places: getters.getPlaces,
                types: getters.getTypes,
                keywords: getters.getKeywords,
                page: 1
            };
            const response = await eventsApi.searchEvents(params);
            commit('setPage', 1);
            commit('setEvents', response.data.data);
            commit('setLastPage', response.data.last_page);
            commit('setLoading', false);

        },
        async pagingEvents({commit, getters}) {
            commit('setLoading', true);
            const params = {
                places: getters.getPlaces,
                types: getters.getTypes,
                keywords: getters.getKeywords,
                page: getters.getPage
            };
            const response = await eventsApi.searchEvents(params);
            commit('setEvents', response.data.data);
            commit('setLastPage', response.data.last_page);
            commit('setLoading', false);
        }
    }
});

export default store;
