<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <h3>
            Here are the status for your applications, {{user.f_name}}
        </h3>
        <!-- <input type="text" class='search' placeholder='search'>
        <SearchBar hint="Search hint" :text="searchPhrase" @textChange="onTextChanged" @submit="onSubmit" /> -->
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">Job ID</th>
              <th scope="col">Job Title</th>
              <th scope="col">Employer</th>
              <th scope="col">Employer Contact</th>
              <th scope="col">Location</th>
              <th scope="col">Status</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-for="app in this.applications" v-bind:key="app.job_id">
              <td>{{app.job_id}}</td>
              <td>{{app.title}}</td>
              <td>{{app.company_name}}</td>
              <td>{{app.email}}</td>
              <td>{{app.location}}</td>
              <td>{{app.status}}</td>
              <td>
                <button v-if="app.status === 'under_review'" class="btn btn-danger" @click='withdrawApplication(app.job_id)'>Withdraw</button>
                <button v-if="app.status !== 'under_review'" class="btn btn-secondary" disabled>Withdraw</button>
              </td>
            </tr>
            <!-- <tr scope="row">
              <td>Software Engineer</td>
              <td>Some Company</td> 
              <td>555-555-5555</td>
              <td>Somewhere</td>
              <td>Waiting</td>
              <td>asd</td>
            </tr>
            <tr scope="row">
              <td>Software Developer</td>
              <td>Other Company</td> 
              <td>777-777-7777</td>
              <td>Elsewhere</td>
              <td>Accepted</td>
              <td>asd</td>
            </tr> -->
          </tbody>
        </table>
        <h5 v-if="this.applications.length === 0">No active applications</h5>
    </div>
</template>

<script>
import NavigationBar from '@/components/UI/NavigationBar'
import ApplicantService from '@/services/ApplicantService.js'

export default {
  name: 'ApplicationStatus',
  components: {
    'NavigationBar': NavigationBar
  },
  methods: {
    async getAppStatus()
    {
      console.log("I am called")
      try
      {
        const response = await ApplicantService.getApplicationStatus({email: this.user.email});
        console.log(response);

        // response gives back an array of app statuses 
        this.applications = response.data;

      }
      catch(err)
      {
        console.log(err);
      }
    },
    async withdrawApplication(job_id)
    {
      console.log(job_id);
      try
      {
        const response = await ApplicantService.withdrawApplication({
          job_id: job_id,
          applicant: this.user.email
        });

        this.getAppStatus();
      }
      catch(err)
      {
        console.log(err);
      }
    }
  },
  mounted() {
    this.user = this.$store.getters.userData;
    this.getAppStatus();
    console.log(this.user)
  },
  data () {
    return {
      user: null,
      applications: null,
    };
  }
}
</script>

<style scoped>
/* .container{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header{
  font-size: 35px;
} */
/* table, th, td{
  border: 1px solid black;
}
table{
  width: 100%;
}
th{
  background-color: lightGray;
} */
</style>