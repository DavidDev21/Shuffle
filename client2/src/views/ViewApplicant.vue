<template>
    <div class='container'>
        <NavigationBar></NavigationBar>

        <!-- select a job id -->
        <div v-if='showApplicant === false'>
            <div class='row justify-content-center'>
                <h3>Please select the job you would like to review</h3>
            </div>

            <div class='row justify-content-center'>
                <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">Job ID</th>
                        <th scope="col">Job Title</th>
                        <th scope="col">Location</th>
                        <th scope="col">Cover Letter?</th>
                        <th scope="col">Number of Active Applicants</th>
                        <th scope="col">Posted At</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr scope="row" v-for="job in this.jobs" v-bind:key="job.job_id">
                        <td>{{job.job_id}}</td>
                        <td><a href='javascript:;' @click='setJobID(job.job_id, job.numActiveApplicants)'>{{job.title}}</a></td>
                        <td>{{job.location}}</td>
                        <td v-if='job.requireCoverLetter === true'>Yes</td>
                        <td v-if='job.requireCoverLetter === false'>No</td>
                        <td>{{job.numActiveApplicants}}</td>
                        <td>{{job.createdAt}}</td>
                        </tr>
                    </tbody>
                </table>
                 <h5 v-if="this.jobs === undefined || this.jobs.length === 0">No jobs have been posted</h5>
            </div>
        </div>

        <!-- appliant stuff -->
        <div v-if='showApplicant === true'>
            <div class='row justify-content-center'>
                <h3>Job ID: {{job_id}}</h3>
            </div>

            <div class='row justify-content-center col-12'>
                <!-- Applicant Card -->
            <div class='container mt-2'>
                <div class='row justify-content-center'>
                    <div class='row applicant-card' id='draggable'>
                        <div class='card-left d-flex align-items-center justify-content-center col-4'>
                            <img class='applicant-image' v-bind:src="profileImg" alt='Some Img' />
                        </div>
                        <div class='card-body col-8 text-left'>
                            <div class='applicant-header'>
                                <h3>{{f_name}}, {{l_name}}</h3>
                                <div class='text-uppercase header-tagline'>
                                    <p>Major: {{major}}</p>
                                </div>
                                <div class='header-tagline'>
                                    <p>Graduation Date: {{grad_year}}</p>
                                </div>
                            </div>
                            <div class='mt-3 applicant-description'>
                                <p>{{bio}}</p>
                            </div>
                            <div class='mt-3 header-tagline'>
                                <p>Applied On: {{AppliedOn}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <!-- Applicant Docs -->
            <div class='row justify-content-center col-12 mt-2'>
                <div class='container'>
                    <div class='row justify-content-center'>
                        <label class='col-12' v-if='coverLetter'><strong>Cover Letter</strong></label>
                        <div class='container col-12' id='coverletter' v-if='coverLetter'>
                            <embed width="900px" height="540px" v-bind:src="coverLetter" />
                        </div>
                    </div>
                    <div class='row justify-content-center mt-3'>
                        <label class='col-12' v-if='resume'><strong>Resume</strong></label>
                        <div class='container col-12' id='resume' v-if='resume'>
                            <embed width="900px" height="540px" v-bind:src="resume" />
                        </div>
                    </div>
                </div>
            </div>

            <div class='row mt-3 justify-content-center'>
                <button class='btn btn-primary mr-3' @click="updateApplicationStatus('rejected')">&#60;&#60;&#60; Reject</button>
                <button class='btn btn-primary' @click="updateApplicationStatus('accepted')">Accept &#62;&#62;&#62;</button>
            </div>
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
      async setJobID(jobID, numActiveApplicants)
      {
          if(numActiveApplicants <= 0)
          {
              alert('There are no active applications for this job');
              return;
          }
          this.job_id = jobID;
          this.showApplicant = true;
          this.getApplicant();
      },
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
      async getApplicant()
      {
          try
          {
            const response = await EmployerService.getApplicant({job_id: this.job_id});
            console.log(response);
            console.log(this['grad_year']);

            Object.entries(response.data).forEach(([key,value]) => {this[key] = value});
            console.log(this.resume)
          }
          catch(err)
          {
            console.log(err.response);
            alert(err.response.data);
            this.$router.push({
                name: 'dashboard',
            });
          }
      },
      async updateApplicationStatus(status)
      {
          console.log(status);
          try
          {
            const response = await EmployerService.updateApplicationStatus({
                status: status,
                applicant: this.applicant,
                job_id: this.job_id
                });

            this.getApplicant();
            return;
          }
          catch(err)
          {
            console.log(err);
          }
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
        showApplicant: false
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
