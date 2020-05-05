<template>
    <div>
        <v-card @click="dialog = true" class="mx-auto">
            <v-card-title v-text="title"></v-card-title>
            <v-card-subtitle v-text="catch_text"></v-card-subtitle>
            <v-card-text>
                <p>{{started_at}}</p>
                <a :href="event_url">詳細</a>
            </v-card-text>
        </v-card>
        <v-dialog v-model="dialog" width="600px">
            <v-card>
                <v-card-title v-text="title"></v-card-title>
                <v-card-text v-html="description"></v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "EventCard",
        props: ['title', 'catch_text', 'started_at', 'event_url', 'description'],
        data: function () {
            return {
                dialog: false
            }
        }
    }
</script>

<style scoped>

</style>