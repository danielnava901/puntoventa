import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  template: '',
})
export class LogoutComponent {
  constructor(private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    localStorage.removeItem('auth');
    await this.router.navigate(['/login']);
  }

}
