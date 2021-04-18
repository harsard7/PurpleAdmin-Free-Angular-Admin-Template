import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "./service/auth.service";
import { AttendancesModule } from './attendances/attendances.module';
import { ClassroomsModule } from './classrooms/classrooms.module';

import { ExamsModule } from './exams/exams.module';
import { MessagesModule } from './messages/messages.module';
import { PanelsModule } from './panels/panels.module';
import { RemarkModule } from './remark/remark.module';
import { ReportModule } from './report/report.module';
import { RoomsModule } from './rooms/rooms.module';
import { StudentModule } from './student/student.module';
import { TeachersModule } from './teachers/teachers.module';
import { TimetableModule } from './timetable/timetable.module';
import { UsersModule } from './users/users.module';
import {ToastrModule} from "ngx-toastr";
import {AuthInterceptor} from "./guard/auth-interceptor";
import {AdminModule} from "./admin/admin.module";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { NgxPaginationModule } from 'ngx-pagination';
import {SchoolModule} from "./school/school.module";
import {SubjectsModule} from "./subject/subject.module";
import {EmployeeModule} from "./employee/employee.module";
import {ParentModule} from "./parent/parent.module";
import {RouterStateSnapshot} from "@angular/router";
import {LoginGuard} from "./guard/login.guard";
import {AdminGuard} from "./guard/admin.guard";
import {DatePipe} from "@angular/common";



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    ContentAnimateDirective,
    LoginComponent,
    SpinnerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    AttendancesModule,
    ClassroomsModule,
    SubjectsModule,
    ExamsModule,
    MessagesModule,
    PanelsModule,
    RemarkModule,
    ReportModule,
    RoomsModule,
    StudentModule,
    TeachersModule,
    TimetableModule,
    UsersModule,
    AdminModule,
    SchoolModule,
    EmployeeModule,
    ParentModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [ThemeService, CookieService, AuthService,LoginGuard,AdminGuard,DatePipe, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  exports: [
    SpinnerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
