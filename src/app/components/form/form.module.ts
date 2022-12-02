import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormComponent } from './form.component';
import { DateRangePickerModule } from '../date-range-picker/date-range-picker.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { MapModule } from '../map/map.module';
import { CoordsModule } from '../coords/coords.module';
import { ErrorModule } from '../error/error.module';


import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    DateRangePickerModule,
    CheckboxModule,
    CoordsModule,
    MapModule,
    ErrorModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
