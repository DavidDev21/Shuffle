<template>
    <button @click='goTo' class='btn btn-sq-lg btn-light ml-3'>
        <img class="icon" v-bind:src="require('../../assets/' + btnIcon)"/>
        <!--<font-awesome-icon class='fa-3x' v-bind:icon="btnIcon" /> -->
        <br><h3>{{btnText}}</h3>
    </button>
</template>

<script>
export default {
  name: 'SelectionButton',
  methods: {
      goTo: function() {
          this.$router.push({
              path: this.to
          })
      }
  },
  props: {
      btnText: {default: 'default'}, 
      btnIcon: {default: 'logo.png'}, 
      to: {default: '/'}
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon
{
    width:100px;
    height:100px;
}
/* Small */
@media only screen and (max-width : 540px) {
    .btn-sq-lg{
        padding: 0;
        width: 150px !important;
        height: 150px !important;
    }
};
/* Desktops and laptops ----------- medium */
@media only screen and (min-width : 541px) {
    .btn-sq-lg{
        padding: 0;
        width: 300px !important;
        height: 300px !important;
    }
};

/* Large screens ----------- large */
@media only screen and (min-width : 1824px) {
    .btn-sq-lg{
        padding: 0;
        width: 450px !important;
        height: 450px !important;
    }
};
</style>
