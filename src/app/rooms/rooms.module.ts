import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PreferencesComponent} from "../teachers/preferences/preferences.component";
import {TeacherCreateComponent} from "../teachers/teacher-create/teacher-create.component";
import {TeacherUpdateComponent} from "../teachers/teacher-update/teacher-update.component";
import {RoomCreateComponent} from "./room-create/room-create.component";
import {RoomViewComponent} from "./room-view/room-view.component";
import {Ng2SearchPipeModule} from "ng2-search-filter";

const routes: Routes = [
  { path: 'create', component: RoomCreateComponent },
  { path: 'all', component: RoomViewComponent },
]


@NgModule({
  declarations: [RoomCreateComponent,RoomViewComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        Ng2SearchPipeModule,
    ]
})
export class RoomsModule { }
