<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <h3>Password Change</h3>
        <label style="margin-top:30px" for="userPassword">Please enter new password:</label>
        <input style="width: 300px;" v-model="password" type="password" id="userPassword" required>
        <div class='container' style="margin-top:30px">
          <button @click="returnHome" class="btn btn-primary">Return Home</button>
          <button @click="accept" class="btn btn-primary">Accept</button>
        </div>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import NavigationBar from '@/components/UI/NavigationBar'

export default {
  name: 'passwordChange',
  components: {
    'NavigationBar': NavigationBar, 
  },
  methods: {
    returnHome: function() {
      this.$router.push({
              path: '/dashboard'
      })
    },
    accept: async function() {
      const formData = new FormData();
      const formFields = {
        password: this.password,
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