
import axios from "./http"

const task = {
    get(params) {
        return axios.get('/task',{params})
    },
    post(params) {
        return axios.post('/task', params)
    },
}
export default task