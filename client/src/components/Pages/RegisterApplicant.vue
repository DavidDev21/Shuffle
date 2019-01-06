<template>
    <div class='container'>
      <img src="../../assets/shuffleLogo.png">
      <div class='row mt-3'>
        <div class='container form-container'>
          <form autocomplete="off">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userEmail" class="float-left">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group col-md-6">
                    <label for="userPassword" class="float-left">Password</label>
                    <input autocomplete="new-password" v-model="password" type="password" class="form-control" id="userPassword" placeholder="Password">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userFName" class="float-left">First Name</label>
                    <input v-model="fName" type="text" class="form-control" id="userFName" placeholder="First Name">
                </div>
                <div class="form-group col-md-6">
                    <label for="userLName" class="float-left">Last Name</label>
                    <input v-model="lName" type="text" class="form-control" id="userLName" placeholder="Last Name">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userMajor" class="float-left">Major</label>
                    <input v-model="major" type="text" class="form-control" id="userMajor" placeholder="Major">
                </div>
                <div class="form-group col-md-6">
                    <label for="userGraduation" class="float-left">Expected Year of Graduation</label>
                    <input v-model="gradYear" type="date" class="form-control" id="userGraduation">
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
import AuthenticationService from '../../services/AuthenticationService'

export default {
  name: 'RegisterApplicant',
  methods: {
      loginRoute: function() {
          this.$router.push({
              path: '/'
          })
      },
      registerUser: async function() {
          const response = await AuthenticationService.registerUser({
            email: this.email,
            password: this.password,
            fName: this.fName,
            lName: this.lName,
            major: this.major,
            gradYear: this.gradYear,
            userType: 'applicant'
          });
          // note to self: try to pass params to SignIn component to detect a newly created a account
          this.$router.push({
              path: '/',
              props: {
                  
              }
          })
          console.log(response.data);
      }
  },
  data () {
    return {
        email: '',
        password: '',
        fName: '',
        lName: '',
        major: '',
        gradYear: ''
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
