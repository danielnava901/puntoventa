export default class UserLoginService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    async execute(email) {

        if(!this.isValidEmail(email)) {
            throw new Error("Correo inválido");
        }

        return await this.userRepository.login(email)
    }
}