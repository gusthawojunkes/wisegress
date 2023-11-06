import axios from "axios";
import UserService from "@/services/user.service";

export default class HttpService {
    static async post(url, data, headers = undefined) {
        headers = this.configureHeaders(headers);
        return axios.post(url, data, {
            headers
        });
    }

    static async get(url, headers = undefined) {
        headers = this.configureHeaders(headers);
        return axios.get(url,{
            headers
        });
    }


    static configureHeaders(headers) {
        if (!headers && UserService.getToken() != null) {
            headers = {}
            headers['Authorization'] = `Bearer ${UserService.getToken()}`;
        }

        return headers;
    }
}
