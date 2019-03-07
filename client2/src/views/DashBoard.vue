<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <h3>Welcome to your dashboard, {{userType}}</h3>
        <div class='row'>
            <div class='col-12'>
                <SelectionButton class="btn-sq-big btn-light btn ml-3" btnText='Apply To Job' to='/apply-job'></SelectionButton>
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
</template>

<script>
import NavigationBar from '@/components/UI/NavigationBar'
import SelectionButton from '@/components/UI/SelectionButton'

export default {
  name: 'dashboard',
  components: {
    'NavigationBar': NavigationBar, 
    'SelectionButton': SelectionButton
  },
  props: ['userType'],
  data () {
    return {
    }
  }
}
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
