module.exports = {
    "devServer": {
        "port": 9050,
        "host": "0.0.0.0",
        "disableHostCheck": true
    },
    "transpileDependencies": [
        "vuetify"
    ],
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'Event Eagle',
        }
    }
};