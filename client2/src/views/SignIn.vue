<template>
    <div class='container'>
      <img src="@/assets/shuffleLogo.png">
      <div class='row mt-3'>
        <div class='container' id='form-container'>
          <form>
            <div class="form-group">
              <label for="InputEmail" class="float-left">Email address</label>
              <input v-model="email" type="email" class="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="InputPassword" class="float-left">Password</label>
              <input v-model="password" type="password" class="form-control" id="userPassword" placeholder="Password">
            </div>
            <!-- <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div> -->
            <button type='button' @click='authenticateUser' class="btn btn-primary">Login</button>
            <button type='button' @click='registerRoute' class="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';

export default {
  name: 'sign-in',
  mounted() {
    // Clear out state
    this.$store.dispatch('resetState');
  },
  methods: {
    registerRoute() {
      this.$router.push({
        path: 'register',
      });
    },
    async authenticateUser() {
      try {
        const response = await AuthenticationService.loginUser({
          email: this.email,
          password: this.password,
        });
        let userData = {...response.data};
        delete userData.userType;
        console.log(userData);
        console.log(response.data);
        this.$store.dispatch('changeUserData', userData);
        this.$store.dispatch('changeUserType', response.data.userType);
        console.log('No errors');
        console.log(response);
        
        // response.data
        // if success, then push userType to dashboard component
        this.$router.push({
          name: 'dashboard'
        });
      } catch (error) {
        // error.response.data = accessing data that was passed by the backend as part of the error object
        console.log(error.response);
        alert(error.response.data);
      }
    },
  },
  data() {
    return {
      email: '',
      password: '',
      newUser: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#form-container
{
  width: 70%;
}
</style>
