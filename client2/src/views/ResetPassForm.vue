<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <h3>Reset Password</h3>
        <h4>Please enter your email for the reset password link</h4>
        <label style="margin-top:30px" for="userPassword">Email: </label>
        <input class='required' style="width: 300px;" v-model="email" type="email" id="userEmail" required>
        <div class='container' style="margin-top:30px">
          <button @click="returnHome" class="btn btn-primary">Return Home</button>
          <button @click="resetPassword" class="btn btn-primary">Reset Password</button>
        </div>
    </div>
</template>

<script>
import AccountService from '@/services/AccountService'
import NavigationBar from '@/components/UI/NavigationBar'
export default {
  name: 'ResetPassForm',
  components: {
    'NavigationBar': NavigationBar, 
  },
  methods: {
    returnHome: function() {
      this.$router.push({
        path: '/dashboard'
      })
    },
    resetPassword: async function() {
      try{
          const response = await AccountService.sendResetEmail({
              email: this.email
          });

          alert('Reset link sent to email');
        this.$router.push({
            path: '/dashboard'
        });
      }
      catch(error)
      {
          console.log(error.data);
          alert(error.data);
      }     
    },
  },
  data () {
    return {
      email: ''
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