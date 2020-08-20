import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { UserinfoComponent  } from "./userinfo/userinfo.component";

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'userinfo', component: UserinfoComponent },
  { path: '', component: InicioComponent, pathMatch: 'full'},
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
