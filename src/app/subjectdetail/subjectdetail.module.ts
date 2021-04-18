import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ViewallComponent } from './viewall/viewall.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {SubjectCreateComponent} from "../subject/subject-create/subject-create.component";
import {SubjectDetailsComponent} from "../subject/subject-details/subject-details.component";
import {SubjectListComponent} from "../subject/subject-list/subject-list.component";
import {SubjectUpdateComponent} from "../subject/subject-update/subject-update.component";
import {SetSubjectComponent} from "../subject/set-subject/set-subject.component";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxPaginationModule} from "ngx-pagination";



const routes: Routes = [
  { path: 'create', component: CreateComponent },
  // { path: 'details/:id', component: SubjectDetailsComponent },
  { path: 'classroom/:id', component: ViewallComponent },
  { path: 'update/:id', component: UpdateComponent },
  // { path: 'setSubject/:id', component: SetSubjectComponent },
]

@NgModule({
  declarations: [CreateComponent,ViewallComponent,UpdateComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
    ]
})
export class SubjectdetailModule { }
