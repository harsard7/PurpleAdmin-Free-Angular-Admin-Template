import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ParentCreateComponent} from "./parent-create/parent-create.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";


const routes: Routes = [
  { path: 'create', component: ParentCreateComponent },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
  ]
})
export class ParentModule { }
