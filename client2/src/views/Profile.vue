<template>
    <div class='container'>
      <NavigationBar></NavigationBar>
      <ProfileHeader></ProfileHeader>
    </div>
</template>

<script>
import NavigationBar from '@/components/UI/NavigationBar.vue';
import ProfileHeader from '@/components/UI/ProfileHeader.vue';

export default {
  name: 'profile',
  components: {
    ProfileHeader,
    NavigationBar,
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
.profile-border
{
  border: 1px solid black;
  width: 75%;
}

</style>
