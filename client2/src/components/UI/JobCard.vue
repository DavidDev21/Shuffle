<template>
    <div class='container'>
        <div class='row justify-content-center'>
            <div class='row job-card' id='draggable'>
                <div class='card-left d-flex align-items-center justify-content-center col-4'>
                    <img class='job-image' v-bind:src="img_path" alt='Some Img' />
                </div>
                <div class='card-body col-8 text-left'>
                    <div class='job-header'>
                        <h3>{{company_name}} - {{title}}</h3>
                        <div class='text-uppercase header-tagline'>
                            <p>Location: {{location}}</p>
                        </div>
                        <div class='header-tagline'>
                            <p>Posted On: {{postedAt}}</p>
                        </div>
                    </div>
                    <div class='mt-3 job-description'>
                        <p>{{description}}</p>
                    </div>
                    <div class='mt-3 header-tagline'>
                        <p>Compensation: ${{salary}}</p>
                    </div>
                    <div class='mt-3 job-footer'>
                        <p>Requires Cover Letter: 
                            <strong v-if="requireCoverLetter === true">Yes</strong>
                            <strong v-if="requireCoverLetter === false">No</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import JobService from '@/services/JobService';

export default {
  name: 'JobCard',
  props: {
  },
  methods: {
    async getJob() {
      try {
        const response = await JobService.getJob();
        console.log(response);
        console.log(this);
        this.job_id = response.data.job_id;
        this.title = response.data.title;
        this.description = response.data.description;
        this.salary = response.data.salary;
        this.location = response.data.location;
        this.requireCoverLetter = response.data.requireCoverLetter;
        this.img_path = response.data.profileImg;
        this.company_name = response.data.company_name;
        this.postedAt = response.data.postedat;
        console.log(this.postedAt);

      } catch (error) {
        // error.response.data = accessing data that was passed by the backend as part of the error object
        console.log(error.response);
      }
    },
  },
  data() {
    return {
      img_path: '',
      job_id: 0,
      title: '',
      salary: 0,
      location: '',
      requireCoverLetter: false,
      description: '',
      company_name: '',
      postedAt: '',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.job-card
{
    border: black 1px solid;
    width: 75%;
}
.job-image
{
    width: 100%;
    height: auto;
}

.card-left
{
    border-right: black 1px solid;
}

.card-body
{
    font-size: small;
}

.job-header
{
    border-bottom: grey .5px solid;
}

.job-qualification
{
}

.header-tagline
{
    color: grey;
    font-size: small;
}
</style>
