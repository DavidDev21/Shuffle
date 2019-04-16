import axios from 'axios';
alert(process.env.API_ENDPOINT);

export default () => axios.create({
  baseURL: process.env.API_ENDPOINT || 'http://localhost:5000/',
});
