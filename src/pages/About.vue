<template>
    <div>
        <v-content>
            <v-container>
                <v-row justify="center">
                    <v-col cols="12" sm="12" md="10" lg="10" xl="10">
                        <v-card>
                            <v-card-title>Event Eagleとは</v-card-title>
                            <v-card-text>
                                Event Eagleはエンジニアのための勉強会検索サービスです。<br>
                                エンジニアが手軽く・素早く勉強会を検索できるようにすることで、エンジニアやコミニティに貢献することを目指しています。<br>
                                もちろんエンジニア以外の方もご利用いただけます。<br>
                                <br>
                                <h3>検索機能</h3>
                                勉強会をフリーワード、場所、タイプから検索することができます。
                                <li>フリーワードはスペース区切りで複数指定することができます。</li>
                                <li>場所は都道府県だけでなく、オンラインを指定することができます。</li>
                                <li>タイプはもくもく会、LT会、ハンズオンなど勉強会の形態を指定することができます。</li>
                                <br>
                                <h3>勉強会情報の取得元について</h3>
                                以下のサイトから情報を取得をしています。
                                <li>https://connpass.com/</li>
                                <li>https://www.doorkeeper.jp/</li>
                                <br>
                                <h3>注意事項</h3>
                                <li>タイプ、タグは勉強会のタイトルや説明文から自動的に判定しています。そのため、勉強会の実態とは異なる可能性があります。</li>
                                <li>掲載情報が情報取得元の最新情報に比べて古い可能性があります。</li>
                                <br>
                                <h3>その他</h3>
                                勉強会の開催場所を判定するため<a href="http://geoapi.heartrails.com" target="_blank">HeartRails
                                Geo API</a>を利用しています。
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </div>
</template>
