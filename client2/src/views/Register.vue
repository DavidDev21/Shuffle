<template>
    <div class='container'>
      <img src="@/assets/shuffleLogo.png">
      <div class='row justify-content-center mt-3'>
          <!-- <button class='btn btn-sq-lg btn-primary'>
            <font-awesome-icon class="fa-3x" icon="coffee" />
            <br>Testing
          </button> --> 
          <SelectionButton styleClass='btn-sq-big btn-light btn ml-3' btnText="Applicant" btnIcon="ShuffleIcon.png" to='register-applicant'></SelectionButton>
          <SelectionButton styleClass='btn-sq-big btn-light btn ml-3' btnText="Employer" btnIcon="shuffleLogo.png" to='register-employer'></SelectionButton>
      </div>
      <div class='row justify-content-center mt-3'>
        <button @click="loginRoute" class="btn btn-primary">Return to Login</button>
      </div>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import SelectionButton from '@/components/UI/SelectionButton'

export default {
  name: 'register',
  components: {
    'SelectionButton': SelectionButton
  },
  methods: {
      loginRoute: function() {
          this.$router.push({
              path: '/'
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
/* Not sure why Vue is only loading one media query*/
/* @media screen and (min-width: 500px) {
  .btn-sq-big{
    color: red;
    height: 600px !important;
    width: 300px !important;
  }
} */
  .btn-sq-big{
      padding: 0;
      width: 300px !important;
      height: 300px !important;
  }
/* Small */
@media screen and (max-width : 540px) {
  .btn-sq-big{
      padding: 0;
      width: 150px !important;
      height: 150px !important;
  }
};
/* Desktops and laptops ----------- medium */
@media screen and (min-width : 550px) {
  .btn-sq-big{
      padding: 0;
      width: 300px !important;
      height: 300px !important;
  }
};

/* Large screens ----------- large */
@media screen and (min-width : 1824px) {
  .btn-sq-big{
      padding: 0;
      width: 450px !important;
      height: 450px !important;
  }
};
</style>
