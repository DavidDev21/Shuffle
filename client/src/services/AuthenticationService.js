import api from '@/services/api'

export default {
    registerUser: function (credentials) {
        // api() = creates an axios object
        // executes a post method to endpoint 'register'
        // with data of credentials
        return api().post('register', credentials);
    },

    loginUser: function (credentials) {
        return api().post('login', credentials)
    }
}

