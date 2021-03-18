import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmplyeeCreateComponent } from './emplyee-create/emplyee-create.component';
import { EmplyeeUpdateComponent } from './emplyee-update/emplyee-update.component';
import { EmplyeeListComponent } from './emplyee-list/emplyee-list.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxPaginationModule} from "ngx-pagination";


const routes: Routes = [
  { path: 'create', component: EmplyeeCreateComponent },
  { path: 'update/:id', component: EmplyeeUpdateComponent },
  { path: 'all', component: EmplyeeListComponent }

]

@NgModule({
  declarations: [EmplyeeCreateComponent, EmplyeeUpdateComponent, EmplyeeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ]
})
export class EmployeeModule { }
