<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <img src='/assets/no_profile_icon.png' alt='no'/>
    <button @click="getImg">GetImg</button>
    <!-- <button class='btn' @click="getFile">Get PDF</button> -->
    <a @click="getFile">Download2</a>

    <!-- Note Doc Files are not natively supported by browsers -->
<iframe class="doc" src="/uploads/documents/2214a63f574ffedbb0140e110cc5aaaf6b0a.docx"></iframe>
    <embed width="900px" height="540px" src="/uploads/documents/3d6f5807b89adee68c10585c1d5e9b725e71.pdf" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
