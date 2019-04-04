<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <h3>Welcome to your dashboard, {{name}}</h3>
        <h4>Account Type: {{userType}}</h4>
        <div v-if="userType === 'applicant'">
          <div class='row'>
              <div class='col-12'>
                  <SelectionButton class="btn-sq-big btn-light btn ml-3" btnIcon='/assets/job_search_icon.png' btnText='Apply To Job' to='/apply-job'></SelectionButton>
                  <SelectionButton class="btn-sq-big btn-light btn ml-3"></SelectionButton>
              </div>
          </div>
          <div class='row mt-2'>
              <div class='col-12'>
                  <SelectionButton class="btn-sq-big btn-light btn ml-3"></SelectionButton>
                  <SelectionButton class="btn-sq-big btn-light btn ml-3"></SelectionButton>
              </div>
          </div>
        </div>
        <div v-if="userType === 'employer'">
          <div class='row'>
              <div class='col-12'>
                  <SelectionButton class="btn-sq-big btn-light btn ml-3" btnIcon='/assets/job_search_icon.png' btnText='Post Job' to='/apply-job'></SelectionButton>
                  <SelectionButton class="btn-sq-big btn-light btn ml-3" btnText='Manage Applicants'></SelectionButton>
              </div>
          </div>
          <div class='row mt-2'>
              <div class='col-12'>
                  <SelectionButton class="btn-sq-big btn-light btn ml-3" btnIcon='/assets/job_manage_icon.png' btnText='Manage Jobs' to='/manage-job'></SelectionButton>
                  <SelectionButton class="btn-sq-big btn-light btn ml-3"></SelectionButton>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from '@/components/UI/NavigationBar';
import SelectionButton from '@/components/UI/SelectionButton';

export default {
  name: 'dashboard',
  components: {
    NavigationBar,
    SelectionButton,
  },
  mounted() {
    console.log("Dashboard: mounted")
  //   // console.log(this.$store.getters.userType);
    this.userType = this.$store.getters.userType;
    this.userData = this.$store.getters.userData;

    if(this.userType === 'applicant')
    {
      this.name = this.userData.f_name;
    }
    else if(this.userType === 'employer')
    {
      this.name = this.userData.company_name;
    }
  },
  data() {
    return {
      userType: null,
      userData: null,
      name: null
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Desktops and laptops ----------- medium */
@media screen and (min-width: 600px) {
  .btn-sq-big{
      padding: 0;
      width: 300px !important;
      height: 300px !important;
  }
};

/* Large screens ----------- large */
@media (min-width : 900px) {
  .btn-sq-big{
      padding: 0;
      width: 450px !important;
      height: 450px !important;
  }
};
</style>
