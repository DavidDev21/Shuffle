<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <h3>Password Change</h3>
        <label style="margin-top:30px" for="userPassword">Please enter new password:</label>
        <input style="width: 300px;" v-model="password" type="password" id="userPassword" required>
        <div class='container' style="margin-top:30px">
          <button @click="returnHome" class="btn btn-primary mr-3">Return Home</button>
          <button @click="changePassword" class="btn btn-primary">Change Password</button>
        </div>
    </div>
</template>

<script>
import AccountService from '@/services/AccountService'
import NavigationBar from '@/components/UI/NavigationBar'
export default {
  name: 'change-password',
  components: {
    'NavigationBar': NavigationBar, 
  },
  methods: {
    returnHome: function() {
      this.$router.push({
            path: '/'
      })
    },
    changePassword: async function() {
      try
      {
        if(this.password.length <= 0)
        {
          alert('Please fill in the required field');
          return;
        }
        console.log(this.$route.params);
        const response = await AccountService.changePassword({
            email: this.$route.params.email,
            password: this.password
        });

        alert('New password is now set');

        this.$router.push({
            path: '/'
        });
        console.log(response.data);
      }   
      catch(error)
      {
            console.log(error);
        //   console.log(this.password);
          alert(error.data);
      }     
    },
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