import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ScreenTemplate} from '../../components/templates/screen-template/screen-template.component';
import {LoginFormComponent} from '../../components/organisms/login-form/login-form.component';
import AuthRestRepositoryAdapter from '../../../core/adapters/auth-rest-repository-adapter';
import AuthService from '../../../core/services/auth-service';

@Component({
  selector: 'app-login',
  imports: [
    ScreenTemplate,
    LoginFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = new Router();
  private authService = new AuthService(new AuthRestRepositoryAdapter());

  onSubmit = async({email} : any) => {
    try {
      let authResponse = await this.authService.login(email);

      if(authResponse !== null) {

        localStorage.setItem("auth", JSON.stringify(authResponse));
        await this.router.navigate(["/dashboard"]);
      }else {
        await this.router.navigate(["login"]);
        localStorage.removeItem("auth");
      }

    }catch (e : any) {
      console.log("Error", e.message)
    }

  }
}
