<template>
    <v-app>
        <AppHeader @search="onSearch"></AppHeader>
        <v-content>
            <HelloWorld/>
        </v-content>
    </v-app>
</template>

<script>
    import axios from "axios";
    import AppHeader from './components/AppHeader';

    export default {
        name: 'App',

        components: {
            AppHeader,
        },

        data: () => ({
            events: [],
            places: [],
            types: [],
            keywords: "",
            current_page: 1,
            last_page: 0
        }),

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
            }
        }
    };
</script>
