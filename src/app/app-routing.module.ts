import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LoginGuard} from "./guard/login.guard";
import {AdminGuard} from "./guard/admin.guard";


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent ,canActivate:[LoginGuard]},
  { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) ,canActivate:[LoginGuard]},
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  { path: 'todo', loadChildren: () => import('./apps/apps.module.js').then(m => m.AppsModule) },

  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),canActivate:[LoginGuard] },
  { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'subject', loadChildren: () => import('./subject/subject.module').then(m=>m.SubjectsModule)},
  { path: 'exam', loadChildren: () => import('./exams/exams.module').then(m => m.ExamsModule) },
  { path: 'headteacher', loadChildren: () => import('./head-teachers/head-teachers.module').then(m => m.HeadTeachersModule) },
  { path: 'remark', loadChildren: () => import('./remark/remark.module').then(m => m.RemarkModule) },
  { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
  { path: 'rooms', loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule) },
  { path: 'teacher', loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule) },
  { path: 'timetable', loadChildren: () => import('./timetable/timetable.module').then(m => m.TimetableModule) },
  { path: 'classroom', loadChildren: () => import('./classrooms/classrooms.module').then(m => m.ClassroomsModule) },
  { path: 'attendance', loadChildren: () => import('./attendances/attendances.module').then(m => m.AttendancesModule) },
  { path: 'message', loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule) },
  { path: 'remark', loadChildren: () => import('./remark/remark.module').then(m => m.RemarkModule) },
  { path: 'statistics', loadChildren: () => import('./head-teachers/head-teachers.module').then(m => m.HeadTeachersModule) },
  { path: 'school', loadChildren: () => import('./school/school.module').then(m => m.SchoolModule) },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),canActivate:[AdminGuard] },
  { path: 'parent', loadChildren: () => import('./parent/parent.module').then(m => m.ParentModule) },
  { path: 'subjectdetail', loadChildren: () => import('./subjectdetail/subjectdetail.module').then(m => m.SubjectdetailModule) },
  { path: 'entrollment', loadChildren: () => import('./entrollment/entrollment.module').then(m => m.EntrollmentModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
