<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <img src='/assets/no_profile_icon.png' alt='no'/>
    <button @click="getImg">GetImg</button>
    <!-- <button class='btn' @click="getFile">Get PDF</button> -->
    <a @click="getFile" download>Download2</a>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import api from '@/services/api';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  methods: {
    async getImg() {
      const response = await api().get('testFile');
      console.log(response);
      this.test = response.data;
    },
    async getFile() {
      const response = await api().get('/uploads/documents/7e25164bb0b952c178f58f692341905239a1.pdf');
      console.log(response);
      console.log(response.data)
      const blob = new Blob([response.data], {type:response.headers["content-type"]});

    }
  },
  data() {
    return {
      test: ''
    };
  }
};
</script>
