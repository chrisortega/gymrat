
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { mapToCanActivate, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { 
        path: '', 
        component: HomeComponent,
        canActivate: [AuthGuard]
     },
     { 
        path: 'user/:id', 
        component: UserComponent,
        canActivate: [AuthGuard]
     },     
  ];
