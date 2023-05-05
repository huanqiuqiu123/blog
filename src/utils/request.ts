import axios, {AxiosInstance} from 'axios'

const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})
export default request
