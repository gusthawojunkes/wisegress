import HttpService from "@/services/http.service";

export default class UserService {

    static async login(url, data) {
        try {
            const response = await HttpService.post(url, data, {});
            const user = response.data.user;
            const token = response.data.token;
            sessionStorage.setItem("TOKEN", token);
            sessionStorage.setItem("USER", JSON.stringify(user));
            return user;
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            }

            throw error;
        }
    }

    static getToken() {
        return sessionStorage.getItem("TOKEN");
    }

    static getUser() {
        return JSON.parse(sessionStorage.getItem("USER"))
    }

    static isAuthenticated() {
        const token = this.getToken();

        return token && token != null;
    }

}