import HttpService from "@/services/http.service";
import UserService from "@/services/user.service";
import HttpStatus from "@/helpers/HttpStatus";

export default class TodoService {

    static prepare(todo) {
        return todo;
    }

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

    static async create(todo) {
        try {
            const response = await HttpService.post('/todo', todo);
            if (response.status !== HttpStatus.CREATED) {
                throw new Error("Um erro inesperado aconteceu ao criar a todo!");
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
        return todo;
    }

    static async update(todo) {
        try {
            const response = await HttpService.put('/todo', todo);
            if (response.status !== HttpStatus.NO_CONTENT) {
                throw new Error("Um erro inesperado aconteceu ao atualizar a todo!");
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
        return todo;
    }

    static async delete(uuid) {
        try {
            const response = await HttpService.delete(`/todo/${uuid}`);
            if (response.status !== HttpStatus.NO_CONTENT) {
                throw new Error(`Um erro inesperado aconteceu ao remover a todo ${uuid}`);
            }

        } catch (error) {
            console.error(error);
        }
    }

}