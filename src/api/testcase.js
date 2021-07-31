import axios from "./http"

const testcase = {
    get(params) {
        return axios.get('/testcase',{params})
    },
    post(params) {
        return axios.post('/testcase', params)
    },
    put(params) {
        return axios.put('/testcase', params)
    },
    delete(params) {
        return axios.delete('/testcase', {params})
    },
}
export default testcase