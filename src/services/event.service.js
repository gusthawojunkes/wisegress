import UserService from "@/services/user.service";
import HttpService from "@/services/http.service";
import HttpStatus from "@/helpers/HttpStatus";
import _ from "lodash";

export default class EventService {

    static prepare(event) {
        return {
            date: event.date,
            comment: event.description,
            id: event.uuid,
            keywords: event.situation,
            name: event.description,
        }
    }
    static async findAll() {
        const userUuid = UserService.getUserUuid();
        if (!userUuid) return [];
        const url = `/event/all/${userUuid}`;
        const events = [];
        try {
            const response = await HttpService.get(url);
            response.data.forEach((item) => {
                events.push(this.prepare(item));
            });

        } catch (error) {
            console.error(error);
            return [];
        }
        _.sortBy(events, 'insertedAt').reverse();
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
