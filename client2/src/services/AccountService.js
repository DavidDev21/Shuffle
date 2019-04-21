import api from '@/services/api';

export default {
  sendResetEmail(email) {
    // api() = creates an axios object
    // executes a post method to endpoint 'register'
    // with data of credentials
    return api().post('sendResetEmail', email);
  },
  changePassword(password) {
    return api().post('change-password', password);  
  }
};
