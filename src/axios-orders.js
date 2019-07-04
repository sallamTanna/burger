import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-591cf.firebaseio.com/'
});

export default instance;
