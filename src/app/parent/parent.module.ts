import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ParentCreateComponent} from "./parent-create/parent-create.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {ParentListComponent} from "./parent-list/parent-list.component";
import { ParentDetailComponent } from './parent-detail/parent-detail.component';
import {ParentUpdateComponent} from "./parent-update/parent-update.component";
import {NgxPaginationModule} from "ngx-pagination";


const routes: Routes = [
  { path: 'create', component: ParentCreateComponent },
  { path: 'all', component: ParentListComponent },
  { path: 'details/:id', component: ParentDetailComponent },
  { path: 'update/:id', component: ParentUpdateComponent },
]

@NgModule({
  declarations: [ParentCreateComponent,ParentListComponent,ParentDetailComponent,ParentUpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ]
})
export class ParentModule { }
