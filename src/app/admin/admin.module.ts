import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdministrationComponent} from "./administration/administration.component";
import {ArchiveDetailsComponent} from "./archive-details/archive-details.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArchiveListComponent} from "./archive-list/archive-list.component";
import {Ng2SearchPipeModule} from "ng2-search-filter";

const routes: Routes = [
  { path: 'control', component: AdministrationComponent },
  { path: 'all', component: ArchiveListComponent },
  { path: ':id', component: ArchiveDetailsComponent },
  ]

@NgModule({
  declarations: [AdministrationComponent,ArchiveDetailsComponent,ArchiveListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
  ]
})
export class AdminModule { }
