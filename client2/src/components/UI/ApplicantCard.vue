<template>
    <!-- Applicant Card, (contains info on applicant for a job) -->
    <div class='container'>
        <div class='row justify-content-center'>
            <div class='row applicant-card' id='draggable'>
                <div class='card-image d-flex align-items-center justify-content-center col-4'>
                    <img alt='Some Img' />
                </div>
                <div class='card-body col-8 text-left'>
                    <div class='applicant-header'>
                        <h3>{{applicantName}}</h3>
                        <div class='text-uppercase header-tagline'>
                            <p>{{applicantTag}}</p>
                        </div>
                    </div>
                    <div class='mt-3 applicant-description'>
                        <p>{{applicantDescription}}</p>

                        <div class='applicant-experience'>
                            <h6 v-if="skills.length > 0">Experiences / Skills</h6>
                            <ul>
                                <li v-for="skill in skills">
                                    {{skill.trait}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class='mt-3 applicant-footer'>
                        <p>{{applicantFooter}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import JobService from '@/services/JobService'

export default {
  name: 'ApplicantCard',
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
        applicantName: 'Software Engineer',
        applicantTag: 'New York, NY, 11355',
        applicantDescription: 'This is a very fun job in the middle of NYC. Please Hire me for 200k',
        skills: [{trait:'Git'},{trait:'60 years of experience'}],
        applicantFooter: 'So apply or call 1800-I-Am-Broke'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.applicant-card
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

.applicant-header
{
    border-bottom: grey .5px solid;
}

.applicant-qualification
{
}

.header-tagline
{
    color: grey;
    font-size: small;
}
</style>
