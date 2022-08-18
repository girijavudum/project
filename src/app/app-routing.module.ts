import { EnergyIndicatorsComponent } from './components/energy-indicators/energy-indicators.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo:'energy-indicators', pathMatch: 'full' },
  { path: 'energy-indicators', component: EnergyIndicatorsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
