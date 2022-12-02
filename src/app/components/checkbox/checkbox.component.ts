/* https://material.angular.io/components/form-field/overview */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  apiForm!: FormGroup;

  @ViewChild('ctrlCheckboxError') ctrlCheckboxError: ErrorComponent;

  @Input() formGroupName!: string;

  constructor(private root2FormGroup: FormGroupDirective) {
  }

  ngOnInit(): void {
    this.apiForm = this.root2FormGroup.control.get(this.formGroupName) as FormGroup;
  }
}