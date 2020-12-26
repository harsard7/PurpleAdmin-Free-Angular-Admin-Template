import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentCreateComponent } from './student-create/student-create.component';
import {RouterModule, Routes} from "@angular/router";
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ThemeService} from "ng2-charts";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../service/auth.service";

const routes: Routes = [
  { path: 'create-student', component: StudentCreateComponent }

]

@NgModule({
  declarations: [StudentCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    MatSnackBarModule
  ],
})
export class StudentModule { }
