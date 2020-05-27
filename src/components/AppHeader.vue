<template>
    <v-app-bar color="blue" dark app>
        <v-toolbar-title class="mr-4">Ivent Gate</v-toolbar-title>
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
                @keydown.enter="search"
                flat
                hide-details
                autofocus
                clearable
                label="keyword"
                class="shrink"
        />
        <v-btn
                @click="search"
                outlined
                class="d-none d-sm-flex"
        >
            <v-icon>{{ searchIcon }}</v-icon>

        </v-btn>
    </v-app-bar>
</template>

<script>
    import axios from "axios"
    import {mdiMagnify, mdiMap, mdiPresentation} from '@mdi/js'

    export default {
        name: "Header",
        data: function () {
            return {
                placeOptions: [],
                typeOptions: [],
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
            search() {
                this.$router.push({
                    name: 'search',
                    query: {places: this.places, types: this.types, keywords: this.keywords,}
                })
            }
        },
        computed: {
            places: {
                get() {
                    return this.$store.getters.getPlaces
                },
                set(value) {
                    this.$store.commit('setPlaces', value)
                }
            },
            types: {
                get() {
                    return this.$store.getters.getTypes
                },
                set(value) {
                    this.$store.commit('setTypes', value)
                }
            },
            keywords: {
                get() {
                    return this.$store.getters.getKeywords
                },
                set(value) {
                    this.$store.commit('setKeywords', value)
                }
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