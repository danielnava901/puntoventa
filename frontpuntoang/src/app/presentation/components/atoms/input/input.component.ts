import {Component, Input} from '@angular/core';


@Component({
  selector: 'input-atom',
  imports: [],
  standalone: true,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() value : string | number = "";
  @Input() placeholder : string | number = "";
  @Input() id : string = "";
  @Input() onChangeProp!: (val : string | number) => void;

  onInputChange(event: Event) {
    let value = (event.target as HTMLInputElement).value
    this.value = value;

    if(typeof this.onChangeProp === "function") {
      this.onChangeProp(value)
    }
  }
}
