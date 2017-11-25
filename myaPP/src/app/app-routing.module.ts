import { NgModule } from '@angular/core' ;
import {Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: 'disaster' , loadChildren: 'app/disaster/disaster.module#DisasterModule'},
    { path: 'sb' , loadChildren: 'app/disaster/disaster.module#DisasterModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
