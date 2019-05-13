import axios from 'axios';

const instanceFile = axios.create({
    baseURL: 'http://10.0.2.2:3000',
    timeout: 1000,
});

const instanceJSON = axios.create({
    baseURL: 'http://10.0.2.2:3000',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export { instanceFile, instanceJSON };