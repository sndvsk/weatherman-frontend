import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateRangePickerComponent } from './date-range-picker.component';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorModule } from '../error/error.module';

@NgModule({
  declarations: [DateRangePickerComponent],
  imports: [
    CommonModule,
    ErrorModule,
    MatInputModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  exports: [DateRangePickerComponent]
})
export class DateRangePickerModule { }
