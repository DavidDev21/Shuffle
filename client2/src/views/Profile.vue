<template>
    <div class='container'>
      <NavigationBar></NavigationBar>
      <div class='row justify-content-center'>
        <!-- Profile Header (left sidebar)-->
        <div class='col-4 profile-border'>
          <ProfileHeader></ProfileHeader>
        </div>

        <!-- Profile Body (right sidebar)-->
        <div class='col-8'>
        </div>
      </div>
    </div>
</template>

<script>
import NavigationBar from '@/components/UI/NavigationBar.vue'
import ProfileHeader from '@/components/UI/ProfileHeader.vue'

export default {
  name: 'profile',
  components: {
    'ProfileHeader': ProfileHeader,
    'NavigationBar': NavigationBar
  },
  methods: {
      loginRoute: function() {
          this.$router.push({
              path: '/'
          });
      }
  },
  data () {
    return {
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile-border
{
  border: 1px solid black;
  width: 75%;
}

</style>
