import HttpService from "@/services/http.service";

export default class UserService {

    static async login(url, data) {
        try {
            const response = await HttpService.post(url, data, {});
            const user = response.data.user;
            const token = response.data.token;
            sessionStorage.setItem("TOKEN", token);
            localStorage.setItem("USER", JSON.stringify(user));
            return user;
        } catch (error) {
            throw error.response.data;
        }
    }

    static async register(url, data) {
        try {
            await HttpService.post(url, data, {});
        } catch (error) {
            throw error.response.data;
        }
    }

    static getToken() {
        return sessionStorage.getItem("TOKEN");
    }

    static getUser() {
        return JSON.parse(localStorage.getItem("USER"))
    }

}