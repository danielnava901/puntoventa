import {sender} from "../../../utils/sender.js";

const authApi = {
    login: async (email) => {
        return await sender({
            url: "http://localhost:8000/api/login",
            data: {email}
        });
    }
}

export default authApi;