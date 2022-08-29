import axios from 'axios'

// const baseURL = 'https://contzx.herokuapp.com'
const baseURL = 'http://192.168.0.137:3333'

const api = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api