<template>
    <v-app>
        <AppHeader @search="onSearch"></AppHeader>
        <v-content>
            <HelloWorld/>
        </v-content>
    </v-app>
</template>

<script>
    import HelloWorld from './components/HelloWorld';
    import AppHeader from './components/AppHeader';

    export default {
        name: 'App',

        components: {
            HelloWorld,
            AppHeader,
        },

        data: () => ({
            events: []
        }),

        methods: {
            onSearch(results) {
                this.events = results;
            }
        }
    };
</script>
