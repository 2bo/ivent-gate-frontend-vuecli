import axios from 'axios'

export default {
    async searchEvents(params) {
        return await axios.get('/events/search', {
            params: {
                places: params.places,
                types: params.types,
                keywords: params.keywords,
                page: params.page
            }
        });
    }
}