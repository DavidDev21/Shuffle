import axios from 'axios';
alert(process.env.VUE_APP_API_ENDPOINT);

export default () => axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://localhost:5000/',
});
