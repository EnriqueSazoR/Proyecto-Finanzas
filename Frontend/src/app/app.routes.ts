import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VistaUsuarioComponent } from './components/vista-usuario/vista-usuario.component';
import { CommonModule } from '@angular/common';



export const appRoutes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'vista-usuario', component:VistaUsuarioComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}