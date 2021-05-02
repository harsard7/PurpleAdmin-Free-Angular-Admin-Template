import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateReportComponent} from "../report/create-report/create-report.component";
import {CreateReportClassroomComponent} from "../report/create-report-classroom/create-report-classroom.component";
import {SemesterViewComponent} from "../report/semester-view/semester-view.component";
import {UpdateReportComponent} from "../report/update-report/update-report.component";
import {RemarkCreateComponent} from "./remark-create/remark-create.component";
import {RemarkListComponent} from "./remark-list/remark-list.component";
import {RemarkUpdateComponent} from "./remark-update/remark-update.component";

const routes: Routes = [
  { path: 'create/:id', component: RemarkCreateComponent },
  { path: 'remark/:id', component: RemarkListComponent },
  { path: 'update/:id', component: RemarkUpdateComponent },

]

@NgModule({
  declarations: [RemarkCreateComponent,RemarkListComponent,RemarkUpdateComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class RemarkModule { }
