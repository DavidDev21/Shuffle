import api from '@/services/api';

export default {
  getApplicationStatus(email) {
    // api() = creates an axios object
    // executes a post method to endpoint 'register'
    // with data of credentials
    return api().post('check-app-status', email);
  },
};
