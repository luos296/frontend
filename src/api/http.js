import axios from "axios"
var instance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: 'http://localhost:5000'
})

export default instance