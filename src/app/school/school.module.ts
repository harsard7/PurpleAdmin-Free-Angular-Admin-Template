import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SchoolComponent} from "./school.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxPaginationModule} from "ngx-pagination";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ListFilterPipePipe} from "./list-filter-pipe.pipe"


const routes: Routes = [
  { path: 'create', component: SchoolComponent },

]

@NgModule({
  declarations: [SchoolComponent,ListFilterPipePipe,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgbModule,


  ]
})
export class SchoolModule { }
