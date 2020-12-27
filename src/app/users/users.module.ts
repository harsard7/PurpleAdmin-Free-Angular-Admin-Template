import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {MatButtonModule} from "@angular/material/button";


const routes: Routes = [
  { path: 'all', component: UserListComponent },
  { path: 'update/:id', component: UserUpdateComponent },
]


@NgModule({
  declarations: [UserListComponent, UserUpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatButtonModule,
  ]
})
export class UsersModule { }
