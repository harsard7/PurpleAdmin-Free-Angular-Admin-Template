import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RemarkCreateComponent} from "../remark/remark-create/remark-create.component";
import {RemarkListComponent} from "../remark/remark-list/remark-list.component";
import {RemarkUpdateComponent} from "../remark/remark-update/remark-update.component";
import {CreateMessageComponent} from "./create-message/create-message.component";
import {MessageListComponent} from "./message-list/message-list.component";
import {UpdateMessageComponent} from "./update-message/update-message.component";

const routes: Routes = [
  { path: 'create', component: CreateMessageComponent },
  { path: 'all', component: MessageListComponent },
  { path: 'update/:id', component: UpdateMessageComponent },

]

@NgModule({
  declarations: [CreateMessageComponent,MessageListComponent,UpdateMessageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class MessagesModule { }
