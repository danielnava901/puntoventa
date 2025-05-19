import AuthRepository from '../repositories/auth-repository';

export default class AuthService {
  constructor(private authRepository : AuthRepository) {}

  isValidEmail(email : string) {
    console.log("testing", {email})
    return /\S+@\S+\.\S+/.test(email);
  }

  async login(email : string) : Promise<{token : string } | null> {

    if(!this.isValidEmail(email)) {
      throw new Error("Error [email]");
    }

    return await this.authRepository.login(email);
  }

}
