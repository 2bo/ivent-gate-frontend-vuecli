<template>
    <v-content>
        <v-row justify="center">
            <v-col cols="8">
                <v-card v-if="Object.keys(event).length > 0">
                    <v-card-title>{{event.title}}</v-card-title>
                    <v-card-subtitle v-if="event.catch">{{event.catch}}</v-card-subtitle>
                    <v-card-text>
                        <p class="subtitle-1 black--text">
                            <v-icon color="orange" midium left>{{icon.time}}</v-icon>
                            {{display_date}}
                        </p>
                        <p class="subtitle-1 black--text">
                            <v-icon color="green" left>{{icon.address}}</v-icon>
                            {{display_place}}
                        </p>
                        <p class="subtitle-1 black--text">
                            <v-icon color="pink" left>{{icon.people}}</v-icon>
                            {{display_participants}}
                        </p>
                        <v-chip v-for="tag in event.tags" :key="tag.id"
                                class="mr-2 mb-2 caption"
                                color="blue lighten-5"
                                text-color="blue lighten-2"
                                label
                                :to="{ name: 'tag', params:{ url_name: tag.url_name }}"
                                outlined>
                            <v-icon left>{{icon.tag}}</v-icon>
                            {{tag.name}}
                        </v-chip>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="description" v-html="event.description"></div>
                    </v-card-text>
                    <v-card-text>
                        <v-btn block :href=event.event_url color="orange" target="_blank" dark>
                            参加申し込み(情報提供元サイトへ)
                            <v-icon right>{{icon.openInNew}}</v-icon>
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
    import eventsApi from '../api/EventsApi'
    import {mdiLabel, mdiClockOutline, mdiMapMarker, mdiAccountMultiple, mdiOpenInNew} from '@mdi/js'

    export default {
        name: "EventDetail",
        props: {
            id: Number,
        },
        data: function () {
            return {
                event: {},
                icon: {
                    tag: mdiLabel,
                    time: mdiClockOutline,
                    address: mdiMapMarker,
                    people: mdiAccountMultiple,
                    openInNew: mdiOpenInNew
                }
            }
        },
        created() {
            this.getEvent()
        },
        methods: {
            getEvent: async function () {
                const response = await eventsApi.showEvent(this.id);
                this.event = response.data
            },
            toDate: function (dateString) {
                return new Date(dateString.replace(/-/g, "/"))
            }
        },
        computed: {
            //開催日時 example: 5/27(水)
            date: function () {
                const date = this.toDate(this.event.started_at);
                const daysOfWeeks = ["日", "月", "火", "水", "木", "金", "土"];
                return `${date.getMonth() + 1}/${date.getDate()}(${daysOfWeeks[date.getDay()]})`
            },
            //開始時間 example: 19:00
            start_time: function () {
                const date = this.toDate(this.event.started_at);
                return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`
            },
            //終了時間 example: 22:00
            end_time: function () {
                const date = this.toDate(this.event.ended_at);
                return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`
            },
            //タグの配列
            tag_list: function () {
                if (this.event.tags == null) {
                    return []
                }
                return this.tags.split(',')
            },
            //example 5/27(水) 19:00-22:00
            display_date: function () {
                return this.date + ' ' + this.start_time + '〜' + this.end_time
            },
            //開催住所 場所 example:東京都品川区 カンファレンスルーム
            display_place: function () {
                const address = this.event.address == null ? '' : this.event.address;
                const place = this.event.place == null ? '' : this.event.place;
                //値が同じ場合は片方のみ
                if (address === place) {
                    return address
                } else {
                    return address + ' ' + place
                }
            },
            //参加者数/上限(キャンセル待ち) example: 30/30(5)
            display_participants: function () {
                const participants = this.event.participants == null ? '?' : this.event.participants;
                const limit = this.event.limit == null ? '?' : this.event.limit;
                const waiting = this.event.waiting == null ? '?' : this.event.waiting;
                return '参加者: ' + participants + '/' + limit + ' ' + 'キャンセル待ち: ' + waiting;
            }
        }
    }
</script>

<style scoped lang="scss">
    h1 {
        margin-bottom: 20pt;
    }

    .description {
        font-size: 11pt;

        ::v-deep h1 {
            font-size: 14pt;
            margin: 20pt 0 20pt 0;
            color: #444;
        }

        ::v-deep h2 {
            font-size: 13pt;
            margin: 15pt 0 15pt 0;
            color: #444;
        }

        ::v-deep h3 {
            font-size: 12pt;
            margin: 10pt 0 10pt 0;
            color: #444;
        }


        ::v-deep img {
            max-width: 100%;
        }

        ::v-deep hr {
            margin-bottom: 16pt;
        }


        ::v-deep table {
            border: 1px solid #ddd;
            border-collapse: collapse;
            border-spacing: 0;

            th {
                background-color: #eee;
                border: 1px solid #ddd;
                padding: 6pt;
            }

            td {
                border: 1px solid #ddd;
                padding: 6pt;
            }
        }

        ::v-deep strong {
            color: #444;
        }

    }

</style>

