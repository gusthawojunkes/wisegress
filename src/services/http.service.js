import axios from "axios";
import UserService from "@/services/user.service";

export default class HttpService {
    static async post(url, data, headers = undefined) {
        if (!headers && UserService.getToken() != null) {
            headers = {}
            headers['Authorization'] = `Bearer ${UserService.getToken()}`;
        }
        return axios.post(url, data, {
            headers
        });
    }
}
