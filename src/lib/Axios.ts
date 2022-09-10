import axios from 'axios'
import { API_URL } from '@env'

const baseURL = API_URL

const api = axios.create({
  baseURL: `${baseURL}`,
  withCredentials: true,
  timeout: 3000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
})

export default api