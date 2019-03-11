<template>
    <!-- could v-bind mess up media queries?-->
    <button @click='goTo' v-bind:class="[styleClass]">
        <img class="icon" v-bind:src="require('@/assets/' + btnIcon)"/>
        <!--<font-awesome-icon class='fa-3x' v-bind:icon="btnIcon" /> -->
        <br><h3>{{btnText}}</h3>
    </button>
</template>

<script>
export default {
  name: 'SelectionButton',
  methods: {
    goTo() {
      this.$router.push({
        path: this.to,
      });
    },
  },
  props: {
    btnText: { default: 'default' },
    btnIcon: { default: 'logo.png' },
    styleClass: { default: '' },
    to: { default: '/' },
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon
{
    width:100px;
    height:100px;
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
@media screen and (min-width : 800px) {
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
