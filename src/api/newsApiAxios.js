import axios from 'axios'
const request = axios.create({
    baseURL:'https://newsapi.org/v2/',
})
export default request

export const apiKey = 'b46b9f38ea2d4a1dbce6549b49736af1'