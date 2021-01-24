import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoComponent} from "./todo/todo.component";


const routes: Routes = [
  { path: 'create', component: TodoComponent },
  { path: 'all', component: TodoListComponent },
]


@NgModule({
  declarations: [TodoListComponent,TodoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class AppsModule { }
