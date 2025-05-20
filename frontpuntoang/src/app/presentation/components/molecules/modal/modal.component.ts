import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    console.log("modal emit");
    this.close.emit();
  }
}
