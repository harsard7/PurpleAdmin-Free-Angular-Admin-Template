import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionCreateComponent } from './section-create/section-create.component';
import {RouterModule, Routes} from "@angular/router";
import {SchoolComponent} from "../school/school.component";
import {ProfileViewComponent} from "./profile-view/profile-view.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


const routes: Routes = [
  { path: 'view', component: ProfileViewComponent },

]

@NgModule({
  declarations: [ProfileViewComponent, SectionCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class ProfileModule { }
