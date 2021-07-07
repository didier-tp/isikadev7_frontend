import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDeviseComponent } from './admin-devise/admin-devise.component';
import { BasicComponent } from './basic/basic.component';
import { CalculatriceComponent } from './basic/calculatrice/calculatrice.component';
import { TvaComponent } from './basic/tva/tva.component';
import { ConversionComponent } from './conversion/conversion.component';
import { LoginComponent } from './login/login.component';

import { WelcomeComponent } from './welcome/welcome.component';
import { MapComponent } from './map/map.component';


const routes: Routes = [
  { path: 'ngr-welcome', component: WelcomeComponent },
  { path: '', redirectTo: '/ngr-welcome', pathMatch: 'full'},
  { path: 'ngr-login', component: LoginComponent },
  { path: 'ngr-basic', component: BasicComponent },
  { path: 'ngr-map', component: MapComponent },
  { path: 'ngr-conversion', component: ConversionComponent },
  { path: 'ngr-admin-devise', component: AdminDeviseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
