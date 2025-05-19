import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {LinkNavComponent} from '../../atoms/link-nav/link-nav.component';
import {LogoComponent} from '../../atoms/logo/logo.component';

@Component({
  selector: 'left-menu',
  imports: [RouterLink, LinkNavComponent, LogoComponent],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {

}
