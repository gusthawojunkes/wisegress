import axios from "axios";
import UserService from "@/services/user.service";

export default class HttpService {
    static async post(url, data, headers = undefined) {
        console.log(`Requesting to: ${url}`);
        headers = this.configureHeaders(headers);
        return axios.post(url, data, {
            headers
        });
    }

    static async get(url, headers = undefined) {
        console.log(`Requesting to: ${url}`);
        headers = this.configureHeaders(headers);
        return axios.get(url,{
            headers
        });
    }

    static async put(url, data, headers = undefined) {
        console.log(`Requesting to: ${url}`);
        headers = this.configureHeaders(headers);
        return axios.post(url, data, {
            headers
        });
    }

    static async delete(url, headers = undefined) {
        console.log(`Requesting to: ${url}`);
        headers = this.configureHeaders(headers);
        return axios.delete(url,{
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
