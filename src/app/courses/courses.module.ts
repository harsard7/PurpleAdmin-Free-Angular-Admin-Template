import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CourseCreateComponent} from "./course-create/course-create.component";
import {CourseDetailsComponent} from "./course-details/course-details.component";
import {CourseListComponent} from "./course-list/course-list.component";
import {CourseUpdateComponent} from "./course-update/course-update.component";
import {SetCourseComponent} from "./set-course/set-course.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";

const routes: Routes = [
  { path: 'create', component: CourseCreateComponent },
  { path: 'details/:id', component: CourseDetailsComponent },
  { path: 'all', component: CourseListComponent },
  { path: 'update/:id', component: CourseUpdateComponent },
  { path: 'setCourse/:id', component: SetCourseComponent },
]

@NgModule({
  declarations: [CourseCreateComponent,CourseDetailsComponent,CourseListComponent,CourseUpdateComponent,SetCourseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
  ]
})
export class CoursesModule { }
