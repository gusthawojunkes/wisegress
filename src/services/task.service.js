import HttpService from "@/services/http.service";
import HttpStatus from "@/helpers/HttpStatus";

export default class TaskService {

    static async findAll() {
        return []
    }

    static async create(task) {
        try {
            const response = await HttpService.post('/task', task);
            if (response.status !== HttpStatus.CREATED) {
                throw new Error("Um erro inesperado aconteceu ao criar a tarefa!");
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
        return task;
    }

    static async update(todo) {
        try {
            const response = await HttpService.put('/task', todo);
            if (response.status !== HttpStatus.NO_CONTENT) {
                throw new Error("Um erro inesperado aconteceu ao atualizar a tarefa!");
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
        return todo;
    }

    static async delete(uuid) {
        try {
            const response = await HttpService.delete(`/task/${uuid}`);
            if (response.status !== HttpStatus.NO_CONTENT) {
                throw new Error(`Um erro inesperado aconteceu ao remover a tarefa ${uuid}`);
            }

        } catch (error) {
            console.error(error);
        }
    }


}