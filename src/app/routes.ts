import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { OrdersPageComponent } from '../pages/orders-page/orders-page.component';
import { WorkTimePageComponent } from '../pages/work-time/work-time-page.component';
import { LoadPageComponent } from '../pages/load/load-page.component';
import { FormYPageComponent } from '../pages/form-y401/form-y401-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/orders',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    component: OrdersPageComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'work_time',
    component: WorkTimePageComponent
  },
  {
    path: 'load',
    component: LoadPageComponent
  },
  {
    path: 'form-y401',
    component: FormYPageComponent
  }
];
