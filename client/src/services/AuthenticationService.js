import api from '@/services/api'

export default {
    register (credentials) {
        // api() = creates an axios object
        // executes a post method to endpoint 'register'
        // with data of credentials
        return api().post('register', credentials)
    }
}

