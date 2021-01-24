import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClassroomCreateComponent} from "./classroom-create/classroom-create.component";
import {ClassroomListComponent} from "./classroom-list/classroom-list.component";
import {ClassroomUpdateComponent} from "./classroom-update/classroom-update.component";

import {Ng2SearchPipeModule} from "ng2-search-filter";
import {SetSubjectClassroomComponent} from "./set-subject-classroom/set-subject-classroom.component";



const routes: Routes = [
  { path: 'create', component: ClassroomCreateComponent },
  { path: 'all', component: ClassroomListComponent },
  { path: 'update/:id', component: ClassroomUpdateComponent },
  { path: 'setSubject/:id', component: SetSubjectClassroomComponent },
]


@NgModule({
  declarations: [ClassroomCreateComponent,ClassroomListComponent, ClassroomUpdateComponent,SetSubjectClassroomComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
  ]
})
export class ClassroomsModule { }
