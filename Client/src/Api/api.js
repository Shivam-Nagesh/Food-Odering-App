import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3500',
    withCredentials: true,
})

const protectedApi = axios.create({
    baseURL: 'http://localhost:3500',
    withCredentials: true,
})

export { api, protectedApi }