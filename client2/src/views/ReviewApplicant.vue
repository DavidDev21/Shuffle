<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <h3>Applicants for {{position}}</h3>
        <h4>Job ID: {{jobID}}</h4>
        <ApplicantCard ref='ApplicantCard'></ApplicantCard>
        <div class='row mt-3 justify-content-center'>
            <button class='btn btn-primary mr-3' @click='fetchApplicant'>&#60;&#60;&#60; Next applicant</button>
            <button class='btn btn-primary' @click='fetchApplicant'>Schedule Interview &#62;&#62;&#62;</button>
        </div>
    </div>
</template>

<script>
import NavigationBar from '@/components/UI/NavigationBar';
import ApplicantCard from '@/components/UI/ApplicantCard';


export default {
  name: 'review-applicant',
  components: {
    ApplicantCard,
    NavigationBar,
  },
  methods: {
    async fetchApplicant() {
      try {
        const response = await this.$refs.ApplicantCard.getApplicant();
        this.position = response.data.position;
        this.jobID = response.data.jobID;
      } catch (err) {
        console.log(err);
      }
    },
  },
  data() {
    return {
      position: '',
      jobID: '',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
