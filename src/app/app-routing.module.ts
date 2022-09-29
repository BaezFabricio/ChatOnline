import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DahsboardComponent } from './components/dashboard/dahsboard.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPassWordComponent } from './components/recuperar-pass-word/recuperar-pass-word.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},  
  {path: 'login', component: LoginComponent},
  {path: 'registrar-usuario', component: RegistrarUsuarioComponent},
  {path: 'verificar-correo', component: VerificarCorreoComponent},
  {path: 'recuperar-pass-word', component: RecuperarPassWordComponent},
  {path: 'registrar-usuario', component: RegistrarUsuarioComponent},
  {path: 'dashboard', component: DahsboardComponent},
  {path: '**', redirectTo:'login', pathMatch: 'full'},   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
