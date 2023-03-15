import axios from "axios";

export default axios.create({
    //Using ngrok changing every 8 hours
    baseURL: 'https://4ca6-5-103-118-250.eu.ngrok.io'
});