import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateReportComponent} from "./create-report/create-report.component";
import {CreateReportClassroomComponent} from "./create-report-classroom/create-report-classroom.component";
import {UpdateReportComponent} from "./update-report/update-report.component";
import {ReportViewComponent} from "./report-view/report-view.component";


const routes: Routes = [
  { path: 'create/:id', component: CreateReportComponent },
  { path: 'classroom/:id', component: CreateReportClassroomComponent },
  { path: 'student/:id', component: ReportViewComponent },
  { path: 'update/:id', component: UpdateReportComponent },
]


@NgModule({
  declarations: [CreateReportComponent,CreateReportClassroomComponent,ReportViewComponent,UpdateReportComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class ReportModule { }
