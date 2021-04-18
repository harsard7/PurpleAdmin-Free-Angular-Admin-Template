import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClassAttendanceComponent} from "./class-attendance/class-attendance.component";
import {CreateAttendanceComponent} from "./create-attendance/create-attendance.component";
import {ViewAttendanceComponent} from "./view-attendance/view-attendance.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxPaginationModule} from "ngx-pagination";
import { ViewAllComponent } from './view-all/view-all.component';

const routes: Routes = [
  { path: 'classroom/:id', component: ClassAttendanceComponent },
  { path: 'create/:id', component: CreateAttendanceComponent },
  { path: 'student/:id', component: ViewAttendanceComponent },
  { path: 'all', component: ViewAllComponent },
]

@NgModule({
  declarations: [ClassAttendanceComponent,CreateAttendanceComponent,ViewAttendanceComponent, ViewAllComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ]
})
export class AttendancesModule { }
