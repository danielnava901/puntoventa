import { Component } from '@angular/core';
import {LeftMenuComponent} from '../../organisms/left-menu/left-menu.component';

@Component({
  selector: 'dashboard-template',
  imports: [LeftMenuComponent],
  templateUrl: './dashboard-template.component.html',
  styleUrl: './dashboard-template.component.scss'
})
export class DashboardTemplateComponent {

}
