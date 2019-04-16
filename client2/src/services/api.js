import axios from 'axios';

export default () => axios.create({
  baseURL: "https://shuffleproject.herokuapp.com/",
});
