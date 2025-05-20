import AuthRepository from '../repositories/auth-repository';
import {ApiService} from '../services/api/api.service';
import {AuthRes} from '../models/auth-model';
import {firstValueFrom} from 'rxjs';
import {Injectable} from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export default class AuthRestRepositoryAdapter implements AuthRepository {

  constructor(private api: ApiService) {}

  async login(email: string): Promise<AuthRes|null>
  {
    return await firstValueFrom(
      this.api.sender<AuthRes>({
        url: "http://localhost:8000/api/login",
        data: { email },
        method: "POST",
      })
    );
  }

}
