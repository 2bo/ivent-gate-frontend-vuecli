<template>
    <div>
        <v-content>
            <v-progress-linear
                    :active="isLoading"
                    :indeterminate="isLoading"
                    :fixed=true
            ></v-progress-linear>
            <v-container>
                <v-row justify="center">
                    <v-col cols="12" sm="12" md="7" lg="7" xl="7" v-for="event in events" :key="event.id">
                        <EventCard
                                :id='event.id'
                                :title="event.title"
                                :site_name="event.site_name"
                                :catch_text="event.catch"
                                :started_at="event.started_at"
                                :address="event.address"
                                :place="event.place"
                                :ended_at="event.ended_at"
                                :event_url="event.event_url"
                                :description="event.description"
                                :limit="event.limit"
                                :participants="event.participants"
                                :waiting="event.waiting"
                                :tags="event.tags"
                        >
                        </EventCard>
                    </v-col>
                    <v-col cols="8">
                        <v-container class="max-width">
                            <v-pagination
                                    v-model="current_page"
                                    :length="last_page"
                                    @input="paging"
                            ></v-pagination>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import EventCard from '../components/EventCard'
    import {mapGetters} from 'vuex'

    export default {
        name: 'EventList',

        components: {
            EventCard
        },
        computed: {
            ...mapGetters({
                events: 'getEvents',
                last_page: 'getLastPage',
                places: 'getPlaces',
                types: 'getTypes',
                keywords: 'getKeywords',
                isLoading: 'isLoading'
            }),
            current_page: {
                get() {
                    return this.$store.getters.getPage
                },
                set(value) {
                    this.$store.commit('setPage', value)
                }
            },
        },
        methods: {
            paging() {
                this.$router.push({
                    name: 'search',
                    query: {places: this.places, types: this.types, keywords: this.keywords, page: this.current_page},
                });
            },
            scrollToTop() {
                window.scrollTo(0, 0);
            }

        },
        watch: {
            current_page: function () {
                this.scrollToTop()
            }
        }
    };
</script>
