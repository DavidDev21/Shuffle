<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <h3>Post Job</h3>
        <div class='row mt-3'>
            <div class='container form-container'>
                <form autocomplete="off" enctype="multipart/form-data">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="title" class="float-left required">Job Title</label>
                            <input v-model="title" type="text" class="form-control" id="title" placeholder="Enter Job Title" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="salary" class="float-left required">Salary</label>
                            <input v-model="salary" type="number" class="form-control" id="salary" placeholder="Enter Salary" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="location" class="float-left required">Location</label>
                            <input v-model="location" type="text" class="form-control" id="location" placeholder="Enter Location" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="coverLetter" class="float-left required">Cover Letter?</label>
                            <select class='form-control' v-model="coverLetter" type="text" id="coverLetter" required>
                                <option value="" disabled selected>Enter Selection</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="description" class="float-left required">Description</label>
                        <textarea rows="7" cols="100" v-model="description" type="text" id="description" class="form-control" placeholder="Write your job description here..." required>
                        </textarea>
                    </div>
                </form>
            </div>
            <div class='container' style="margin-top:30px">
                <button @click="returnHome" class="btn btn-primary mr-3">Return Home</button>
                <button @click="postJob" class="btn btn-primary">Post Job</button>
            </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from '@/components/UI/NavigationBar'
import JobService from '@/services/JobService.js'

export default {
  name: 'post-job',
  components: {
    'NavigationBar': NavigationBar, 
  },
  methods: {
      // checks if all the required fields are filled
      checkRequiredFields: function() {
        const formFields = {
            title: this.title,
            salary: this.salary,
            location: this.location,
            coverLetter: this.coverLetter,
            description: this.description,
        }

        const entries = Object.values(formFields);

        for(let i = 0; i< entries.length; i++)
        {
            if(entries[i] === null)
            {
                return false;
            }
        }
        return true;
      },
      returnHome: function() {
          this.$router.push({
              path: '/dashboard'
          })
      },
      postJob: async function() {

        if(this.checkRequiredFields() === false)
        {
            alert('All required fields must be filled');
            return;
        }
        try
        {
            console.log(this.title);
            console.log(this.salary);
            console.log(this.location);
            console.log(this.coverLetter);
            console.log(this.description);
            const userData = this.$store.getters.userData;

            const response = await JobService.postJob({
                employer: userData.email,
                title: this.title,
                salary: this.salary,
                location: this.location,
                coverLetter: this.coverLetter,
                description: this.description,
            });
        }
        catch(err)
        {
            console.log(err);
        }

        this.$router.push({
            path: '/dashboard'
        })
      },
  },
  mounted() {
        this.title = null;
        this.salary = null;
        this.location = null;
        this.coverLetter = null;
        this.description = null;
  },
  data () {
    return {
        title: null,
        salary: null,
        location: null,
        coverLetter: null,
        description: null,
    }
  }
}
</script>

<style scoped>
.form-container
{
  width: 70%;
}
.required::after
{
    color: #e32;
    content: ' *';
    display:inline;
}
</style>