import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentCreateComponent } from './student-create/student-create.component';
import {RouterModule, Routes} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {StudentDetailsComponent} from "./student-details/student-details.component";
import {StudentClassroomListComponent} from "./student-classroom-list/student-classroom-list.component";
import {StudentUpdateComponent} from "./student-update/student-update.component";
import {Ng2SearchPipeModule} from "ng2-search-filter";

const routes: Routes = [
  { path: 'create', component: StudentCreateComponent },
  { path: 'details/:id', component: StudentDetailsComponent },
  { path: 'update/:id', component: StudentUpdateComponent },
  { path: 'classroom/:id', component: StudentClassroomListComponent },

]

@NgModule({
  declarations: [StudentCreateComponent,StudentDetailsComponent,StudentUpdateComponent,StudentClassroomListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
})
export class StudentModule { }
