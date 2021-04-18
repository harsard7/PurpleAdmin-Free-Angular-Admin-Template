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
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';


const routes: Routes = [
  { path: 'create', component: EmplyeeCreateComponent },
  { path: 'update/:id', component: EmplyeeUpdateComponent },
  { path: 'all', component: EmplyeeListComponent },
  { path: 'details/:id', component: EmployeeDetailComponent },

]

@NgModule({
  declarations: [EmplyeeCreateComponent, EmplyeeUpdateComponent, EmplyeeListComponent, EmployeeDetailComponent],
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
