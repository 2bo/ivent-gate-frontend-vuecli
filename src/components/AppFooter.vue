<template>
    <v-footer>
        <v-row justify="center" no-gutters>
            <v-btn small
                   v-for="link in links"
                   :key="link.link_name"
                   color="black"
                   text
                   rounded
                   class="my-2"
                   :to="{ name: link.link_name}"
            >
                {{ link.name }}
            </v-btn>
        </v-row>
    </v-footer>
</template>

<script>
    export default {
        data: () => ({
            links: [
                {link_name: 'about', name: 'Event Eagleとは'},
                {link_name: 'terms', name: '利用規約'},
                {link_name: 'request', name: 'リクエスト・バグ報告'},
            ],
        }),
    }
</script>
