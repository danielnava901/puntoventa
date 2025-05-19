import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-redirect',
  imports: [],
  template: '',
})
export class RedirectComponent implements OnInit{
  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    const auth = localStorage.getItem('auth');
    await this.router.navigate([auth ? '/dashboard' : '/login']);
  }

}
