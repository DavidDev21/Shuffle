<template>
    <div class='container'>
      <img src="../../assets/shuffleLogo.png">
      <div class='row justify-content-center mt-3'>
          <!-- <button class='btn btn-sq-lg btn-primary'>
            <font-awesome-icon class="fa-3x" icon="coffee" />
            <br>Testing
          </button> --> 
          <SelectionButton btnText="Applicant" btnIcon="ShuffleIcon.png"></SelectionButton>
          <SelectionButton btnText="Employer" btnIcon="shuffleLogo.png"></SelectionButton>
      </div>
      <div class='row justify-content-center mt-3'>
        <button @click="loginRoute" class="btn btn-primary">Return to Login</button>
      </div>
    </div>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService'
import SelectionButton from '../UI/SelectionButton'

export default {
  name: 'Register',
  components: {
    'SelectionButton': SelectionButton
  },
  methods: {
      loginRoute: function() {
          this.$router.push({
              path: 'SignIn'
          })
      },
      applicantRoute: function() {
          // note to self: try to pass params to SignIn component to detect a newly created a account
          this.$router.push({
              path: 'RegisterApplicant',
          })
      },
      employerRoute: function() {
          this.$router.push({
              path: 'RegisterEmployer'
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
.form-container
{
  width: 70%;
}

/* Small */
@media only screen and (max-width : 540px) {
    .btn-sq-lg{
        width: 150px !important;
        height: 150px !important;
    }
};
/* Desktops and laptops ----------- medium */
@media only screen and (min-width : 541px) {
    .btn-sq-lg{
        width: 300px !important;
        height: 300px !important;
    }
};

/* Large screens ----------- large */
@media only screen and (min-width : 1824px) {
    .btn-sq-lg{
        width: 500px !important;
        height: 500px !important;
    }
};
</style>
