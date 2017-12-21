import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-app-6ef7b.firebaseio.com/'
});

export default instance;