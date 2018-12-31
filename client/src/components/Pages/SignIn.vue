<template>
    <div class='container'>
      <img src="../../assets/shuffleLogo.png">
      <div class='row mt-3'>
        <div class='container' id='form-container'>
          <form>
            <div class="form-group">
              <label for="InputEmail" class="float-left">Email address</label>
              <input type="email" class="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="InputPassword" class="float-left">Password</label>
              <input type="password" class="form-control" id="userPassword" placeholder="Password">
            </div>
            <!-- <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div> -->
            <button type="submit" class="btn btn-primary">Login</button>
            <button @click='registerRoute' class="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SignIn',
  methods: {
    registerRoute: function() {
      this.$router.push({
        path: 'Register'
      })
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#form-container
{
  width: 70%;
}
</style>
