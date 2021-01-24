import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PreferencesComponent} from "./preferences/preferences.component";
import {TeacherCreateComponent} from "./teacher-create/teacher-create.component";
import {TeacherUpdateComponent} from "./teacher-update/teacher-update.component";
import { TeachersAllComponent } from './teachers-all/teachers-all.component';
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';

const routes: Routes = [
  { path: 'preferences/:id', component: PreferencesComponent },
  { path: 'create', component: TeacherCreateComponent },
  { path: 'update/:id', component: TeacherUpdateComponent },
  { path: 'details/:id', component: TeacherDetailComponent },
  { path: 'all', component: TeachersAllComponent },
]

@NgModule({
  declarations: [PreferencesComponent,TeacherCreateComponent,TeacherUpdateComponent, TeachersAllComponent, TeacherDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ]
})
export class TeachersModule { }
