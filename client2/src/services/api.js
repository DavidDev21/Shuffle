import axios from 'axios';
console.log(process.env);

export default () => axios.create({
  baseURL: process.env.API_ENDPOINT || 'http://localhost:5000/',
});
