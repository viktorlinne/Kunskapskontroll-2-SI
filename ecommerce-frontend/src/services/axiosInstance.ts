import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://kunskapskontroll-2-si.vercel.app',
    headers: { 'Content-Type': 'application/json'}
});
