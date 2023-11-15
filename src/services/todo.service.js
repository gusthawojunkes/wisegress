import HttpService from "@/services/http.service";
import UserService from "@/services/user.service";
import HttpStatus from "@/helpers/HttpStatus";
import _ from 'lodash';

export default class TodoService {

    static prepare(todo) {
        todo.open = false;
        return todo;
    }

    static async findAll() {
        const userUuid = UserService.getUserUuid();
        if (!userUuid) return [];
        const url = `/todo/all/${userUuid}`;
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

        _.sortBy(todos, ['done', 'insertedAt']).reverse();
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

    static async markAsDone(todo) {
        todo.done = true;
        todo.userUuid = UserService.getUserUuid();

        await this.update(todo);

        return todo;
    }

    static async toggleDone(todo) {
        todo.done = !todo.done;
        todo.userUuid = UserService.getUserUuid();

        await this.update(todo);

        return todo;
    }

}
