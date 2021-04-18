import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {SubjectCreateComponent} from "./subject-create/subject-create.component";
import {SubjectDetailsComponent} from "./subject-details/subject-details.component";
import {SubjectListComponent} from "./subject-list/subject-list.component";
import {SubjectUpdateComponent} from "./subject-update/subject-update.component";
import {SetSubjectComponent} from "./set-subject/set-subject.component";
import {NgxPaginationModule} from "ngx-pagination";

const routes: Routes = [
  { path: 'create', component: SubjectCreateComponent },
  { path: 'details/:id', component: SubjectDetailsComponent },
  { path: 'all', component: SubjectListComponent },
  { path: 'update/:id', component: SubjectUpdateComponent },
  { path: 'setSubject/:id', component: SetSubjectComponent },
]

@NgModule({
  declarations: [SubjectCreateComponent,SubjectDetailsComponent,SubjectListComponent,SubjectUpdateComponent,SetSubjectComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
    ]
})
export class SubjectsModule { }
