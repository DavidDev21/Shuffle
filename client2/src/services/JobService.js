import api from '@/services/api';

export default {
  // Fetches a job from the server
  getJob(userEmail) {
    // api() = creates an axios object
    // executes a post method to endpoint 'register'
    // with data of credentials
    return api().post('get-job',userEmail);
  },
  applyJob(userInfo) {
    return api().post('apply-job', userInfo);
  },
  postJob(jobInfo) {
    return api().post('post-job', jobInfo);
  }
};
