import {Component, ViewEncapsulation} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardTemplateComponent} from '../../components/templates/dashboard-template/dashboard-template.component';
import {LeftMenuComponent} from '../../components/organisms/left-menu/left-menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    DashboardTemplateComponent,
    LeftMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

}
