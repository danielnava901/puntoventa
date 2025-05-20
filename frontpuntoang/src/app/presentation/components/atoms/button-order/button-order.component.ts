import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'button-order',
  imports: [],
  templateUrl: './button-order.component.html',
  styleUrl: './button-order.component.scss'
})
export class ButtonOrderComponent {
  @Output() onClick = new EventEmitter<void>();
  @Input() text!: string;


}
