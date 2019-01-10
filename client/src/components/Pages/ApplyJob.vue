<template>
    <div class='container'>
        <NavigationBar></NavigationBar>

        <JobCard ref='JobCard'></JobCard>
        <button class='btn btn-primary' @click='fetchJob'>Get Next Job</button>
    </div>
</template>

<script>
import NavigationBar from '../UI/NavigationBar'
import JobCard from '../UI/JobCard'


export default {
  name: 'ApplyJob',
  components: {
      'JobCard': JobCard,
      'NavigationBar': NavigationBar, 
  },
  methods: {
      fetchJob: function() {
          this.$refs.JobCard.getJob()
      }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
