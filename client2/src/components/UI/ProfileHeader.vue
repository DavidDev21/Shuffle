<template>
  <div class='body'>
    <div class="row">
      <div v-if="userType === NULL">
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
            <input type="text" id="fname" name="firstname" placeholder="Your name is...">

            <label for="lname">Last Name</label>
            <input type="text" id="lname" name="lastname" placeholder="Your last name is...">

            <label for="email">Email Address</label>
            <input type="text" id="email" name="firstname" placeholder="Your email is...">

            <label for="password">Password</label>
            <input type="text" id="password" name="lastname" placeholder="Your password is...">

            <p>Bio</p>
            <form>
              <textarea>Your bio is...</textarea>
            </form>

            <p>
              <label for="file-upload" class="float-left">Upload Resume (PDF, DOCX only)-</label>
              <input id="file-upload" type="file" ref="file" @change="selectFile"/>
            </p>

            <p>
              <label for="file-upload" class="float-left">Upload Profile Image (JPEG, PNG only)-</label>
              <input id="file-upload" type="file" ref="file" @change="selectFile"/>
            </p>
          
            <input type="submit" value="Submit">
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
            <input type="text" id="email" name="firstname" placeholder="Your email is...">

            <label for="password">Password</label>
            <input type="text" id="password" name="lastname" placeholder="Your password is...">

            <label for="cname">Company Name</label>
            <input type="text" id="cname" name="companyname" placeholder="Your company's name is...">

            <label for="Year">Year Found</label>
            <select id="Year" name="Year">
              <option value= 1997>1997</option>
              <option value= 1998>1998</option>
              <option value= 1999>1999</option>
            </select>

            <p>Company Description</p>
            <form>
              <textarea>Your company is...</textarea>
            </form>

            <p>
              <label for="file-upload" class="float-left">Upload Profile Image (JPEG, PNG only)-</label>
              <input id="file-upload" type="file" ref="file" @change="selectFile"/>
            </p>
          
            <input type="submit" value="Submit">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async getJob() {
      try {
        const response = await JobService.getJob();
        this.img_path = response.data.img_path;
        this.jobTitle = response.data.jobTitle;
      } catch (error) {
        // error.response.data = accessing data that was passed by the backend as part of the error object
        console.log(error.response);
      }
    },
  },
  mounted() {
    console.log("Dashboard: mounted")
  //   // console.log(this.$store.getters.userType);
    this.userType = this.$store.getters.userType;
    this.userData = this.$store.getters.userData;

    if(this.userType === 'applicant')
    {
      this.name = this.userData.f_name;
    }
    else if(this.userType === 'employer')
    {
      this.name = this.userData.company_name;
    }
  },
  data() {
    return {
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
