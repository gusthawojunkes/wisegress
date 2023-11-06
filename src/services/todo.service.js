import HttpService from "@/services/http.service";
import UserService from "@/services/user.service";

export default class TodoService {

    static async findAll() {
        const url = `/todo/all/${UserService.getUserUuid()}`;
        const todos = [];
        try {
            const response = await HttpService.get(url);
            response.data.forEach((todo) => {
                todos.push(this.prepare(todo));
            });

        } catch (error) {
            console.error(error);
            return [];
        }

        return todos;
    }


    static prepare(todo) {
        return todo;
    }
}