import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisasterComponent } from './disaster.component';
const routes: Routes = [
    { path: '',    component: DisasterComponent},
  ];

  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
  })
  export class DisasterRoutingModule {}
