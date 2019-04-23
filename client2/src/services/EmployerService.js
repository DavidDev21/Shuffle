import api from '@/services/api';

export default {
  getApplicant(job_id) {
    // api() = creates an axios object
    // executes a post method to endpoint 'register'
    // with data of credentials
    return api().post('get-applicant', job_id);
  },
  updateApplicationStatus(status)
  {
    return api().post('change-app-status', status);
  },
  getJobPostings(employer)
  {
    return api().post('get-job-postings', employer);
  },
  changeJobStatus(job)
  {
    return api().post('change-job-status', job);
  },
  updateJobPost(job)
  {
    return api().post('update-job', job);
  },
  getProfile(UserEmail){
    return api().post('get-profile',UserEmail);
  },
  updateProfile(email){
    return api().post('update-employer-profile',email);
  }
};
