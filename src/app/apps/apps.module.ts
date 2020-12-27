import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoComponent} from "./todo/todo.component";
import {ClassAttendanceComponent} from "../attendances/class-attendance/class-attendance.component";
import {CreateAttendanceComponent} from "../attendances/create-attendance/create-attendance.component";
import {ViewAttendanceComponent} from "../attendances/view-attendance/view-attendance.component";

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
