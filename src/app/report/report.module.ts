import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoomCreateComponent} from "../rooms/room-create/room-create.component";
import {RoomViewComponent} from "../rooms/room-view/room-view.component";
import {CreateReportComponent} from "./create-report/create-report.component";
import {CreateReportClassroomComponent} from "./create-report-classroom/create-report-classroom.component";
import {SemesterViewComponent} from "./semester-view/semester-view.component";
import {UpdateReportComponent} from "./update-report/update-report.component";

const routes: Routes = [
  { path: 'create/:id', component: CreateReportComponent },
  { path: 'classroom/:id', component: CreateReportClassroomComponent },
  { path: 'student/:id', component: SemesterViewComponent },
  { path: 'update/:id', component: UpdateReportComponent },
]


@NgModule({
  declarations: [CreateReportComponent,CreateReportClassroomComponent,SemesterViewComponent,UpdateReportComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class ReportModule { }
