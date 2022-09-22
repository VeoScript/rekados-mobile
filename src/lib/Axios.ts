import axios from 'axios'
import { API_URL } from '@env'

const api = axios.create({
  baseURL: `${API_URL}`,
  withCredentials: true,
  timeout: 3000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
})

export default api