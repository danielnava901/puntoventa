import {Component, Input} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {InputFieldComponent} from '../../molecules/input-field/input-field.component';
import {ButtonComponent} from '../../atoms/button/button.component';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldComponent,
    ButtonComponent
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  @Input() onSubmit = (val : any) => {};
  email : string | number = "";

  onChangeInput = (value : string | number) => {
    this.email = value;
  }

  onSubmitForm() {
    if(typeof this.onSubmit === "function") {
      this.onSubmit({
        email: this.email
      })
    }
  }


}
