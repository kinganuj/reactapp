import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burgerv1.firebaseio.com/'
});

export default instance;