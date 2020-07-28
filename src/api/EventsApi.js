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
    },
    async showEvent($id) {
        return await axios.get('/events/' + $id)
    },
    async getEventsFromTag(tagUrlName, page) {
        return await axios.get('/events/tag/' + tagUrlName, {
            params: {
                page: page
            }
        })
    }
}
