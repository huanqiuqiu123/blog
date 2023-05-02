import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios'

const request: AxiosInstance = axios.create({
    baseURL: 'http://localhost:7777/'
})
export default request
