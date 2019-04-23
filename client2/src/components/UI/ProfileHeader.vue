<template>
  <div class='body'>
    <div class="row">
      <div v-if="userType === 'applicant'">
        <div class="column side">
          <img src= "../../assets/logo.png" alt="Logo" style="width:150px">
          <p>Location/Home</p>
          <p>Education Status</p>
          <p>Major</p>
          <p>Grade/Position</p>
        </div>
        <div class="column space">
        </div>
        <div class="column middle">
          <form action="/action_page.php">
            <label for="fname">First Name</label>
            <input type="text" id="fname" name="firstname">

            <label for="lname">Last Name</label>
            <input type="text" id="lname" name="lastname">

            <label for="email">Email Address</label>
            <input type="text" id="email" name="email">

            <label for="password">Password</label>
            <input type="text" id="password" name="email">

            <p>Bio</p>
            <form>
              <textarea id="bio"></textarea>
            </form>

            <p>
              <label for="file-upload" class="float-left">Upload Resume (PDF, DOCX only)-</label>
              <input id="file-upload" type="file" ref="file" @change="selectFile"/>
            </p>

            <p>
              <label for="file-upload" class="float-left">Upload Profile Image (JPEG, PNG only)-</label>
              <input id="file-upload" type="file" ref="file" @change="selectFile"/>
            </p>
          
            <!-- <input type="submit" value="Submit"> -->
            <button type = "button" @click="updateApplicantProfile" class="btn btn-primary btn-lg btn-block">Submit</button>
          </form>
        </div>
      </div>
      <div v-if="userType === 'employer'">
        <div class="column side">
          <img src= "../../assets/logo.png" alt="Logo" style="width:150px">
          <p>Name</p>
          <p>Year Found</p>
          <p>Major</p>
          <p>Position</p>
        </div>
        <div class="column space">
        </div>
        <div class="column middle">
          <form action="/action_page.php">
            <label for="email">Email Address</label>
            <input type="text" id="emaill" name="email" placeholder="Your email is...">

            <label for="password">Password</label>
            <input type="text" id="pass" name="pass" placeholder="Your password is...">

            <label for="cname">Company Name</label>
            <input type="text" id="cname" name="cname" placeholder="Your company's name is...">

            <label for="Year">Year Found</label>
            <input id="Year" name="Year">
              <!-- <option value= 1997>1997</option>
              <option value= 1998>1998</option>
              <option value= 1999>1999</option> -->

            <p>Company Description</p>
            <textarea id = "des"></textarea>


            <p>
              <label for="file-upload" class="float-left">Upload Profile Image (JPEG, PNG only)-</label>
              <input id="file-upload" type="file" ref="file" @change="selectFile"/>
            </p>
          
            <!-- <input type="submit" value="Submit"> -->
            <button type = "button" @click="updateEmployerProfile" class="btn btn-primary btn-lg btn-block">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApplicantService from '@/services/ApplicantService';
import EmployerService from '@/services/EmployerService';
export default {
  methods: {
    async getProfile(){
      try{
        const email = this.$store.getters.userData.email;
        console.log(email);
        const type = this.$store.getters.userType;
        if(type ==='applicant'){
          
          const response = await ApplicantService.getProfile({
              email: email
          });
          this.Applicant = response.data;
          document.getElementById("fname").setAttribute('value',response.data.f_name);
          document.getElementById("lname").setAttribute('value',response.data.l_name);
          document.getElementById("email").setAttribute('value',response.data.email);
          document.getElementById("password").setAttribute('value',response.data.password);
          document.getElementById("bio").value = response.data.bio;
        }
        if(type ==='employer'){
          
          const response = await EmployerService.getProfile({
              email: email
          });
          this.Employer = response.data;
          document.getElementById("cname").setAttribute('value',response.data.company_name);
          document.getElementById("emaill").setAttribute('value',response.data.email);
          document.getElementById("pass").setAttribute('value',response.data.password);
          document.getElementById("Year").setAttribute('value',response.data.year_found);
          document.getElementById("des").value=response.data.company_description;
        }
      }
      catch(err){
        console.log(err.response);
        alert(err.response.data);
        this.$router.push({
          name: 'dashboard',
        });
      }
    },
    async updateApplicantProfile(){
      try{   
        this.Applicant.f_name=document.getElementById("fname").value;
        this.Applicant.l_name=document.getElementById("lname").value;
        this.Applicant.bio=document.getElementById("bio").value;
        // console.log(this.Applicant);
        const response = await ApplicantService.updateProfile({
          email:this.Applicant
        });
        // // console.log(response.data);
        // this.getProfile();
      }
      catch(err){
        console.log(err);
      }
    },
    async updateEmployerProfile(){
      try{   
        this.Employer.company_name=document.getElementById("cname").value;
        this.Employer.company_description=document.getElementById("des").value;
        this.Employer.year_found=document.getElementById("Year").value;
        console.log(this.Employer);
        const response = await EmployerService.updateProfile({
          email:this.Employer
        });
      }
      catch(err){
        console.log(err);
      }
    },
  },
  mounted() {
    console.log("Dashboard: mounted")
  //   // console.log(this.$store.getters.userType);
    this.userType = this.$store.getters.userType;
    this.userData = this.$store.getters.userData;
    this.getProfile();
  },
  data() {
    return {
      Applicant: null,
      Employer:null,
      userType: null,
      userData: null,
      name: null
    };
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

/* Style the header */
.header {
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
}

/* Style the top navigation bar */
.topnav {
  overflow: hidden;
  background-color: #333;
}

/* Style the topnav links */
.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change color on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Create three unequal columns that floats next to each other */
.column {
  float: left;
  padding: 10px;
}

/* Left and right column */
.column.side {
  width: 25%;
  border-right-style: solid;
}

/* Middle column */
.column.middle {
  text-align: left;
  width: 73%;
}

/* Space column */
.column.space {
  text-align: left;
  width: 2%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 150px;
}

input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column.side, .column.middle, .column.space {
    width: 100%;
  }
}
</style>
