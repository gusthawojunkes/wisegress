import UserService from "@/services/user.service";
import HttpService from "@/services/http.service";
import HttpStatus from "@/helpers/HttpStatus";

export default class EventService {

    static prepare(event) {
        return event
    }
    static async findAll() {
        const url = `/event/all/${UserService.getUserUuid()}`;
        const events = [];
        try {
            const response = await HttpService.get(url);
            response.data.forEach((event) => {
                events.push(this.prepare(event));
            });

        } catch (error) {
            console.error(error);
            return [];
        }
        return events;
    }

    static async create(event) {
        try {
            const response = await HttpService.post('/event', event);
            if (response.status !== HttpStatus.CREATED) {
                throw new Error("Um erro inesperado aconteceu ao criar o evento!");
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
        return event;
    }

    static async update(event) {
        try {
            const response = await HttpService.put('/event', event);
            if (response.status !== HttpStatus.NO_CONTENT) {
                throw new Error("Um erro inesperado aconteceu ao atualizar o evento!");
            }

        } catch (error) {
            console.error(error);
            return undefined;
        }
        return event;
    }

    static async delete(uuid) {
        try {
            const response = await HttpService.delete(`/event/${uuid}`);
            if (response.status !== HttpStatus.NO_CONTENT) {
                throw new Error(`Um erro inesperado aconteceu ao remover o evento ${uuid}`);
            }

        } catch (error) {
            console.error(error);
        }
    }
}