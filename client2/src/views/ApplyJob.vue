<template>
    <div class='container'>
        <NavigationBar></NavigationBar>

        <JobCard ref='JobCard'></JobCard>
        <form class='mt-3'>
          <div class='form-row justify-content-center'>
            <label for="file-upload" class="mr-3">Upload Cover Letter (PDF, DOCX only) </label>
            <div class="form-group">
                <input id="file-upload" class="" type="file" ref="file" @change="selectFile"/>
            </div>
          </div>
        </form>
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
    applyJob() {
      this.$refs.JobCard.applyJob();
    }
  },
  mounted() {
    console.log('hello');
    this.$refs.JobCard.getJob();
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
