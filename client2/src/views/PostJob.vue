<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <h3>Post Job</h3>
        <div class='row mt-3'>
            <div class='container form-container'>
                <form autocomplete="off" enctype="multipart/form-data">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="title" class="float-left">Job Title</label>
                            <input v-model="title" type="title" class="form-control" id="title" placeholder="Enter Job Title" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="salary" class="float-left">Salary</label>
                            <input v-model="salary" type="salary" class="form-control" id="salary" placeholder="Enter Salary" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="location" class="float-left">Location</label>
                            <input v-model="location" type="location" class="form-control" id="location" placeholder="Enter Location" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="coverLetter" class="float-left">Cover Letter</label>
                            <select class='form-control' v-model="coverLetter" type="coverLetter" id="coverLetter" required>
                                <option value="" disabled selected>Enter Selection</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="description" class="float-left">Description</label>
                        <textarea rows="7" cols="100" v-model="description" type="description" id="description" class="form-control" placeholder="Write your job description here..." required>
                        </textarea>
                    </div>
                </form>
            </div>
            <div class='container' style="margin-top:30px">
                <button @click="returnHome" class="btn btn-primary">Return Home</button>
                <button @click="postJob" class="btn btn-primary">Post Job</button>
            </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from '@/components/UI/NavigationBar'

export default {
  name: 'post-job',
  components: {
    'NavigationBar': NavigationBar, 
  },
  methods: {
      returnHome: function() {
          this.$router.push({
              path: '/dashboard'
          })
      },
      postJob: async function() {
        const formData = new FormData();
        const formFields = {
                title: this.title,
                salary: this.salary,
                location: this.location,
                coverLetter: this.coverLetter,
                description: this.description
            };
        
        Object.entries(formFields).forEach(([key,value]) => {formData.append(key, value);});
        
        this.$router.push({
            path: '/dashboard'
        })
        console.log(response.data);
      },
  },
  data () {
    return {
        title: '',
        salary: '',
        location: '',
        coverLetter: '',
        description: '',
    }
  }
}
</script>

<style scoped>
.form-container
{
  width: 70%;
}
</style>