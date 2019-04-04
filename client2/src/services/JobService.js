import api from '@/services/api';

export default {
  // Fetches a job from the server
  getJob() {
    // api() = creates an axios object
    // executes a post method to endpoint 'register'
    // with data of credentials
    return api().post('get-job');
  },
  applyJob(userInfo) {
    return api().post('apply-job', userInfo);
  }
};
