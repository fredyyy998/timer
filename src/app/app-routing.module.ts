import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerSelectionComponent } from './pages/timer-selection/timer-selection.component';
import { TimerComponent } from './pages/timer/timer.component';
import { TimerEditComponent } from './pages/timer-edit/timer-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TimerSelectionComponent,
  },
  {
    path: 'timer/:id',
    component: TimerComponent
  },
  {
    path: 'timer-edit/:id/:index',
    component: TimerEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
