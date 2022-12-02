import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';

const day = new Date();
const month = day.getMonth();
const year = day.getFullYear();
const today = day.getDate();

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {

  @ViewChild('ctrlDateError') ctrlDateError: ErrorComponent;

  @Input() formGroupName!: string

  minDate: Date;
  maxDate: Date;
  comparisonStart: Date;
  comparisonEnd: Date;
  dateForm: FormGroup;


  constructor(private root2FormGroup: FormGroupDirective) {
    this.comparisonStart = new Date();
    this.comparisonEnd = this.addDays(this.comparisonStart, 10); 
    this.minDate = new Date();
    this.maxDate = this.addDays(new Date(), 10);
  }

  
  ngOnInit(): void {
    this.dateForm = this.root2FormGroup.control.get(this.formGroupName) as FormGroup;
}
  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }  

}
