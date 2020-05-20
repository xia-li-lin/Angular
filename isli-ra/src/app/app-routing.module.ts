import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'heroes',
    loadChildren: './heroes/heroes-routing.module#HeroesRoutingModule',
  },
  {
    path: '**',
    redirectTo: 'heroes',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
