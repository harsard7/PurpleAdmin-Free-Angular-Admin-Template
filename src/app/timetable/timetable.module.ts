import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {TimetableEntityCreateComponent} from "./timetable-entity-create/timetable-entity-create.component";
import {TimetableEntityUpdateComponent} from "./timetable-entity-update/timetable-entity-update.component";
import {TimetableEntityViewComponent} from "./timetable-entity-view/timetable-entity-view.component";
import {TimetableListComponent} from "./timetable-list/timetable-list.component";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxPaginationModule} from "ngx-pagination";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  { path: 'create', component: TimetableEntityCreateComponent },
  { path: 'update/:id', component: TimetableEntityUpdateComponent },
  { path: 'view/:id', component: TimetableEntityViewComponent },
  { path: 'subject/:id', component: TimetableListComponent },
]

@NgModule({
  declarations: [TimetableEntityCreateComponent,TimetableEntityUpdateComponent,TimetableEntityViewComponent,TimetableListComponent],
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
export class TimetableModule { }
