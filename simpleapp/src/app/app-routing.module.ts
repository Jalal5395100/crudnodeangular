import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdittaskComponent } from './edittask/edittask.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path:"",
    component:TaskComponent
  },
  {
    path: "pages/edittask/:id",
    component: EdittaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
