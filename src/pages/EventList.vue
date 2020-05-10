<template>
    <div>
        <AppHeader @search="onSearch"></AppHeader>
        <v-content>
            <v-container>
                <v-row justify="center">
                    <v-col cols="7" v-for="event in events" :key="event.id">
                        <EventCard :title="event.title"
                                   :catch_text="event.catch"
                                   :started_at="event.started_at"
                                   :event_url="event.event_url"
                                   :description="event.description">

                        </EventCard>
                    </v-col>
                    <v-col cols="8">
                        <v-container class="max-width">
                            <v-pagination
                                    v-model="current_page"
                                    :length="last_page"
                                    @input="searchEvents"
                            ></v-pagination>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import axios from "axios";
    import AppHeader from '../components/AppHeader';
    import EventCard from '../components/EventCard'


    export default {
        name: 'EventList',

        components: {
            AppHeader,
            EventCard
        },

        data: () => ({
            events: [],
            current_page: 1,
            last_page: 0
        }),
        props: ['p', 't', 'k'],
        methods: {
            onSearch: function (params) {
                this.places = params.places;
                this.types = params.types;
                this.keywords = params.keywords;
                this.current_page = 1;
                this.searchEvents()
            },
            searchEvents: async function () {
                const response = await axios.get('/events/search', {
                    params: {
                        places: this.places,
                        types: this.types,
                        keywords: this.keywords,
                        page: this.current_page
                    }
                });

                this.events = response.data.data;
                this.current_page = response.data.current_page;
                this.last_page = response.data.last_page;

                this.$router.push({
                    path: 'search', query: {
                        places: this.places,
                        types: this.types,
                        keywords: this.keywords,
                        page: this.current_page
                    }
                })
            }
        },
        watch: {
            '$route': function (to, from) {
                console.log(`画面遷移前のpath：${from}`);
                console.log(`画面遷移後のpath：${to}`);
                console.log(this.p);
                console.log(this.t);
                console.log(this.k);
            }
        },
    };
</script>
