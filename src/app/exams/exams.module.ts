import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateExamComponent} from "./create-exam/create-exam.component";
import {CreateExamClassroomComponent} from "./create-exam-classroom/create-exam-classroom.component";
import {ExamListComponent} from "./exam-list/exam-list.component";
import {UpdateExamComponent} from "./update-exam/update-exam.component";
import {Ng2SearchPipeModule} from "ng2-search-filter";

const routes: Routes = [
  { path: 'create/:id', component: CreateExamComponent },
  { path: 'classroom/:id', component: CreateExamClassroomComponent },
  { path: 'list/:id', component: ExamListComponent },
  { path: 'update/:id', component: UpdateExamComponent },
]

@NgModule({
  declarations: [CreateExamComponent,CreateExamClassroomComponent,ExamListComponent,UpdateExamComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        Ng2SearchPipeModule,
    ]
})
export class ExamsModule { }
