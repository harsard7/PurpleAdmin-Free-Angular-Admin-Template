import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClassAttendanceComponent} from "./class-attendance/class-attendance.component";
import {CreateAttendanceComponent} from "./create-attendance/create-attendance.component";
import {ViewAttendanceComponent} from "./view-attendance/view-attendance.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";

const routes: Routes = [
  { path: 'classroom/:id', component: ClassAttendanceComponent },
  { path: 'create/:id', component: CreateAttendanceComponent },
  { path: 'student/:id', component: ViewAttendanceComponent },
]

@NgModule({
  declarations: [ClassAttendanceComponent,CreateAttendanceComponent,ViewAttendanceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
  ]
})
export class AttendancesModule { }
