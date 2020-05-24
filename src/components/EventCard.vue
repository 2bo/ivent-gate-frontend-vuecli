<template>
    <div>
        <v-card @click="dialog = true" class="mx-auto">
            <v-card-title class="blue--text">
                <span>{{title}}</span>
            </v-card-title>
            <v-card-subtitle v-text="catch_text"></v-card-subtitle>
            <v-card-text>
                <div> <v-icon left>{{timeIcon}}</v-icon>
                    <span>{{display_date}}</span>
                    <v-icon left class="ml-4">{{peopleIcon}}</v-icon>
                    <span>{{display_participants}}</span>
                </div>
                <div>
                    <v-icon left>{{addressIcon}}</v-icon>
                    <span v-text="display_place"></span>
                </div>
                <v-chip class="mr-2 mt-4 mb-2" color="teal lighten-5" text-color="teal lighten-2" label
                        v-for="tag in tag_list"
                        :key="tag">
                    <v-icon left>{{tagIcon}}</v-icon>
                    {{tag}}
                </v-chip>
                <div class="ma-1"><img class="logo" :src="logo_image" alt=""></div>
            </v-card-text>
        </v-card>
        <v-dialog v-model="dialog" width="600px">
            <v-card>
                <v-card-title><a :href="event_url" target="_blank">{{title}}</a></v-card-title>
                <v-card-text v-html="description"></v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {mdiLabel, mdiClockOutline, mdiMapMarker, mdiAccountMultiple} from '@mdi/js'

    export default {

        name: "EventCard",
        props: [
            'title',
            'site_name',
            'catch_text',
            'address',
            'place',
            'started_at',
            'ended_at',
            'event_url',
            'description',
            'limit',
            'participants',
            'waiting',
            'tags'
        ],
        data: function () {
            return {
                dialog: false,
                tagIcon: mdiLabel,
                timeIcon: mdiClockOutline,
                addressIcon: mdiMapMarker,
                peopleIcon: mdiAccountMultiple
            }
        },
        computed: {
            date: function () {
                const date = new Date(this.started_at);
                const daysOfWeeks = ["日", "月", "火", "水", "木", "金", "土"];
                return `${date.getMonth() + 1}/${date.getDate()}(${daysOfWeeks[date.getDay()]})`
            },
            start_time: function () {
                const date = new Date(this.started_at);
                return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`
            },
            end_time: function () {
                const date = new Date(this.ended_at);
                return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`
            },
            tag_list: function () {
                if (this.tags == null) {
                    return null
                }
                return this.tags.split(',')
            },
            display_date: function () {
                return this.date + ' ' + this.start_time + '-' + this.end_time
            },
            display_place: function () {
                if (this.address === this.place) {
                    return this.address
                } else {
                    return this.address + ' ' + this.place
                }
            },
            display_participants: function () {
                const participants = this.participants == null ? '?' : this.participants;
                const limit = this.limit == null ? '?' : this.limit;
                const waiting = this.waiting == null ? '?' : this.waiting;
                return participants + '/' + limit + '(' + waiting + ')'
            },
            logo_image: function () {
                if (this.site_name === 'doorkeeper.jp'){
                    return require('@/assets/doorkeeper-logo.png')
                }
                if (this.site_name === 'connpass.com'){
                    return require('@/assets/connpass-logo.png')
                }
                return null
            }
        }
    }
</script>
<style scoped>
    .logo {
        height: 12px;
    }
</style>