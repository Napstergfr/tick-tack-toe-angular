import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameBoardComponent} from './game-board/game-board.component';

const routes: Routes = [
  {
    path: '',
    component: GameBoardComponent
  }, // This is to load this component in the root path
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  } // This is to redirect anything to the root path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
