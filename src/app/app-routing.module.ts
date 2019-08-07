import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'bluetooth', loadChildren: './pages/bluetooth/bluetooth.module#BluetoothPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'manual', loadChildren: './pages/manual/manual.module#ManualPageModule' },
  { path: 'automatico', loadChildren: './pages/automatico/automatico.module#AutomaticoPageModule' },
  { path: 'controles', loadChildren: './pages/controles/controles.module#ControlesPageModule' },
  { path: 'resultados', loadChildren: './pages/resultados/resultados.module#ResultadosPageModule' },
  { path: 'historicos', loadChildren: './pages/historicos/historicos.module#HistoricosPageModule' },
  { path: 'usuario', loadChildren: './pages/usuario/usuario.module#UsuarioPageModule' },
//  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
