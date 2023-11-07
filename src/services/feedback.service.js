import HttpService from "@/services/http.service";
import UserService from "@/services/user.service";

export default class FeedbackService {
    static async create(feedback) {
        try {
            await HttpService.post('/feeback', {
                feature: feedback.feature,
                rating: feedback.feature,
                description: feedback.description,
                userUuid: UserService.getUserUuid()
            });
        } catch (error) {
            console.error(error);
        }
    }
}