import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'link-nav',
  imports: [RouterLink],
  templateUrl: './link-nav.component.html',
  styleUrl: './link-nav.component.scss'
})
export class LinkNavComponent {
  @Input() href: string = "";
  @Input() text: string = "";

}
