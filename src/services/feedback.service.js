import HttpService from "@/services/http.service";
import UserService from "@/services/user.service";

export default class FeedbackService {
    static async create(feedback) {
        try {
            await HttpService.post('/feedback', {
                feature: feedback.feature,
                rating: feedback.feature,
                description: feedback.description,
                userUuid: UserService.getUserUuid()
            });
        } catch (error) {
            console.error(error);
        }
    }

    static async getClassifications() {
        try {
            await HttpService.get(`/feedback/calculate/${UserService.getUserUuid()}`);
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
