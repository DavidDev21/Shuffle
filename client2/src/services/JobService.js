import api from '@/services/api'

export default {
    // Fetches a job from the server
    getJob: function () {
        // api() = creates an axios object
        // executes a post method to endpoint 'register'
        // with data of credentials
        return api().post('getJob');
    },
}

