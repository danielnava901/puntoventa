import AuthRepository from '../repositories/auth-repository';
import {Inject, Injectable} from '@angular/core';
import {AUTH_REPOSITORY} from '../tokens/auth-repository.token';
import AuthRestRepositoryAdapter from '../adapters/auth-rest-repository-adapter';


@Injectable({
  providedIn: 'root'
})
export default class AuthService {

  constructor(@Inject(AUTH_REPOSITORY) private authRepository : AuthRepository) {}

  isValidEmail(email : string)
  {
    return /\S+@\S+\.\S+/.test(email);
  }

  async login(email : string) : Promise<{token : string } | null>
  {

    if(!this.isValidEmail(email)) {
      throw new Error("Error [email]");
    }

    return await this.authRepository.login(email);
  }

}
