<template>
    <div class='container'>
        <div class='row justify-content-center'>
          <img class="profileImg" v-bind:src="profileImg" alt="No Profile IMG"/>
          <div class='text-left justify-content-center'>
            <h3>{{name}}</h3>
            <div class='text-uppercase header-tagline'>
              <p>{{tagline}}</p>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProfileHeader',
  props: {
    profileImg: { default: '' },
    name: { default: 'Test Name' },
    tagline: { default: 'This is a tagline' },
  },
  methods: {
    async getJob() {
      try {
        const response = await JobService.getJob();
        this.img_path = response.data.img_path;
        this.jobTitle = response.data.jobTitle;
      } catch (error) {
        // error.response.data = accessing data that was passed by the backend as part of the error object
        console.log(error.response);
      }
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
.header-tagline
{
    color: grey;
    font-size: small;
}
.profileImg
{
  width:100%;
}
</style>
