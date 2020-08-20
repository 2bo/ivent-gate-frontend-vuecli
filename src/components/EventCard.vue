<template>
    <div>
        <v-card class="mx-auto">
            <v-card-title>
                <router-link class="black--text" :to="{ name: 'event', params:{ id: id }}">
                    {{title}}
                </router-link>
            </v-card-title>
            <v-card-subtitle v-text="catch_text"></v-card-subtitle>
            <v-card-text>
                <div>
                    <v-icon color="orange" left>{{timeIcon}}</v-icon>
                    <span>{{display_date}}</span>
                    <v-icon color="pink" left class="ml-4">{{peopleIcon}}</v-icon>
                    <span>{{display_participants}}</span>
                </div>
                <div>
                    <v-icon color="green" left>{{addressIcon}}</v-icon>
                    <span v-text="display_place"></span>
                </div>
                <v-card-actions>
                    <v-chip v-for="tag in tags" :key="tag.id"
                            class="mr-2 mt-4 mb-2 caption"
                            color="blue lighten-5"
                            text-color="blue lighten-2"
                            label
                            :to="{ name: 'tag', params:{ url_name: tag.url_name }}"
                            outlined>
                        <v-icon left>{{tagIcon}}</v-icon>
                        {{tag.name}}
                    </v-chip>
                </v-card-actions>
                <div v-if="logo_image != null" class="ma-1">
                    <img class="logo" :src="logo_image" :alt="site_name">
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import {mdiLabel, mdiClockOutline, mdiMapMarker, mdiAccountMultiple} from '@mdi/js'

    export default {

        name: "EventCard",
        props: [
            'id',
            'title',
            'site_name',
            'catch_text',
            'address',
            'place',
            'started_at',
            'ended_at',
            'event_url',
            'limit',
            'participants',
            'waiting',
            'tags'
        ],
        data: function () {
            return {
                tagIcon: mdiLabel,
                timeIcon: mdiClockOutline,
                addressIcon: mdiMapMarker,
                peopleIcon: mdiAccountMultiple
            }
        },
        computed: {
            //開催日時 example: 5/27(水)
            date: function () {
                const date = this.toDate(this.started_at);
                const daysOfWeeks = ["日", "月", "火", "水", "木", "金", "土"];
                return `${date.getMonth() + 1}/${date.getDate()}(${daysOfWeeks[date.getDay()]})`
            },
            //開始時間 example: 19:00
            start_time: function () {
                const date = this.toDate(this.started_at);
                return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`
            },
            //終了時間 example: 22:00
            end_time: function () {
                const date = this.toDate(this.ended_at);
                return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`
            },
            //example 5/27(水) 19:00-22:00
            display_date: function () {
                return this.date + ' ' + this.start_time + '-' + this.end_time
            },
            //開催住所 場所 example:東京都品川区 カンファレンスルーム
            display_place: function () {
                const address = this.address == null ? '' : this.address;
                const place = this.place == null ? '' : this.place;
                //値が同じ場合は片方のみ
                if (address === place) {
                    return address
                } else {
                    return address + ' ' + place
                }
            },
            //参加者数/上限(キャンセル待ち) example: 30/30(5)
            display_participants: function () {
                const participants = this.participants == null ? '?' : this.participants;
                const limit = this.limit == null ? '?' : this.limit;
                const waiting = this.waiting == null ? '?' : this.waiting;
                return participants + '/' + limit + '(' + waiting + ')'
            },
            //情報取得元のロゴファイル
            logo_image: function () {
                if (this.site_name === 'doorkeeper.jp') {
                    return require('@/assets/doorkeeper-logo.png')
                }
                if (this.site_name === 'connpass.com') {
                    return require('@/assets/connpass-logo.png')
                }
                return null
            }
        },
        methods: {
            toDate(dateString) {
                console.log(dateString);
                //safariが-区切りだとエラーになるため置換
                return new Date(dateString.replace(/-/g, "/"));
            }
        }
    }
</script>
<style scoped>
    .logo {
        height: 12px;
    }

    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>