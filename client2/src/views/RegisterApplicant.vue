<template>
    <div class='container'>
      <img src="@/assets/shuffleLogo.png">
      <div class='row mt-3'>
        <div class='container form-container'>
          <form autocomplete="off" enctype="multipart/form-data">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userEmail" class="float-left required">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="userPassword" class="float-left required">Password</label>
                    <input autocomplete="new-password" v-model="password" type="password" class="form-control" id="userPassword" placeholder="Password" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userFName" class="float-left required">First Name</label>
                    <input v-model="fName" type="text" class="form-control" id="userFName" placeholder="First Name" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="userLName" class="float-left required">Last Name</label>
                    <input v-model="lName" type="text" class="form-control" id="userLName" placeholder="Last Name" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userMajor" class="float-left required">Major</label>
                    <input v-model="major" type="text" class="form-control" id="userMajor" placeholder="Major" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="userGraduation" class="float-left required">Expected Year of Graduation</label>
                    <input v-model="gradYear" type="date" class="form-control" id="userGraduation" required>
                </div>
            </div>

            <div class="form-row">
                <label for="file-upload" class="float-left">Upload Resume (PDF, DOCX only)</label>
                <div class="form-group col-12">
                    <input id="file-upload" class="float-left" type="file" ref="file" @change="selectFile"/>
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
import AuthenticationService from '@/services/AuthenticationService';

export default {
  name: 'register-applicant',
  methods: {
    loginRoute() {
      this.$router.push({
        path: '/',
      });
    },
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

      const allowedExt = ['.pdf', '.doc', '.docx'];
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
    formValidation(formObject) {
      const fieldValues = Object.values(formObject);
      for (let i = 0; i < fieldValues.length; i++) {
        if (fieldValues[i] === '') {
          return false;
        }
      }
      return true;
    },
    async registerUser() {
      const formData = new FormData();
      const formFields = {
        email: this.email,
        password: this.password,
        fName: this.fName,
        lName: this.lName,
        major: this.major,
        gradYear: this.gradYear,
        userType: 'applicant',
        documentType: this.documentType,
      };
      if (this.formValidation(formFields) === false) {
        alert('Please fill in the required fields');
      } else {
        Object.entries(formFields).forEach(([key, value]) => { formData.append(key, value); });

        formData.append('file', this.file);
        const response = await AuthenticationService.registerUser(formData);
        // note to self: try to pass params to SignIn component to detect a newly created a account
        this.$router.push({
          path: '/',
          props: {

          },
        });
        console.log(response.data);
      }
    },
  },
  data() {
    return {
      email: '',
      password: '',
      fName: '',
      lName: '',
      major: '',
      gradYear: '',
      file: '',
      documentType: 'resume',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
