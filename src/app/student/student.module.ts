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
import {SummaryStudentComponent} from "./summary-student/summary-student.component";
import { StudentAllComponent } from './student-all/student-all.component';
import {NgxPaginationModule} from "ngx-pagination";

const routes: Routes = [
  { path: 'create', component: StudentCreateComponent },
  { path: 'details/:id', component: StudentDetailsComponent },
  { path: 'update/:id', component: StudentUpdateComponent },
  { path: 'classroom/:id', component: StudentClassroomListComponent },
  { path: 'summary/:id', component: SummaryStudentComponent },
  { path: 'all', component: StudentAllComponent },

]

@NgModule({
  declarations: [StudentCreateComponent,StudentDetailsComponent,StudentUpdateComponent,StudentClassroomListComponent,SummaryStudentComponent, StudentAllComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ],
})
export class StudentModule { }
