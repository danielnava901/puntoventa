import authApi from "../infra/api/authApi.js";

export default class UserLoginRepository {

    async login(email) {
        return await authApi.login(email)
    }
}