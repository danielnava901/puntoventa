import { Routes } from '@angular/router';
import {LoginComponent} from './presentation/pages/login/login.component';
import {HomeComponent} from './presentation/pages/home/home.component';
import {VentasComponent} from './presentation/pages/dashboard/ventas/ventas.component';
import {DashboardComponent} from './presentation/pages/dashboard/dashboard.component';
import {AuthGuard} from './presentation/gard/auth.guard';
import {RedirectComponent} from './presentation/pages/redirect/redirect.component';
import {LoginRedirectGuard} from './presentation/gard/login-redirect.guard';
import {LogoutComponent} from './presentation/pages/logout/logout.component';

export const routes: Routes = [
  { path: '', component: RedirectComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  { path: 'logout', component: LogoutComponent},
  { path: 'home', component: HomeComponent },
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: "", component: VentasComponent}
    ]
  },
];
