<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <h3>Password Change</h3>
        <label style="margin-top:30px" for="userPassword">Please enter current password:</label>
        <input style="width: 300px;" v-model="password" type="password" id="userPassword" required>
        <div class='container' style="margin-top:30px">
          <button @click="returnHome" class="btn btn-primary">Return Home</button>
          <button @click="verifyUser" class="btn btn-primary">Verify</button>
        </div>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import NavigationBar from '@/components/UI/NavigationBar'

export default {
  name: 'passwordChangeVerify',
  components: {
    'NavigationBar': NavigationBar, 
  },
  methods: {
    returnHome: function() {
      this.$router.push({
        path: '/dashboard'
      })
    },
    verifyUser: async function(){
      try {
        const response = await AuthenticationService.loginUser({
          email: this.email,
          password: this.password
        });
        console.log('No errors');
        console.log(response);
        // response.data
        // if success, then push userType to dashboard component
        this.$router.push({
          path: '/password-change'
        });
      }
      catch(error)
      {
        // error.response.data = accessing data that was passed by the backend as part of the error object
        console.log(error.response);
      }

    }
  },
  data () {
    return {
      password: ''
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