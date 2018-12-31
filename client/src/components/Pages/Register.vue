<template>
    <div class='container'>
      <img src="../../assets/shuffleLogo.png">
      <div class='row mt-3'>
        <div class='container' id='form-container'>
          <form>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userEmail" class="float-left">Email address</label>
                    <input type="email" class="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group col-md-6">
                    <label for="userPassword" class="float-left">Password</label>
                    <input type="password" class="form-control" id="userPassword" placeholder="Password">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userFName" class="float-left">First Name</label>
                    <input type="text" class="form-control" id="userFName" placeholder="First Name">
                </div>
                <div class="form-group col-md-6">
                    <label for="userLName" class="float-left">Last Name</label>
                    <input type="text" class="form-control" id="userLName" placeholder="Last Name">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userMajor" class="float-left">Major</label>
                    <input type="text" class="form-control" id="userMajor" placeholder="Major">
                </div>
                <div class="form-group col-md-6">
                    <label for="userGraduation" class="float-left">Expected Year of Graduation</label>
                    <input type="date" class="form-control" id="userGraduation" placeholder="Major">
                </div>
            </div>
            <!-- <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div> -->
            <button @click="loginRoute" class="btn btn-primary">Return to Login</button>
            <button type="submit" class="btn btn-primary">Create account</button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Register',
  methods: {
      loginRoute: function() {
          this.$router.push({
              path: 'SignIn'
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
