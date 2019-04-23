<template>
    <div class='container'>
        <NavigationBar></NavigationBar>

        <div v-if="showUpdateForm === false">
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
                        <td v-if="job.requireCoverLetter === true">Yes</td>
                        <td v-if="job.requireCoverLetter === false">No</td>
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
                <h5 v-if="this.jobs === undefined || this.jobs.length === 0">No jobs have been posted</h5>
            </div>
        </div>
        
        <div v-if="showUpdateForm === true">
            <div class='row justify-content-center'>
                <h3>Job ID: {{selectJob.job_id}}</h3>
            </div>
            <div class='row justify-content-center'>
                <h3>Title: {{selectJob.title}}</h3>
            </div>
            <div class='row justify-content-center mt-3'>
                <form autocomplete="off" enctype="multipart/form-data">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="location" class="float-left required">Location</label>
                            <input v-model="selectJob.location" type="text" class="form-control" id="location" placeholder="Enter Location" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="salary" class="float-left required">Salary</label>
                            <input v-model="selectJob.salary" min="0" type="number" class="form-control" id="salary" placeholder="Enter Salary" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="coverLetter" class="float-left required">Cover Letter?</label>
                            <select class='form-control' v-model="selectJob.requireCoverLetter" type="text" id="coverLetter" required>
                                <option value="" disabled selected>Enter Selection</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="description" class="float-left required">Description</label>
                        <textarea rows="7" cols="100" v-model="selectJob.description" type="text" id="description" class="form-control" placeholder="Write your job description here..." required>
                        </textarea>
                    </div>
                </form>
            </div>
            
            <div class='row mt-3 justify-content-center'>
                <button @click="toggleUpdateForm" class="btn btn-primary mr-3">Return</button>
                <button @click="updateJob" class="btn btn-primary">Save Changes</button>
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
  name: 'view-job-posts',
  components: {
    // JobCard,
    NavigationBar,
  },
  // Future: put file upload related methods into another file
  methods: {
      toggleUpdateForm()
      {
          this.showUpdateForm = !this.showUpdateForm;
      },
      formValidation()
      {
        const entries = Object.values(this.selectJob);
        for(let i = 0; i< entries.length; i++)
        {
            if(entries[i] === null || entries[i].length === 0)
            {
                return false;
            }
        }
        return true;
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
          this.showUpdateForm = true;
          this.selectJob = job; // holds the job object that was selected
      },
      async updateJob()
      {
          console.log(this.formValidation());
          if(this.formValidation() === false)
          {
              alert("Required Fields must be filled");
              return;
          }
          else if(this.selectJob.salary < 0 || this.selectJob.salary.length === 0)
          {
              alert("Salary can not be negative / empty");
              return;
          }
          
          try
          {
              console.log(this.selectJob);
              const response = await EmployerService.updateJobPost({
                  ...this.selectJob
              });
              console.log("I am back")
              this.showUpdateForm = false;
              this.selectJob = null;
              this.getJobPostings(); //update the table
          }
          catch(err)
          {
              console.log(err);
          }
      }
  },
  mounted() {
      console.log('I am mounted: View Applicant');
      this.showUpdateForm = false;
      this.selectJob = null;
      this.getJobPostings();
  },
  data() {
    return {
        jobs: null,
        selectJob: null,
        showUpdateForm: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.required::after
{
    color: #e32;
    content: ' *';
    display:inline;
}
</style>
