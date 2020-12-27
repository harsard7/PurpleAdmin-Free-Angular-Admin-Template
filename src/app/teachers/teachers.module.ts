import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PreferencesComponent} from "./preferences/preferences.component";
import {TeacherCreateComponent} from "./teacher-create/teacher-create.component";
import {TeacherUpdateComponent} from "./teacher-update/teacher-update.component";

const routes: Routes = [
  { path: 'preferences/:id', component: PreferencesComponent },
  { path: 'create', component: TeacherCreateComponent },
  { path: 'update/:id', component: TeacherUpdateComponent },
]

@NgModule({
  declarations: [PreferencesComponent,TeacherCreateComponent,TeacherUpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class TeachersModule { }
