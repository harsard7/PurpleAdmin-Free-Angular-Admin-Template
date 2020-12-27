import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CreateMessageComponent} from "../messages/create-message/create-message.component";
import {MessageListComponent} from "../messages/message-list/message-list.component";
import {UpdateMessageComponent} from "../messages/update-message/update-message.component";
import {StatisticsComponent} from "./statistics/statistics.component";

const routes: Routes = [
  { path: ':id', component: StatisticsComponent },
]

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class HeadTeachersModule { }
