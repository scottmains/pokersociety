import axios from 'axios';

// SETS THE API LINK PATH ACROSS THE WHOLE APPLICATION
const BASE_URL = 'https://nupokersociety.herokuapp.com/';

export default axios.create({
    baseURL: BASE_URL
});

//USES THE LINK PATH ACROSS AXIOS REQUESTS
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});