import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-25bf0.firebaseio.com/'
});

export default instance;