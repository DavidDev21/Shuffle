<template>
    <div class='container'>
      <img src="@/assets/shuffleLogo.png">
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
                    <label for="companyName" class="float-left">Company Name</label>
                    <input v-model="companyName" type="text" class="form-control" id="companyName" placeholder="Company Name">
                </div>
                <div class="form-group col-md-6">
                    <label for="yearFound" class="float-left">Year Founded</label>
                    <input v-model="yearFound" type="date" class="form-control" id="yearFound">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-12">
                    <label for="companyDescription" class="float-left">Company Description</label>
                    <textarea v-model="companyDescription" class="form-control" id="companyDescription" placeholder="Enter company description"></textarea>
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
  name: 'register-employer',
  methods: {
    loginRoute() {
      this.$router.push({
        path: '/',
      });
    },
    async registerUser() {
      const response = await AuthenticationService.registerUser({
        email: this.email,
        password: this.password,
        companyName: this.companyName,
        companyDescription: this.companyDescription,
        yearFound: this.yearFound,
        userType: 'employer',
      });
      // note to self: try to pass params to SignIn component to detect a newly created a account
      this.$router.push({
        path: '/',
        props: {

        },
      });
      console.log(response.data);
    },
  },
  data() {
    return {
      email: '',
      password: '',
      companyName: '',
      companyDescription: '',
      yearFound: '',
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
</style>
