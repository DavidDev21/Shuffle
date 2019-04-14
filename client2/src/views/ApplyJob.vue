<template>
    <div class='container'>
        <NavigationBar></NavigationBar>

        <div class='container'>
            <h3>Search Filter</h3>
            <div class='row justify-content-center'>
              <div class='col-6'>
                <label class='mr-1' for="searchLocation">By Location:</label>
                <input type='text' placeholder="enter location">
              </div>
            </div>
        </div>
        <!-- Job Card -->
        <div class='container mt-2'>
            <div class='row justify-content-center'>
                <div class='row job-card' id='draggable'>
                    <div class='card-left d-flex align-items-center justify-content-center col-4'>
                        <img class='job-image' v-bind:src="img_path" alt='Some Img' />
                    </div>
                    <div class='card-body col-8 text-left'>
                        <div class='job-header'>
                            <h3>{{company_name}} - {{title}}</h3>
                            <div class='text-uppercase header-tagline'>
                                <p>Location: {{location}}</p>
                            </div>
                            <div class='header-tagline'>
                                <p>Posted On: {{postedAt}}</p>
                            </div>
                        </div>
                        <div class='mt-3 job-description'>
                            <p>{{description}}</p>
                        </div>
                        <div class='mt-3 header-tagline'>
                            <p>Compensation: ${{salary}}</p>
                        </div>
                        <div class='mt-3 job-footer'>
                            <p>Requires Cover Letter: 
                                <strong v-if="requireCoverLetter === true">Yes</strong>
                                <strong v-if="requireCoverLetter === false">No</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        <!-- End of Job Card-->
        <form class='mt-3' v-if="requireCoverLetter === true">
          <div class='form-row justify-content-center'>
            <label for="file-upload" class="mr-3">Upload Cover Letter (PDF only) </label>
            <div class="form-group">
                <input id="file-upload" class="" type="file" ref="file" @change="selectFile"/>
            </div>
          </div>
        </form>

        <div class='row mt-3 justify-content-center'>
            <button class='btn btn-primary mr-3' @click='getJob'>&#60;&#60;&#60; View Next Job</button>
            <button class='btn btn-primary' @click='applyJob'>Apply To Job &#62;&#62;&#62;</button>
        </div>
    </div>
</template>

<script>
// @ = src
import NavigationBar from '@/components/UI/NavigationBar';
// import JobCard from '@/components/UI/JobCard';
import JobService from '@/services/JobService';

export default {
  name: 'apply-job',
  components: {
    // JobCard,
    NavigationBar,
  },
  // Future: put file upload related methods into another file
  methods: {
    validFileType(fileName, allowedExt) {
      const fileExt = fileName.slice(fileName.lastIndexOf('.'));
      console.log(fileExt);

      for (let i = 0; i < allowedExt.length; i++) {
        console.log(allowedExt[i]);
        if (fileExt === allowedExt[i]) {
          return true;
        }
      }
      return false;
    },
    selectFile() {
      // console.log(this.validFileType(this.$refs.file.files[0].name, [".pdf", ".doc", ".docx"]));

      const allowedExt = ['.pdf'];
      const fileName = this.$refs.file.files[0].name;

      if (this.validFileType(fileName, allowedExt) == true) {
        this.file = this.$refs.file.files[0];
        console.log(this.file);
      } else {
        document.getElementById('file-upload').value = '';
        const fileExt = fileName.slice(fileName.lastIndexOf('.'));
        alert(`The file extension ${fileExt} is not allowed`);
      }
    },
    async getJob() {
      try {

        const email = this.$store.getters.userData.email;
        console.log(email)
        // Backend sends a 404 if there are no jobs on database  
        const response = await JobService.getJob({
          email: email
        });
        this.job_id = response.data.job_id;
        this.title = response.data.title;
        this.description = response.data.description;
        this.salary = response.data.salary;
        this.location = response.data.location;
        this.requireCoverLetter = response.data.requireCoverLetter;
        this.img_path = response.data.profileImg;
        this.company_name = response.data.company_name;
        this.postedAt = response.data.postedat;
      } catch (error) {
        // error.response.data = accessing data that was passed by the backend as part of the error object
        console.log(error.response);
        alert(error.response.data);
        this.$router.push({
          name: 'dashboard',
        });
      }
    },
    async applyJob() {
      if (this.requireCoverLetter === true && this.file === undefined) {
        alert("Please upload your cover letter before applying");
        return;
      }

      try {
        const userData = this.$store.getters.userData;
        const formData = new FormData();

        Object.entries(userData).forEach(([key, value]) => { formData.append(key, value); });

        formData.append('job_id', this.job_id);
        formData.append('documentType', 'coverLetter');

        formData.append('coverLetter', this.file);
        
        const response = await JobService.applyJob(formData);
      }
      catch(err) {
        console.log(err);
      }

      this.file = undefined
      this.getJob();
      return;
    },
  },
  mounted() {
    console.log('hello');
    this.getJob();
  },
  data() {
    return {
      img_path: '',
      job_id: 0,
      title: '',
      salary: 0,
      location: '',
      requireCoverLetter: false,
      description: '',
      company_name: '',
      postedAt: '',
      file: undefined,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.job-card
{
    border: black 1px solid;
    width: 75%;
}
.job-image
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

.job-header
{
    border-bottom: grey .5px solid;
}

.job-qualification
{
}

.header-tagline
{
    color: grey;
    font-size: small;
}
</style>
