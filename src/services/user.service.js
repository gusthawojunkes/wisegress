import HttpService from "@/services/http.service";

export default class UserService {

    static async login(credential) {
        try {
            const response = await HttpService.post('/auth/login', credential, {});
            const user = response.data.user;
            const token = response.data.token;
            sessionStorage.setItem("TOKEN", token);
            this.save(user);
            return user;
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            }

            throw error;
        }
    }

    static async register(formulary = {}) {
        try {
            const response = await HttpService.post('/auth/register', formulary, {});
            return response.data.user;
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

    static save(user = {})  {
        sessionStorage.setItem("USER", JSON.stringify(user));
    }

    static isAuthenticated() {
        const token = this.getToken();
        return token && token != null;
    }

}