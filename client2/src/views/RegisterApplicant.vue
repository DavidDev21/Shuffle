<template>
    <div class='container'>
      <img src="@/assets/shuffleLogo.png">
      <div class='row mt-3'>
        <div class='container form-container'>
          <form autocomplete="off" enctype="multipart/form-data">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userEmail" class="float-left">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="userPassword" class="float-left">Password</label>
                    <input autocomplete="new-password" v-model="password" type="password" class="form-control" id="userPassword" placeholder="Password" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userFName" class="float-left">First Name</label>
                    <input v-model="fName" type="text" class="form-control" id="userFName" placeholder="First Name" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="userLName" class="float-left">Last Name</label>
                    <input v-model="lName" type="text" class="form-control" id="userLName" placeholder="Last Name" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userMajor" class="float-left">Major</label>
                    <input v-model="major" type="text" class="form-control" id="userMajor" placeholder="Major" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="userGraduation" class="float-left">Expected Year of Graduation</label>
                    <input v-model="gradYear" type="date" class="form-control" id="userGraduation" required>
                </div>
            </div>

            <div class="form-row">
                <label for="file-upload" class="float-left">Upload Resume (PDF, DOCX only) </label>
                <div class="form-group col-12">
                    <input class="float-left" type="file" ref="file" @change="selectFile"/>
                </div>
            </div>
          </form>
        </div>

        <div class='container'>
            <button @click="loginRoute" class="btn btn-primary">Return to Login</button>
            <button @click="registerUser" class="btn btn-primary">Create account</button>
        </div>
      </div>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'register-applicant',
  methods: {
      loginRoute: function() {
          this.$router.push({
              path: '/'
          })
      },
      registerUser: async function() {
        const formData = new FormData();
        const formFields = {
                email: this.email,
                password: this.password,
                fName: this.fName,
                lName: this.lName,
                major: this.major,
                gradYear: this.gradYear,
                userType: 'applicant',
                documentType: this.documentType
            };
        
        Object.entries(formFields).forEach(([key,value]) => {formData.append(key, value);});
        
        formData.append("file", this.file);
        const response = await AuthenticationService.registerUser(formData);
        // note to self: try to pass params to SignIn component to detect a newly created a account
        this.$router.push({
            path: '/',
            props: {
                
            }
        })
        console.log(response.data);
      },
      validFileType: function(fileName, allowedExt)
      {
          let fileExt = fileName.slice(fileName.lastIndexOf("."));
          console.log(fileExt);

          for(let i = 0; i < allowedExt.length; i++)
          {
              console.log(allowedExt[i]);
              if(fileExt === allowedExt[i])
              {
                  return true;
              }
          }
          return false;
      },
      selectFile: function(){
          console.log(this.validFileType(this.$refs.file.files[0].name, [".pdf", ".doc", ".docx"]));

          this.file = this.$refs.file.files[0];
          console.log(this.file);
          this.documentType = 'resume';
      },
  },
  data () {
    return {
        email: '',
        password: '',
        fName: '',
        lName: '',
        major: '',
        gradYear: '',
        file: 'N/A',
        documentType: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-container
{
  width: 70%;
}
</style>
