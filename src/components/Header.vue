<template>
    <header>
        <div class="header-row">
            <div class="header-logo">
                <h1>Ivent Gate</h1>
            </div>
            <div class="header-form">
                <form action="/search" method="POST">
                    <div class="search-conditions">
                        <select class="header-input sc-place" name="place">
                            <option v-for="place in places" :key="place.id" :value="place.id">
                                {{place.name}}
                            </option>
                        </select>
                        <select class="header-input sc-type" name="event type">
                            <option v-for="type in types" :key="type.id" :value="type.id">
                                {{type.name}}
                            </option>
                        </select>
                        <input class="header-input sc-keyword" placeholder="キーワード" type="text">
                        <input type="submit">
                    </div>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
    import axios from "axios"

    export default {
        name: "Header",
        data: function () {
            return {
                places: [],
                types: []
            }
        },
        methods: {
            getPlaceConditions: async function () {
                //FIXME: fix url for production
                const response = await axios.get('http://localhost:10080/api/condition/place');
                this.places = response.data
            },
            getEventTypeConditions: async function () {
                //FIXME: fix url for production
                const response = await axios.get('http://localhost:10080/api/condition/type');
                this.types = response.data
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