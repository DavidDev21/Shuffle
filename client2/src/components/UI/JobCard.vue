<template>
    <div class='container'>
        <div class='row justify-content-center'>
            <div class='row job-card' id='draggable'>
                <div class='card-image d-flex align-items-center justify-content-center col-4'>
                    <img alt='Some Img' />
                </div>
                <div class='card-body col-8 text-left'>
                    <div class='job-header'>
                        <h3>{{jobTitle}}</h3>
                        <div class='text-uppercase header-tagline'>
                            <p>{{jobLocation}}</p>
                        </div>
                    </div>
                    <div class='mt-3 job-description'>
                        <p>{{jobDescription}}</p>

                        <div class='job-qualification'>
                            <h6 v-if="skills.length > 0">Qualifications</h6>
                            <ul>
                                <li v-for="skill in skills">
                                    {{skill.trait}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class='mt-3 job-footer'>
                        <p>{{jobFooter}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import JobService from '@/services/JobService'

export default {
  name: 'JobCard',
  props: { 
  },
  methods: {
      getJob: async function() {
          try 
          {
            const response = await JobService.getJob()
            this.img_path = response.data.img_path
            this.jobTitle = response.data.jobTitle
          }
          catch(error)
          {
            // error.response.data = accessing data that was passed by the backend as part of the error object
            console.log(error.response);
          }
      }
  },
  data () {
    return {
        img_path: '../../assets/shuffleLogo.png',
        jobTitle: 'Software Engineer',
        jobLocation: 'New York, NY, 11355',
        jobDescription: 'This is a very fun job in the middle of NYC. Please Hire me for 200k',
        skills: [{trait:'Git'},{trait:'60 years of experience'}],
        jobFooter: 'So apply or call 1800-I-Am-Broke'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.job-card
{
    border: black 1px solid;
    width: 75%;
}

.card-image
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
