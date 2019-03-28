<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <div class='header'>
            Here is your application status, {{userType}}
        </div>
    </div>
</template>

<script>
import NavigationBar from '../UI/NavigationBar'

export default {
  name: 'ApplicationStatus',
  components: {
    'NavigationBar': NavigationBar
  },
  props: ['userType'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.header{
    font-size: 800px;
}
</style>