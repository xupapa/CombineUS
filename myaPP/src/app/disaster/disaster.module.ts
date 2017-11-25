import { NgModule } from '@angular/core';
import { CityComponent } from './bar/city.component';
import { CommonModule } from '@angular/common';
import { DisasterComponent } from './disaster.component';
import { DisasterRoutingModule } from './disaster-routing.module';
import { PieComponent } from './pie/pie.component';
@NgModule({
  declarations: [
    CityComponent,
    PieComponent,
    DisasterComponent
  ],
  imports: [
    CommonModule,
    DisasterRoutingModule
  ],
  providers: [],
})
export class DisasterModule { }
