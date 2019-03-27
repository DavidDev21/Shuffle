<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <div class='header'>
            Here is your application status, {{userType}}
        </div>
        <input type="text" class='search' placeholder='search'>
        <SearchBar hint="Search hint" :text="searchPhrase" @textChange="onTextChanged" @submit="onSubmit" />
        <table>
          <tr>
            <th>Job</th>
            <th>Employer</th> 
            <th>Contacts</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>Software Engineer</td>
            <td>Some Company</td> 
            <td>555-555-5555</td>
            <td>Somewhere</td>
            <td>Waiting</td>
          </tr>
          <tr>
            <td>Software Developer</td>
            <td>Other Company</td> 
            <td>777-777-7777</td>
            <td>Elsewhere</td>
            <td>Accepted</td>
          </tr>
        </table>
    </div>
</template>

<script>
import NavigationBar from '@/components/UI/NavigationBar'

export default {
  name: 'ApplicationStatus',
  components: {
    'NavigationBar': NavigationBar
  },
  props: ['userType'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header{
  font-size: 35px;
}
table, th, td{
  border: 1px solid black;
}
table{
  width: 100%;
}
th{
  background-color: lightGray;
}
</style>