import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeCreateComponent } from './grade-create/grade-create.component';
import { SectionCreateComponent } from './section-create/section-create.component';



@NgModule({
  declarations: [GradeCreateComponent, SectionCreateComponent],
  imports: [
    CommonModule
  ]
})
export class GradeModule { }
