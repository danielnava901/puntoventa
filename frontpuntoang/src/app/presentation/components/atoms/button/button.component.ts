import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'button-atom',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type : "submit" | "button" = "button";
  @Input() text : string = "Click btn";
  @Output() onClick = new EventEmitter<void>()
}
