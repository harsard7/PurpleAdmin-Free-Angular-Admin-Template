import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  { path: 'todo', loadChildren: () => import('./apps/apps.module.js').then(m => m.AppsModule) },

  { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'course', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
