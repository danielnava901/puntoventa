import {sender} from "../../utils/sender.js";

export default class UserLoginRepository {

    async login(email) {
        return await sender({
            url: "http://localhost:8000/api/login",
            data: {email: email}
        });
    }
}