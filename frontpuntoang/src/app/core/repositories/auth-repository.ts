import {AuthRes} from '../models/auth-model';

export default interface AuthRepository {
  login: (email: string) => Promise<AuthRes|null>,

}
