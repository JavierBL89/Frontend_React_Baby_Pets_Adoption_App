import axios from 'axios';


const instance = axios.create({

    baseURL: 'http://baby-pets-adoption.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },

});


export default instance;