<template>
    <div class='container'>
      <img src="../../assets/shuffleLogo.png">
      <div class='row justify-content-center mt-3'>
          <!-- <button class='btn btn-sq-lg btn-primary'>
            <font-awesome-icon class="fa-3x" icon="coffee" />
            <br>Testing
          </button> -->
          <SelectionButton btnText="Applicant" btnIcon="ShuffleIcon.png" to='RegisterApplicant'></SelectionButton>
          <SelectionButton btnText="Employer" btnIcon="shuffleLogo.png" to='RegisterEmployer'></SelectionButton>
      </div>
      <div class='row justify-content-center mt-3'>
        <button @click="loginRoute" class="btn btn-primary">Return to Login</button>
      </div>
    </div>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService';
import SelectionButton from '../UI/SelectionButton';

export default {
  name: 'Register',
  components: {
    SelectionButton,
  },
  methods: {
    loginRoute() {
      this.$router.push({
        path: '/',
      });
    },
  },
  data() {
    return {
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
