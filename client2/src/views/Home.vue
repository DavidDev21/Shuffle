<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <img src='/assets/no_profile_icon.png' alt='no'/>
    <button @click="getImg">GetImg</button>
    <!-- <button class='btn' @click="getFile">Get PDF</button> -->
    <a @click="getFile">Download2</a>

    <embed width="900px" height="540px" src="/uploads/documents/3d6f5807b89adee68c10585c1d5e9b725e71.pdf" />
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
      const response = await api().get('/uploads/documents/7e25164bb0b952c178f58f692341905239a1.pdf', {
        responseType: 'blob'
      });
      console.log(response);
      console.log(response.data)
      const blob = new Blob([response.data],{type:response.headers["content-type"]});
      console.log(blob);
      // anchor gets garbaged collected eventually. (generally, unless browser is bad)
      let anchor = document.createElement('a');
      anchor.href = window.URL.createObjectURL(blob);
      anchor.target = '_blank';
      anchor.download = '7e25164bb0b952c178f58f692341905239a1'; // filename (doesn't matter if extension is included)
      anchor.click();
    }
  },
  data() {
    return {
      test: ''
    };
  }
};
</script>
