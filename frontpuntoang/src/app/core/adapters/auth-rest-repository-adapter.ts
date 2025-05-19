import sender from '../../utils/sender';
import AuthRepository from '../repositories/auth-repository';

export default class AuthRestRepositoryAdapter implements AuthRepository {


  async login(email: string): Promise<{ token: string, user: any }> {

    let responseLogin = await sender({
      url: "http://localhost:8000/api/login",
      data: { email }
    })

    console.log({responseLogin});

    return responseLogin;
  }

}
