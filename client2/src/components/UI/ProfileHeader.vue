    
<template>
  <div class='body'>
    <div class="row">
      <div v-if="userType === 'applicant'">
        <div class="column side">
          <div class="container justify-content-center">
            <div clas="row justify-content-center">
              <img class="border-bottom" v-bind:src="userData.profileImg" alt="Img" style="width:250px; height:200px;">
            </div>
            <div class="row justify-content-center">
                <label>Major: {{userData.major}}</label>
            </div>
            <div class="row justify-content-center">
              <label>Graduation Date: {{userData.grad_year}}</label>
            </div>
          </div>
        </div>
        <div class="column space">
        </div>
        <div class="column middle form-container">
          <form autocomplete="off" enctype="multipart/form-data">
            <div class="form-row">
              <label for="email">Email Address</label>
              <input v-model="userData.email" class="form-control"  type="text" id="email" name="email" disabled>
            </div>
            <div class="form-row">
              <label for="password">Password</label>
              <input v-model="userPassword" class="form-control"  type="text" id="password" name="password">
            </div>
            <div class="form-row">
              <label for="fname">First Name</label>
              <input v-model="userData.f_name" class="form-control"  type="text" id="fname" name="firstname">
            </div>
            <div class="form-row">
              <label for="lname">Last Name</label>
              <input v-model="userData.l_name" class="form-control"  type="text" id="lname" name="lastname">
            </div>
            <div class="form-row">
              <label for="bio">Bio</label> 
              <textarea v-model="userData.bio" class="form-control"  id="bio"></textarea>
            </div>
            <div class="form-row">
              <label for="resume-upload" class="float-left">Upload Resume (PDF only)-</label>
              <input id="resume-upload" type="file" ref="resume" @change="selectFile('resume')"/>
            </div>
            <div class="form-row">
              <label for="profileImg-upload" class="float-left">Upload Profile Image (JPEG, PNG only)-</label>
              <input id="profileImg-upload" type="file" ref="profileImg" @change="selectFile('profileImg')"/>
            </div>
          
            <!-- <input type="submit" value="Submit"> -->
            <button type = "button" @click="updateApplicantProfile" class="btn btn-primary btn-lg btn-block">Save Changes</button>
          </form>
        </div>
      </div>
      <div v-if="userType === 'employer'">
        <div class="column side">
          <div class="container justify-content-center">
            <div clas="row justify-content-center">
              <img class="border-bottom" v-bind:src="userData.profileImg" alt="Img" style="width:200px; height:200px;">
            </div>
            <div class="row justify-content-center">
                <label>Name: {{userData.company_name}}</label>
            </div>
            <div class="row justify-content-center">
              <label>Year Founded: {{userData.year_found}}</label>
            </div>
          </div>
        </div>
        <div class="column space">
        </div>
        <div class="column middle form-container">
          <form autocomplete="off" enctype="multipart/form-data">
            <div class="form-row">
              <label for="email">Email Address</label>
              <input v-model="userData.email" class="form-control"  type="text" id="email" name="email" placeholder="Your email is..." disabled>
            </div>

            <div class="form-row">
              <label for="password">Password</label>
              <input v-model="userPassword" class="form-control"  type="text" id="pass" name="pass" placeholder="Your password is...">
            </div>
            <div class="form-row">
              <label for="cname">Company Name</label>
              <input v-model="userData.company_name" class="form-control"  type="text" id="cname" name="cname" placeholder="Your company's name is...">
            </div>
            <div class="form-row">
              <label for="Year">Year Found</label>
              <input v-model="userData.year_found" class="form-control" type="date" id="Year" name="Year">
            </div>
            <div class="form-row">
              <label>Company Description</label>
              <textarea v-model="userData.company_description" class="form-control"  id = "des"></textarea>
            </div>
            <div class="form-row">
              <label for="profileImg-upload" class="float-left">Upload Profile Image (JPEG, PNG only)-</label>
              <input id="profileImg-upload" type="file" ref="profileImg" @change="selectFile('profileImg')"/>
            </div>
          
            <!-- <input type="submit" value="Submit"> -->
            <button type = "button" @click="updateEmployerProfile" class="btn btn-primary btn-lg btn-block">Save Changes</button>
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
      formValidation(formObject) {
        const fieldValues = Object.values(formObject);
        for (let i = 0; i < fieldValues.length; i++) {
          if (fieldValues[i] === '') {
            return false;
          }
        }
        return true;
      },
      validFileType(fileName, allowedExt) {
      const fileExt = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
      console.log(fileExt);

      for (let i = 0; i < allowedExt.length; i++) {
        console.log(allowedExt[i]);
        if (fileExt === allowedExt[i]) {
          return true;
        }
      }
      return false;
    },
    selectFile(type) {
      // console.log(this.validFileType(this.$refs.file.files[0].name, [".pdf", ".doc", ".docx"]));
      let allowedExt = ['.pdf'];
      let fileName = undefined;
      if(type === 'resume')
      {
        allowedExt = ['.pdf'];
        fileName = this.$refs.resume.files[0].name;
      }
      else if(type === 'profileImg')
      {
        allowedExt = ['.jpg', '.png'];
        fileName = this.$refs.profileImg.files[0].name;
      }

      if (this.validFileType(fileName, allowedExt) == true) {
        // this.file = this.$refs.file.files[0];
        // console.log(this.file);
          console.log(this.$refs);
      } else {

        document.getElementById(type + '-upload').value = '';
        const fileExt = fileName.slice(fileName.lastIndexOf('.'));
        alert(`The file extension ${fileExt} is not allowed`);
      }
    },
    async getProfile(){
      try{
        const email = this.userData.email;
        console.log(email);
        const type = this.userType;
        if(type ==='applicant'){
          
          const response = await ApplicantService.getProfile({
              email: email
          });
          console.log(response.data)
          // this.userData['password'] doesn't seem to get rendered upon mounting
          this.userPassword = response.data.password; 
          Object.entries(response.data).forEach(([key,value]) => {this.userData[key] = value});
          console.log(this.userData)

          // document.getElementById("fname").setAttribute('value',response.data.f_name);
          // document.getElementById("lname").setAttribute('value',response.data.l_name);
          // document.getElementById("email").setAttribute('value',response.data.email);
          // document.getElementById("password").setAttribute('value',response.data.password);
          // document.getElementById("bio").value = response.data.bio;
        }
        else if(type ==='employer'){
          
          const response = await EmployerService.getProfile({
              email: email
          });

          console.log(response.data)
          // this.userData['password'] doesn't seem to get rendered upon mounting
          this.userPassword = response.data.password;
          console.log(this.userPassword); 
          Object.entries(response.data).forEach(([key,value]) => {this.userData[key] = value});
          console.log(this.userData)
          // this.Employer = response.data;
          // document.getElementById("cname").setAttribute('value',response.data.company_name);
          // document.getElementById("emaill").setAttribute('value',response.data.email);
          // document.getElementById("pass").setAttribute('value',response.data.password);
          // document.getElementById("Year").setAttribute('value',response.data.year_found);
          // document.getElementById("des").value=response.data.company_description;
        }
      }
      catch(err){
        console.log(err.response);
        alert(err);
        this.$router.push({
          name: 'dashboard',
        });
      }
    },
    async updateApplicantProfile(){
      
      try{   
          const formData = new FormData();
          const formFields = {
              ...this.userData
          };
          formFields.password = this.userPassword;
          if(this.formValidation(formFields) === false)
          {
            alert("Fields cannot be empty");
            return;
          }
            // console.log(this.$refs.profileImg.files[0]);
            // console.log(this.$refs.resume.files[0])
          if(this.$refs.resume.files[0]){
            formData.append('resume', this.$refs.resume.files[0]);
          }
          if(this.$refs.profileImg.files[0])
          {
            formData.append('profileImg', this.$refs.profileImg.files[0]);
          }
          Object.entries(formFields).forEach(([key, value]) => { formData.append(key, value); });
          // Display the key/value pairs
          for (let pair of formData.entries()) {
              console.log(pair[0]+ ', ' + pair[1]); 
          }
          // console.log(this.$refs.resume.files[0]);
          // console.log(this.$refs.profileImg.files[0]);
          // console.log(formFields);

        const response = await ApplicantService.updateProfile(formData);
        // // console.log(response.data);
        // // this.getProfile();
        alert("Changes Saved");
        this.$router.push({
          name: 'dashboard',
        });
      }
      catch(err){
        console.log(err);
      }
    },
    async updateEmployerProfile(){
      try{   
          const formData = new FormData();
          const formFields = {
              ...this.userData
          };

          // overwrite the existing password
          formFields.password = this.userPassword;
          if(this.$refs.profileImg.files[0])
          {
            formData.append('profileImg', this.$refs.profileImg.files[0]);
          }
          Object.entries(formFields).forEach(([key, value]) => { formData.append(key, value); });
        console.log(formFields);
        const response = await EmployerService.updateProfile(formData);

        alert("Changes Saved")
        this.$router.push({
          name: 'dashboard',
        });
      }
      catch(err){
        console.log(err);
        alert(err);
      }
    },
  },
  mounted() {
    console.log("Dashboard: mounted")
  //   // console.log(this.$store.getters.userType);
    this.userType = this.$store.getters.userType;
    this.userData = this.$store.getters.userData;
    console.log(this.userData);
    this.getProfile();
  },
  data() {
    return {
      userType: null,
      userData: null,
      userPassword: null,
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
  width: 30%;
}
/* Middle column */
.column.middle {
  text-align: left;
  width: 68%;
  border-left-style: solid;
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