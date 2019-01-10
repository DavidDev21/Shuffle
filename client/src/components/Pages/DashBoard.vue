<template>
    <div class='container'>
        <NavigationBar></NavigationBar>
        <h3>{{userType}}</h3>
        <div class='row'>
            <div class='col-12'>
                <SelectionButton btnText='Apply To Job' to='/applyjob'></SelectionButton>
                <SelectionButton></SelectionButton>
            </div>
        </div>
        <div class='row mt-2'>
            <div class='col-12'>
                <SelectionButton></SelectionButton>
                <SelectionButton></SelectionButton>
            </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from '../UI/NavigationBar'
import SelectionButton from '../UI/SelectionButton'

export default {
  name: 'DashBoard',
  components: {
    'NavigationBar': NavigationBar, 
    'SelectionButton': SelectionButton
  },
  props: ['userType'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
