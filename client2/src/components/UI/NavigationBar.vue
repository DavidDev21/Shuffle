<template>
    <nav class="navbar navbar-expand-sm justify-content-between navbar-light bg-light fixed-top">
        <router-link class="navbar-brand" to="dashboard">
            <img src="@/assets/shuffleLogo.png" height="30" class="d-inline-block align-top" alt="Shuffle">
        </router-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <div class="navbar-nav ml-auto justify-content-end">
              <router-link class="nav-item nav-link" to="/profile">Profile</router-link>
              <router-link class="nav-item nav-link" to="/">Logout</router-link>
          </div>
        </b-collapse>
    </nav>
</template>

<script>

// links will be array of links that you can navigate to
// note: thinking about making accesslevel to be a number
// 0 = access to all users, 1 = applicant, 2 = employers, 3= recuriters, 4 = admin
// accessLevel should be used to restrict certain links or actions
export default {
  name: 'NavigationBar',
  data() {
    return {
      links: [
        {
          id: 0,
          route: 'home',
          accessLevel: 'all',
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
