<template>
    <div class='container'>
        <NavigationBar></NavigationBar>

        <JobCard ref='JobCard'></JobCard>
        <div class='row mt-3 justify-content-center'>
            <button class='btn btn-primary mr-3' @click='fetchJob'>&#60;&#60;&#60; View Next Job</button>
            <button class='btn btn-primary' @click='fetchJob'>Apply To Job &#62;&#62;&#62;</button>
        </div>
    </div>
</template>

<script>
// @ = src
import NavigationBar from '@/components/UI/NavigationBar';
import JobCard from '@/components/UI/JobCard';


export default {
  name: 'apply-job',
  components: {
    JobCard,
    NavigationBar,
  },
  methods: {
    fetchJob() {
      this.$refs.JobCard.getJob();
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
</style>
