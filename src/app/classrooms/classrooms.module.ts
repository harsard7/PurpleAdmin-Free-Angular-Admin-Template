import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClassroomCreateComponent} from "./classroom-create/classroom-create.component";
import {ClassroomListComponent} from "./classroom-list/classroom-list.component";
import {ClassroomUpdateComponent} from "./classroom-update/classroom-update.component";
import {SetCourseClassroomComponent} from "./set-course-classroom/set-course-classroom.component";
import {Ng2SearchPipeModule} from "ng2-search-filter";

const routes: Routes = [
  { path: 'create', component: ClassroomCreateComponent },
  { path: 'all', component: ClassroomListComponent },
  { path: 'update/:id', component: ClassroomUpdateComponent },
  { path: 'setCourse/:id', component: SetCourseClassroomComponent },
]


@NgModule({
  declarations: [ClassroomCreateComponent,ClassroomListComponent, ClassroomUpdateComponent,SetCourseClassroomComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
  ]
})
export class ClassroomsModule { }
