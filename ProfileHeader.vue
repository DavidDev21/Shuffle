<template>
    <div class='body'>

        <div class="row">
          <div class="column side">
            <h2>Shuffle Logo</h2>
          </div>
          <div class="column middle">
            <div class="topnav">
              <a href="#">Sections</a>
              <a href="#">Skills</a>
              <a href="#">Internships</a>
              <a href="#">Projects</a>
              <a href="#">Etc.</a>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="column side">
            <p>Name</p>
            <p>Location/Home</p>
            <p>Education Status</p>
            <p>Major</p>
            <p>Grade/Position</p>
            <p>Github/Storage Links</p>
            <p>Social Media Links</p>
          </div>
          
          <div class="column middle">
            <h2>Main Content</h2>
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
  data() {
    return {
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
}

/* Middle column */
.column.middle {
  width: 75%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column.side, .column.middle {
    width: 100%;
  }
}
</style>
