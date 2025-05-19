import {Component, Input} from '@angular/core';

@Component({
  selector: 'screen-template',
  imports: [],
  templateUrl: './screen-template.component.html',
  styleUrl: './screen-template.component.scss'
})
export class ScreenTemplate {
  @Input() extrClass : string = "";
}
