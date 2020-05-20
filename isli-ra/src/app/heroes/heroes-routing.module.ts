import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroesModule } from './heroes.module';

const routes: Routes = [
  {
    path: '',
    component:HeroesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),HeroesModule]
})
export class HeroesRoutingModule {}
