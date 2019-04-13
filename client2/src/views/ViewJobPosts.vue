<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <div class='row justify-content-center'>
            <h3>Job Postings</h3>
        </div>

        <div class='row justify-content-center'>
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                    <th scope="col">Job ID</th>
                    <th scope="col">Job Title</th>
                    <th scope="col">Location</th>
                    <th scope="col">Cover Letter?</th>
                    <th scope="col">Total Number of Applicants</th>
                    <th scope="col">Status</th>
                    <th scope="col">Posted At</th>
                    <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr scope="row" v-for="job in this.jobs" v-bind:key="job.job_id">
                    <td>{{job.job_id}}</td>
                    <td>{{job.title}}</td>
                    <td>{{job.location}}</td>
                    <td v-if='job.requireCoverLetter === true'>Yes</td>
                    <td v-if='job.requireCoverLetter === false'>No</td>
                    <td>{{job.numTotalApplicants}}</td>
                    <td>{{job.status}}</td>
                    <td>{{job.createdAt}}</td>
                    <td>
                        <button @click="manageJob(job)" class="btn btn-primary">Manage</button>
                        <button v-if="job.status === 'closed'" @click="changeJobStatus(job.job_id, 'open')" class="btn btn-success">Reopen Job</button>
                        <button v-if="job.status === 'open'" @click="changeJobStatus(job.job_id, 'closed')" class="btn btn-danger">Close Job</button>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
// @ = src
import NavigationBar from '@/components/UI/NavigationBar';
// import JobCard from '@/components/UI/JobCard';
import EmployerService from '@/services/EmployerService';

export default {
  name: 'view-applicant',
  components: {
    // JobCard,
    NavigationBar,
  },
  // Future: put file upload related methods into another file
  methods: {
      async getJobPostings()
      {
          try
          {
            const response = await EmployerService.getJobPostings({
                email: this.$store.getters.userData.email
            });

            this.jobs = response.data;
            console.log(this.jobs);
          }
          catch(err)
          {
            console.log(err);
          }
      },
      async changeJobStatus(job_id, status)
      {
          try
          {
              const response = await EmployerService.changeJobStatus({
                  job_id: job_id,
                  status: status
              });

              this.getJobPostings();
          }
          catch(err)
          {
              console.log(err);
          }
      },
      async manageJob(job)
      {

      }
  },
  mounted() {
      console.log('I am mounted: View Applicant');
      this.getJobPostings();
  },
  data() {
    return {
        job_id: null,
        applicant: null,
        f_name: null,
        l_name: null,
        grad_year: null,
        profileImg: null,
        major: null,
        bio: null,
        AppliedOn: null,
        coverLetter: null,
        resume: null,
        jobs: null,
        showUpdateForm: false
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.applicant-card
{
    border: black 1px solid;
    width: 75%;
}
.applicant-image
{
    width: 100%;
    height: auto;
}

.card-left
{
    border-right: black 1px solid;
}

.card-body
{
    font-size: small;
}

.applicant-header
{
    border-bottom: grey .5px solid;
}

.header-tagline
{
    color: grey;
    font-size: small;
}
</style>
