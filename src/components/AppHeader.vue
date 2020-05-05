<template>
    <v-app-bar color="bluegray" app>
        <v-toolbar-title><span class="title mr-5">Ivent Gate</span></v-toolbar-title>
        <v-select
                v-model="places"
                :items="placeOptions"
                hide-details
                label="場所"
                multiple
                :prepend-inner-icon=mapIcon
                cache-items
                clearable
                class="d-none d-sm-flex shrink"
        >
        </v-select>
        <v-select
                v-model="types"
                :items="typeOptions"
                hide-details
                label="タイプ"
                multiple
                :prepend-inner-icon=typeIcon
                cache-items
                clearable
                class="d-none d-sm-flex shrink"
        >
        </v-select>
        <v-text-field
                v-model.trim="keywords"
                @keydown.enter="searchEvents"
                flat
                hide-details
                autofocus
                clearable
                label="keyword"
                class="shrink"
        />
        <v-btn
                @click="searchEvents"
                outlined
                color="primary"
                class="d-none d-sm-flex"
        >
            <v-icon>{{ searchIcon }}</v-icon>

        </v-btn>
    </v-app-bar>
</template>

<script>
    import axios from "axios"
    import {mdiMagnify} from '@mdi/js'
    import {mdiMap} from '@mdi/js'
    import {mdiPresentation} from '@mdi/js'

    export default {
        name: "Header",
        data: function () {
            return {
                placeOptions: [],
                typeOptions: [],
                places: [],
                types: [],
                keywords: "",
                searchIcon: mdiMagnify,
                mapIcon: mdiMap,
                typeIcon: mdiPresentation
            }
        },
        methods: {
            getPlaceConditions: async function () {
                const response = await axios.get('/condition/place');
                this.placeOptions = response.data
            },
            getEventTypeConditions: async function () {
                const response = await axios.get('/condition/type');
                this.typeOptions = response.data
            },
            searchEvents: async function () {
                const response = await axios.get('/events/search', {
                    params: {
                        places: this.places,
                        types: this.types,
                        keywords: this.keywords
                    }
                });
                this.$emit('search', response.data);
            }
        },
        mounted() {
            this.getPlaceConditions();
            this.getEventTypeConditions();
        }
    }
</script>

<style scoped>

</style>