import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxComponent } from './checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ErrorModule } from '../error/error.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    CommonModule,
    ErrorModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule
  ],
  exports: [
    CheckboxComponent
  ]
})
export class CheckboxModule { }
