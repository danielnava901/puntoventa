import {Component, Input} from '@angular/core';
import {InputComponent} from '../../atoms/input/input.component';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'input-field',
  imports: [
    CommonModule,
    InputComponent
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {
  @Input() value: string | number = "";
  @Input() name: string = "";
  @Input() onChange! : (val : string | number) => void;

  onChangeInput = (value : string | number) => {
    if(typeof this.onChange === "function") this.onChange(value);
  }
}
