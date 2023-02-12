import axios from 'axios'

const postApi = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default postApi